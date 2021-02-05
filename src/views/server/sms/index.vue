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
      <el-form-item label="状态" prop="isEffect">
        <el-select v-model="queryParams.isEffect" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in isEffectOptions"
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
          v-hasPermi="['server:sms:add']"
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
          v-hasPermi="['server:sms:edit']"
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
          v-hasPermi="['server:sms:remove']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="smsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="名称" align="center" prop="name"/>
      <el-table-column label="服务商" align="center" prop="provider" :formatter="providerFormat"/>
      <el-table-column label="地区" align="center" prop="region"/>
      <el-table-column label="签名" align="center" prop="signature"/>
      <el-table-column label="模板" align="center" prop="template"/>
      <el-table-column label="状态" align="center" prop="isEffect">
        <template slot-scope="scope">
          <span :style="{color: (status = isEffectOptions[parseInt(scope.row.isEffect)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="color: #5FB878"
            v-if="scope.row.isEffect != 1"
            @click="handleEffect(scope.row)"
            v-hasPermi="['server:sms:effect']"
          >激活
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="color: #FFB800"
            @click="handleSmsTest(scope.row)"
            v-hasPermi="['server:sms:smsTest']"
          >测试
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

    <!-- 添加或修改SMS短信服务配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="服务商" prop="provider">
          <el-select v-model="form.provider" placeholder="请选择服务商">
            <el-option
              v-for="dict in providerOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="appKey" prop="appKey">
          <el-input v-model="form.appKey" placeholder="请输入appKey"/>
        </el-form-item>
        <el-form-item label="appAccess" prop="appAccess">
          <el-input v-model="form.appAccess" placeholder="请输入appAccess"/>
        </el-form-item>
        <el-form-item label="签名" prop="signature">
          <el-input v-model="form.signature" placeholder="请输入签名"/>
        </el-form-item>
        <el-form-item label="模板" prop="template">
          <el-input v-model="form.template" placeholder="请输入模板"/>
        </el-form-item>
        <el-form-item label="地区" prop="region" v-if="form.provider != 0">
          <el-input v-model="form.region" placeholder="请输入地区"/>
        </el-form-item>
        <el-form-item label="smsSdkAppid" prop="smsSdkAppid" v-if="form.provider == 0">
          <el-input v-model="form.smsSdkAppid" placeholder="请输入smsSdkAppid"/>
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
import { listSms, getSms, delSms, addSms, updateSms, effectSms, smsTest } from '@/api/platform-web/server/sms'

export default {
  name: 'Sms',
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
      // SMS短信服务配置表格数据
      smsList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 服务商字典
      providerOptions: [],
      // 状态字典
      isEffectOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        provider: null,
        isEffect: null,
        orderByColumn: 'is_effect',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: 'SMS名称不能为空', trigger: 'blur' }
        ],
        provider: [
          { required: true, message: '服务商不能为空', trigger: 'change' }
        ],
        appKey: [
          { required: true, message: 'appKey不能为空', trigger: 'blur' }
        ],
        appAccess: [
          { required: true, message: 'appAccess不能为空', trigger: 'blur' }
        ],
        signature: [
          { required: true, message: '签名不能为空', trigger: 'blur' }
        ],
        template: [
          { required: true, message: '模板不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('server_sms_provider').then(response => {
      this.providerOptions = response.data
    })
    this.getDicts('server_sms_status').then(response => {
      this.isEffectOptions = response.data
    })
  },
  methods: {
    /** 查询SMS短信服务配置列表 */
    getList() {
      this.loading = true
      listSms(this.queryParams).then(response => {
        this.smsList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 服务商字典翻译
    providerFormat(row, column) {
      return this.selectDictLabel(this.providerOptions, row.provider)
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
        provider: null,
        appKey: null,
        appAccess: null,
        region: null,
        signature: null,
        template: null,
        smsSdkAppid: null,
        identify: null,
        isEffect: 0,
        endpoint: null
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
      this.title = '添加SMS短信服务配置'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSms(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改SMS短信服务配置'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSms(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSms(this.form).then(response => {
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
      for (const item of this.smsList) {
        for (const id of ids) {
          if (id === item.id && item.isEffect === 1) {
            this.msgWarning('编号' + id + '已激活，请勿删除')
            return
          }
        }
      }
      this.$confirm('是否确认删除SMS短信服务配置编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSms(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    handleEffect(row) {
      this.$confirm('确定要激活SMS短信服务配置编号为"' + row.id + '"的状态吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return effectSms(row.id)
      }).then(() => {
        this.getList()
        this.msgSuccess('修改状态成功')
      }).catch(() => {
      })
    },
    handleSmsTest(row) {
      this.$prompt('请输入您的手机号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        return smsTest(row.id, value).then((res) => {
          if (res.code === 200) {
            this.$notify.success(res.msg)
          } else {
            this.$notify.error(res.msg)
          }
        }).catch(() => {
          this.$notify.error('网络异常')
        })
      }).catch(() => {
      })
    }
  }
}
</script>
