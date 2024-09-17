<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item :label=" $t('members.memberMoney.mid') " prop="memberId">
            <el-input
              v-model="queryParams.memberId"
              :placeholder=" $t('members.memberMoney.pemid') "
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">
              {{ $t('global.searchButton') }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-upload
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              class="upload-demo"
              ref="upload"
              :action="uploadFileUrl"
              :headers="headers"
              name="excelFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-error="uploadFalse"
              :on-success="uploadSuccess"
              :auto-upload="true"
              :before-upload="beforeAvatarUpload">
              <el-button slot="trigger" size="small" type="primary" @click="submitUpload">
                {{ $t('members.memberMoney.uex') }}
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini" @click="starSend">{{ $t('members.memberMoney.sdel') }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="handleClean">{{ $t('members.memberMoney.cd') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="1.5" style="padding-top: 5px">
        <el-button type="success" size="mini">{{ $t('members.memberMoney.tda') }} {{ totalMoney || 0 }}</el-button>
        <el-button type="primary"
                   icon="el-icon-search"
                   size="mini"
                   @click="getTotalMoney"
                   style="margin-left: 20px">{{ $t('members.memberMoney.sda') }}
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['admin:memberMoney:edit']"
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
          v-hasPermi="['admin:memberMoney:remove']"
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
          v-hasPermi="['admin:memberMoney:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberMoneyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" min-width="150"/>
      <el-table-column :label=" $t('members.memberMoney.mid') " align="center" prop="memberId" min-width="150"/>
      <el-table-column :label=" $t('members.memberMoney.da') " align="center" prop="money" min-width="150"/>
      <el-table-column :label=" $t('members.memberMoney.cm') " align="center" prop="beat" min-width="150"/>
      <el-table-column :label=" $t('global.operationColumn') " align="center" class-name="small-padding fixed-width"
                       fixed="right" min-width="150">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:memberMoney:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:memberMoney:remove']"
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

    <!-- 添加或修改派送彩金暂存表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label=" $t('members.memberMoney.da') " prop="money">
          <el-input v-model="form.money" :placeholder=" $t('members.memberMoney.peda') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberMoney.cm') " prop="beat">
          <el-input v-model="form.beat" :placeholder=" $t('members.memberMoney.pecm') "/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="400px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="startPaiRules" label-width="100px">
        <el-form-item :label=" $t('members.memberMoney.rod') " prop="moneydes">
          <el-input v-model="form.moneydes" :placeholder=" $t('members.memberMoney.peen') "/>
        </el-form-item>
        <el-form-item :label=" $t('members.memberMoney.gc') " prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" :placeholder=" $t('members.memberMoney.pegac') "/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormStartSend">{{ $t('members.memberMoney.sd') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberMoney,
  getMemberMoney,
  delMemberMoney,
  addMemberMoney,
  updateMemberMoney,
  exportMemberMoney,
  starSend,
  handleClean,
  uploadFileUrl, count
} from '@/api/platform-web/member/memberMoney'
import {getToken} from '@/utils/auth'


export default {
  name: 'MemberMoney',
  components: {},
  data() {
    return {
      uploadFileUrl: uploadFileUrl(),
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      fileList: null,
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
      // 派送彩金暂存表表格数据
      memberMoneyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      opene: false,
      totalMoney: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        money: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        money: [
          {required: true, message: this.$t('members.memberMoney.dace'), trigger: 'blur'}
        ],
        beat: [
          {required: true, message: this.$t('members.memberMoney.cmce'), trigger: 'blur'}
        ]
      },
      startPaiRules: {
        moneydes: [
          {required: true, message: this.$t('members.memberMoney.tenc'), trigger: 'blur'}
        ],
        googleAuthCode: [
          {required: true, message: this.$t('members.memberMoney.gcce'), trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    uploadSuccess(res) {
      if (res.code === 200) {
        this.$message.success(this.$t('members.memberMoney.eus'))
      } else {
        this.$message.error(res.msg)
      }
      this.queryParams.memberId = null
      this.queryParams.pageNum = 1
      this.getList()
    },
    uploadFalse() {
      this.$message.error(this.$t('members.memberMoney.euf'))
    },
    handleExceed() {
      this.$message.error(this.$t('members.memberMoney.ooe'))
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'xlsx'
      const extensionXls = file.name.split('.')[1] === 'xls' //added this new extensionsXsl
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extensionXls) {
        this.$message.error(this.$t('members.memberMoney.ute'))
        return
      }
      if (!isLt2M) {
        this.$message.error(this.$t('members.memberMoney.sut'))
        return
      }
    },
    submitUpload() {
      //触发组件的action
      this.$refs.upload.submit()
    },

    handleRemove() {
      this.$message.success(this.$t('members.memberMoney.rs'))
    },
    handlePreview(file) {
      console.info(file.response.status)
      if (file.response.status) {

        this.$message.success(this.$t('members.memberMoney.tfis'))
      } else {
        this.$message.error(this.$t('members.memberMoney.tfif'))
      }
    },
    /** 查询派送彩金暂存表列表 */
    getList() {
      this.loading = true
      listMemberMoney(this.queryParams).then(response => {
        this.memberMoneyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleClean() {
      handleClean().then(response => {
        this.$message.success(this.$t('members.memberMoney.sdc'))
        this.queryParams.memberId = null
        this.queryParams.pageNum = 1
        this.getList()
      })
    },
    starSend() {
      this.reset()
      this.opene = true
      this.title = this.$t('members.memberMoney.sd')
    },
    submitFormStartSend() {
      this.opene = false
      const loading = this.$loading({
        lock: true,
        text: this.$t('members.memberMoney.dip'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      starSend(this.form.moneydes, this.form.googleAuthCode).then(response => {
        loading.close()
        if (response.code === 0) {
          this.getList()
          this.$message.success(this.$t('members.memberMoney.ds'))
        } else {
          this.$message.error(response.msg)
        }
      }).catch(
        loading.close()
      )
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
        memberId: null,
        money: null,
        beat: null,
        moneydes: null,
        googleAuthCode: null
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
      this.ids = selection.map(item => item.memberId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = this.$t('members.memberMoney.apsf')
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const memberId = row.memberId || this.ids
      getMemberMoney(memberId).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('members.memberMoney.mpbs')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.memberId != null) {
            updateMemberMoney(this.form).then(response => {
              this.msgSuccess(this.$t('members.memberMoney.ms'))
              this.open = false
              this.getList()
            })
          } else {
            addMemberMoney(this.form).then(response => {
              this.msgSuccess(this.$t('members.memberMoney.as'))
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const memberIds = row.memberId || this.ids
      this.$confirm(this.$t('members.memberMoney.wcd', {mid: memberIds}), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return delMemberMoney(memberIds)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('members.memberMoney.dels'))
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm(this.$t('members.memberMoney.cpe'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportMemberMoney(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('members.memberMoney.pbtd'))
      }).catch(() => {
      })
    },

    getTotalMoney() {
      count().then(res => {
        this.totalMoney = res.data
      })
    }
  }
}
</script>
