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
      <el-form-item label="服务商" prop="provider">
        <el-select v-model="queryParams.provider" placeholder="请选择服务商" clearable size="small">
          <el-option
            v-for="dict in providerOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['server:live:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['server:live:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['server:live:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="服务商" align="center" prop="provider" :formatter="providerFormat"/>
      <el-table-column label="推流域名" align="center" prop="pushDomain"/>
      <el-table-column label="拉流域名" align="center" prop="pullDomain"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope" v-for="(obj,index) in statusOptions">
          <span v-if="obj.dictValue == scope.row.status" :style="{color: obj.color}">{{ obj.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在线主播" align="center" prop="countNum"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['server:live:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['server:live:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改直播流服务配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="服务商" prop="provider">
          <el-select v-model="form.provider" placeholder="请选择服务商" @change="">
            <el-option
              v-for="dict in providerOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="secretId" prop="secretId">
          <el-input v-model="form.secretId" placeholder="请输入secretId"/>
        </el-form-item>
        <el-form-item label="Secretkey" prop="secretKey">
          <el-input v-model="form.secretKey" placeholder="请输入Secretkey"/>
        </el-form-item>
        <el-form-item label="推流域名" prop="pushDomain">
          <el-input v-model="form.pushDomain" placeholder="请输入推流域名"/>
        </el-form-item>
        <el-form-item label="拉流域名" prop="pullDomain">
          <el-input v-model="form.pullDomain" placeholder="请输入拉流域名"/>
        </el-form-item>
        <el-form-item label="推流防盗Key" prop="securityKey">
          <el-input v-model="form.securityKey" placeholder="请输入推流防盗Key"/>
        </el-form-item>
        <el-form-item label="licence下载地址" prop="licenceUrl">
          <el-input v-model="form.licenceUrl" placeholder="请输入licence下载地址"/>
        </el-form-item>
        <el-form-item label="licence密钥" prop="licenceKey">
          <el-input v-model="form.licenceKey" placeholder="请输入licence密钥"/>
        </el-form-item>
        <el-form-item label="拉流Key" prop="pullKey">
          <el-input v-model="form.pullKey" placeholder="请输入拉流Key"/>
        </el-form-item>
        <el-form-item label="推流Key" prop="pushKey">
          <el-input v-model="form.pushKey" placeholder="请输入推流Key"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLive, getLive, delLive, addLive, updateLive } from '@/api/platform-web/server/live'

export default {
  name: 'Live',
  components: {},
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
      // 直播流服务配置表格数据
      liveList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 服务商字典
      providerOptions: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        provider: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        provider: [
          { required: true, message: '服务商不能为空', trigger: 'change' }
        ],
        secretId: [
          { required: true, message: 'secretId不能为空', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: 'Secretkey不能为空', trigger: 'blur' }
        ],
        pushDomain: [
          { required: true, message: '推流域名不能为空', trigger: 'blur' }
        ],
        pullDomain: [
          { required: true, message: '拉流域名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('server_live_provider').then(response => {
      this.providerOptions = response.data
    })
    this.getDicts('server_live_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询直播流服务配置列表 */
    getList() {
      this.loading = true
      listLive(this.queryParams).then(response => {
        this.liveList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 服务商字典翻译
    providerFormat(row, column) {
      return this.selectDictLabel(this.providerOptions, row.provider)
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
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
        provider: null,
        secretId: null,
        secretKey: null,
        pushDomain: null,
        pullDomain: null,
        isEffect: null,
        securityKey: null,
        licenceUrl: null,
        licenceKey: null,
        status: null,
        pullKey: null,
        pushKey: null,
        countNum: null
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
      this.title = '添加直播流服务配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLive(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改直播流服务配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLive(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLive(this.form).then(response => {
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
      this.$confirm('是否确认删除直播流服务配置编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLive(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    }
  }
}
</script>
