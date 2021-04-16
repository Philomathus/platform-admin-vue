<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="银行编码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入银行编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入银行名称"
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
          v-hasPermi="['pay:configBank:add']"
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
          v-hasPermi="['pay:configBank:edit']"
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
          v-hasPermi="['pay:configBank:remove']"
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
          v-hasPermi="['pay:configBank:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="configBankList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="银行名称" align="center" prop="name"/>
<!--      <el-table-column label="图标" align="center" prop="icon">-->
<!--        <template slot-scope="scope">-->
<!--          <el-image-->
<!--            style="height: 50px"-->
<!--            :src="scope.row.icon"-->
<!--            fit="contain"-->
<!--          >-->
<!--          </el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="银行官网地址" :show-overflow-tooltip="true" align="center" prop="url"/>
      <el-table-column label="排序" align="center" prop="indexs"/>
      <el-table-column label="银行账号" :show-overflow-tooltip="true" align="center" prop="bankAccount"/>
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
      <el-table-column label="开户人" align="center" prop="accountName"/>
      <el-table-column label="最小开放层级" align="center" prop="openLevel"/>
      <el-table-column label="最大开放层级" align="center" prop="openLevelMax"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:configBank:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:configBank:remove']"
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

    <!-- 添加或修改公司入款银行列表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="银行名称" prop="name">
          <el-select
            filterable
            v-model="form.name"
            placeholder="请选择银行名称"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in bankListOptions"
              :key="dict.id"
              :label="dict.bankName"
              :value="dict.bankName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入银行账号"/>
        </el-form-item>
        <el-form-item label="排序号" prop="indexs">
          <el-input v-model="form.indexs" placeholder="请输入排序号"/>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息"/>
        </el-form-item>
        <el-form-item label="开户人" prop="accountName">
          <el-input v-model="form.accountName" placeholder="请输入开户人"/>
        </el-form-item>
        <el-form-item label="开户地址" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="请输入开户地址"/>
        </el-form-item>
        <el-form-item label="优惠比例" prop="discountBill">
          <el-input v-model="form.discountBill" placeholder="请输入优惠比例"/>
        </el-form-item>
        <el-form-item label="开放层级" prop="openLevel">
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.openLevel" placeholder="请输入最小开放层级"/>
          </el-col>
          <el-col :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.openLevelMax" placeholder="请输入最大开放层级"/>
          </el-col>
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
  listConfigBank,
  getConfigBank,
  delConfigBank,
  addConfigBank,
  updateConfigBank,
  exportConfigBank,
  changeConfigBankStatus,
  bankLists
} from '@/api/platform-web/pay/configBank'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'ConfigBank',
  components: {
    ImageUpload
  },
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
      // 公司入款银行列表表格数据
      configBankList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      //银行列表
      bankListOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        name: null,
        orderByColumn: 'status desc,create_time desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '银行名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '官网地址不能为空', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '银行账号地址不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_common_status').then(response => {
      this.statusOptions = response.data
    })
    //银行列表
    bankLists().then(response => {
      this.bankListOptions = response.data
    })
  },
  methods: {
    /** 查询公司入款银行列表列表 */
    getList() {
      this.loading = true
      listConfigBank(this.queryParams).then(response => {
        this.configBankList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return changeConfigBankStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status === '0' ? '1' : '0'
      })
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
        code: null,
        name: null,
        icon: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        url: null,
        indexs: null,
        bankAccount: null,
        remark: null,
        status: null,
        accountName: null,
        bankAddress: null,
        discountBill: null,
        openLevel: null
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
      this.title = '添加公司入款银行列表'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getConfigBank(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改公司入款银行列表'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigBank(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addConfigBank(this.form).then(response => {
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
      this.$confirm('是否确认删除公司入款银行列表编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delConfigBank(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
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
        return exportConfigBank(queryParams)
      }).then(response => {
        this.downloadExcel(response, '公司入款银行')
      }).catch(() => {
      })
    }
  }
}
</script>
