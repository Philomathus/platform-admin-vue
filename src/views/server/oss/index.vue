<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['server:oss:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['server:oss:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="ossList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="访问域名" align="center" prop="endpoint"/>
      <el-table-column label="文件存储" align="center" prop="bucket"/>
      <!-- <el-table-column label="加速域名" align="center" prop="vhost"/>-->
      <el-table-column label="状态" align="center" prop="isEffect">
        <template slot-scope="scope">
          <span :style="{color: (status = isEffectOptions[parseInt(scope.row.isEffect)]).color}">{{
              status.dictLabel
            }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="color: #5FB878"
            v-show="scope.row.isEffect != 1"
            @click="handleEffect(scope.row)"
            v-hasPermi="['server:oss:effect']"
          >激活
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="color: #FFB800"
            @click="handleOssTest(scope.row)"
            v-hasPermi="['server:oss:ossTest']"
          >测试
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,30,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改oss文件存储服务配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="访问域名" prop="endpoint">
          <el-input v-model="form.endpoint" placeholder="请输入访问域名"/>
        </el-form-item>
        <el-form-item label="文件存储" prop="bucket">
          <el-input v-model="form.bucket" placeholder="请输入文件存储"/>
        </el-form-item>
        <el-form-item label="服务商" prop="provider">
          <el-select v-model="form.provider" placeholder="请选择服务商" clearable size="small">
            <el-option
              v-for="dict in providerDictionary"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地区" prop="vhost">
          <el-input v-model="form.vhost" placeholder="请输入地区"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="ossTestTitle" :visible.sync="ossTestOpen"
               width="500px" append-to-body>
      <el-form ref="ossTestForm" :model="ossTestForm" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ossTestForm.name" placeholder="请输入名称" readonly/>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <imageUpload v-model="ossTestForm.image" path="test" :mode-id="ossTestForm.id"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {listOss, delOss, addOss, updateOss, effectOss} from '@/api/platform-web/server/oss'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'Oss',
  components: {ImageUpload},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // oss文件存储服务配置表格数据
      ossList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      isEffectOptions: [],
      providerDictionary: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        name: null,
        orderByColumn: 'is_effect',
        isAsc: 'desc'
      },
      ossTestTitle: '测试图片上传',
      ossTestOpen: false,
      ossTestForm: {},
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ],
        endpoint: [
          {required: true, message: '访问域名不能为空', trigger: 'blur'}
        ],
        bucket: [
          {required: true, message: '文件存储不能为空', trigger: 'blur'}
        ],
        // vhost: [
        //   { required: true, message: '加速域名不能为空', trigger: 'blur' }
        // ],
        isEffect: [
          {required: true, message: '状态不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('server_oss_status').then(response => {
      this.isEffectOptions = response.data
    })
    this.getDicts('server_oss_provider').then(response => {
      this.providerDictionary = response.data
    })
  },
  methods: {
    /** 查询oss文件存储服务配置列表 */
    getList() {
      this.loading = true
      listOss(this.queryParams).then(response => {
        this.ossList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 状态字典翻译
    isEffectFormat(row, column) {
      return this.selectDictLabel(this.isEffectOptions, row.isEffect)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        endpoint: null,
        bucket: null,
        //vhost: null,
        isEffect: 0,
        createBy: null,
        createTime: null,
        updateBy: null,
        provider: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加oss文件存储服务配置'
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateOss(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addOss(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      for (const item of this.ossList) {
        for (const id of ids) {
          if (id === item.id && item.isEffect === 1) {
            this.msgWarning('编号' + id + '已激活，请勿删除')
            return
          }
        }
      }
      this.$confirm('是否确认删除oss文件存储服务配置编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delOss(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    handleEffect(row) {
      this.$confirm('确定要激活oss文件存储服务配置编号为"' + row.id + '"的状态吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return effectOss(row.id)
      }).then(() => {
        this.getList()
        this.msgSuccess('修改状态成功')
      }).catch(() => {
      })
    },
    handleOssTest(row) {
      this.ossTestForm.name = row.name
      this.ossTestForm.id = row.id
      this.ossTestOpen = true
    },
    maskValueRow(row, column, cellValue) {
      const name = this.maskValue(row.value, row.activeSwitch);
      return `${name}`;
    }
    ,
    maskValue(input, activeSwitch) {
      if (input == null || input.length <= 2) {
        return input;
      }
      let mask = input.length > 10 ? 5 : 3;
      if (input.length / 2 <= mask) {
        mask = input.length / 4;
      }
      const first = input.substring(0, mask);
      const last = input.substring(input.length - mask);
      const asterisks = "*".repeat(input.length - (mask * 2));
      return first + asterisks + last;
    }
  }
}
</script>
