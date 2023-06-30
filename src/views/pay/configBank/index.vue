<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label=" $t('pay.configBank.bc') " prop="code">
        <el-input
          v-model="queryParams.code"
          :placeholder=" $t('pay.configBank.pebc') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('pay.configBank.bn') " prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder=" $t('pay.configBank.pebn') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
        >{{ $t('global.newButton') }}
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
        >{{ $t('global.editButton') }}
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
        >{{ $t('global.deleteButton') }}
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
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="configBankList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label=" $t('pay.configBank.bn') " align="center" prop="name"/>
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
      <el-table-column :label=" $t('pay.configBank.bowa') " :show-overflow-tooltip="true" align="center" prop="url"/>
      <el-table-column :label=" $t('pay.configBank.sb') " align="center" prop="indexs"/>
      <el-table-column :label=" $t('pay.configBank.ban') " :show-overflow-tooltip="true" align="center" prop="bankAccount"/>
      <el-table-column :label=" $t('global.status') " align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('pay.configBank.ah') " align="center" prop="accountName"/>
      <el-table-column :label=" $t('pay.configBank.mol') " align="center" prop="openLevel"/>
      <el-table-column :label=" $t('pay.configBank.maxl') " align="center" prop="openLevelMax"/>
      <el-table-column :label=" $t('pay.configBank.mta') " align="center" prop="rechargeLimitMin"/>
      <el-table-column :label=" $t('pay.configBank.maxt') " align="center" prop="rechargeLimitMax"/>
      <el-table-column :label=" $t('global.oprationColumn') " align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdateText(scope.row)"
            v-hasPermi="['pay:configBank:edit']"
          >{{ $t('pay.configBank.txt') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:configBank:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:configBank:remove']"
          >{{ $t('global.deleteButton') }}
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

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label=" $t('pay.configBank.bn') " prop="name">
              <el-select filterable
                         v-model="form.name"
                         :placeholder=" $t('pay.configBank.psbn') "
                         clearable
                         size="small"
                         style="width: 240px">
                <el-option v-for="dict in bankListOptions"
                           :key="dict.id"
                           :label="dict.bankName"
                           :value="dict.bankName"/>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label=" $t('pay.configBank.ban') " prop="bankAccount">
              <el-input v-model="form.bankAccount" :placeholder=" $t('pay.configBank.peba') "/>
            </el-form-item>
          </div>
        </div>

        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label=" $t('pay.configBank.sn') " prop="indexs">
              <el-input v-model="form.indexs" :placeholder=" $t('pay.configBank.pesn') "/>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label=" $t('pay.configBank.ri') " prop="remark">
              <el-input v-model="form.remark" :placeholder=" $t('pay.configBank.peni') "/>
            </el-form-item>
          </div>
        </div>

        <el-form-item :label=" $t('pay.configBank.ah') " prop="accountName">
          <el-input v-model="form.accountName" :placeholder=" $t('pay.configBank.peah') "/>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.aoa') " prop="bankAddress">
          <el-input v-model="form.bankAddress" :placeholder=" $t('pay.configBank.peaa') "/>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.pr') " prop="discountBill">
          <el-input v-model="form.discountBill" :placeholder=" $t('pay.configBank.pedp') "/>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.ol') " prop="openLevel">
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.openLevel" :placeholder=" $t('pay.configBank.pemol') "/>
          </el-col>
          <el-col :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.openLevelMax" :placeholder=" $t('pay.configBank.pemxol') "/>
          </el-col>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.al') " prop="openLevel">
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.rechargeLimitMin" :placeholder=" $t('pay.configBank.pemra') "/>
          </el-col>
          <el-col :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-input type="number" class="no-number" v-model="form.rechargeLimitMax" :placeholder=" $t('pay.configBank.pemxra') "/>
          </el-col>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.pres') " prop="url">
          <el-input v-model="form.url" :placeholder=" $t('pay.configBank.ucts') "/>
        </el-form-item>
        <el-form-item :label=" $t('pay.configBank.gc') " prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" :placeholder=" $t('pay.configBank.pegac') " type="number" class="no-number"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="openText" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label=" $t('pay.configBank.t2') " prop="text2">
          <el-input v-model="form.text2" :placeholder=" $t('pay.configBank.pet2') " type="textarea" :rows="4"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormText">{{ $t('global.submitButton') }}</el-button>
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
  changeConfigBankText,
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
      openText:false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        name: null,
        orderByColumn: 'status desc,indexs asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '银行名称不能为空', trigger: 'blur' }
        ],
        bankAccount: [
          { required: true, message: '银行账号地址不能为空', trigger: 'blur' }
        ],
        googleAuthCode: [
          { required: true, message: '谷歌验证码不能为空', trigger: 'blur' }
        ]
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
      }).then(function() {
        const data = {
          id: row.id,
          status: row.status
        }
        return changeConfigBankText(data)
      }).then(() => {
        this.msgSuccess(text + '成功')
        this.getList()
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
    handleUpdateText(row) {
      this.reset()
      const id = row.id
      getConfigBank(id).then(response => {
        this.form = response.data
        this.openText = true
        this.title = '文本编辑'
      })
    },
    submitFormText() {
      changeConfigBankText(this.form).then(response => {
        this.msgSuccess('修改成功')
        this.openText = false
        this.getList()
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
      this.$confirm('是否确认删除' + row.name  + '?', '警告', {
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
