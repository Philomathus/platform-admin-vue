<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代充人账号-昵称" prop="agentId" label-width="118px">
        <el-select
          filterable
          v-model="queryParams.agentId"
          placeholder="请选择代充人账号-昵称"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="Account in accountOptions"
            :key="Account.id"
            :label="Account.nickName"
            :value="Account.id"
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
          v-hasPermi="['pay:payAgentCard:add']"
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
          v-hasPermi="['pay:payAgentCard:edit']"
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
          v-hasPermi="['pay:payAgentCard:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentCard:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="payAgentCardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="代充人账号" align="center" prop="account"/>
      <el-table-column label="代充人昵称" align="center" prop="nickName"/>
      <el-table-column label="收款银行" align="center" prop="bankName"/>
      <el-table-column label="收款账号" align="center" prop="bankAccount"/>
      <el-table-column label="开户地点" align="center" prop="openSite"/>
      <el-table-column label="收款名称" align="center" prop="accountName"/>
      <el-table-column label="操作人" align="center" prop="operator"/>
      <el-table-column label="操作时间" align="center" prop="operatorTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentCard:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentCard:remove']"
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

    <!-- 添加代充人银行卡对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="代充人账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充人账号"/>
        </el-form-item>
        <el-form-item label="收款银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入收款银行"/>
        </el-form-item>
        <el-form-item label="收款账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入收款账号" maxlength="19" />
        </el-form-item>
        <el-form-item label="收款名称" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入收款名称"/>
        </el-form-item>
        <el-form-item label="开户地点" prop="openSite">
          <el-input v-model="form.openSite" placeholder="请输入开户地点"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改代充人银行卡对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="500px"
               append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="代充人账号" prop="account" >
          <el-input v-model="form.account" placeholder="请输入代充人账号" disabled="true"/>
        </el-form-item>
        <el-form-item label="收款银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入收款银行"/>
        </el-form-item>
        <el-form-item label="收款账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入收款账号" maxlength="19" />
        </el-form-item>
        <el-form-item label="收款名称" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入收款名称"/>
        </el-form-item>
        <el-form-item label="开户地点" prop="openSite">
          <el-input v-model="form.openSite" placeholder="请输入开户地点"/>
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
import {
  listPayAgentCard,
  getPayAgentCard,
  delPayAgentCard,
  addPayAgentCard,
  updatePayAgentCard,
  exportPayAgentCard,
  changeStatus,
  accounts
} from '@/api/platform-web/pay/payAgentCard'

export default {
  name: 'PayAgentCard',
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
      // 代充人银行卡列表格数据
      payAgentCardList: [],
      accountOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      opene: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        agentId: null,
        account: null,
        nickName: null,
        bankName: null,
        bankAccount: null,
        openSite: null,
        accountName: null,
        operator: null,
        operatorTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [
          { required: true, message: '代充人账号不能为空', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '收款银行不能为空', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '收款账号不能为空且位数为13位-19位', trigger: 'blur', pattern:/[1-9]\d{12,18}/ }
        ],
        accountName: [
          { required: true, message: '收款名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    //代充人账号
    accounts().then(response => {
      this.accountOptions = response.data
    })
  },
  methods: {
    //支付类型状态修改
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.nickName + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 查询代充人银行卡列列表 */
    getList() {
      this.loading = true
      listPayAgentCard(this.queryParams).then(response => {
        this.payAgentCardList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.opene = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        agentId: null,
        account: null,
        nickName: null,
        bankName: null,
        bankAccount: null,
        openSite: null,
        accountName: null,
        createTime: null,
        updateTime: null,
        operator: null,
        operatorTime: null,
        status: 0
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
      this.title = '添加代充人银行卡'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPayAgentCard(id).then(response => {
        this.form = response.data
        this.opene = true
        this.title = '修改代充人银行卡'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayAgentCard(this.form).then(response => {
              if (response.code !== 0) {
                this.msgSuccess("修改成功");
                this.opene = false;
                this.getList();
              } else {
                this.msgError(response.msg);
              }
            })
          } else {
            addPayAgentCard(this.form).then(response => {
              if (response.code !== 0) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              } else {
                this.$message.error(response.msg);
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除代充人银行卡列编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPayAgentCard(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportPayAgentCard(queryParams)
      }).then(response => {
        this.downloadExcel(response, '代充人银行卡列')
      }).catch(() => {
      })
    }
  }
}
</script>
