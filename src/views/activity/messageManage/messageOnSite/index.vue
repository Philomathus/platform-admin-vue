<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('activity.messageOnSite.tableDialog.title')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('activity.messageOnSite.tableDialog.titlePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.ctTime')" prop="pubdatetime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          :range-separator="$t('global.dateTimePickerRangeSeparator')"
          :start-placeholder="$t('global.datePickerStartDatePlaceholder')"
          :end-placeholder="$t('global.datePickerEndDatePlaceholder')"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
          v-hasPermi="['admin:messageOnSite:add']"
        >{{ $t('global.addButton') }}
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
          v-hasPermi="['admin:messageOnSite:edit']"
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
          v-hasPermi="['admin:messageOnSite:remove']"
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
          v-hasPermi="['admin:messageOnSite:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAddUserMessage"
          v-hasPermi="['admin:messageOnSite:add']"
        >{{ $t('activity.messageOnSite.sendMemberMsgButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="messageOnSiteList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.messageOnSite.tableDialog.title')" align="center" prop="title"/>
      <el-table-column :label="$t('activity.messageOnSite.tableDialog.content')" show-overflow-tooltip align="center" prop="content"/>
      <el-table-column :label="$t('global.ctTime')" align="center" prop="pubdatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.pubdatetime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="会员id" align="center" prop="toUserId"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:messageOnSite:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:messageOnSite:remove']"
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

    <!-- 添加或修改站内信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.messageOnSite.tableDialog.title')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('activity.messageOnSite.tableDialog.titlePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.messageOnSite.tableDialog.content')">
          <el-input v-model="form.content" type="textarea" :placeholder="$t('activity.messageOnSite.tableDialog.contentPlaceholder')" rows="5"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="openUserMessage" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.messageOnSite.tableDialog.userId')" prop="toUserId">
          <el-input v-model="form.toUserId" :placeholder="$t('activity.messageOnSite.tableDialog.userIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.messageOnSite.tableDialog.title')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('activity.messageOnSite.tableDialog.titlePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.messageOnSite.tableDialog.content')">
          <el-input v-model="form.content" type="textarea" :placeholder="$t('activity.messageOnSite.tableDialog.contentPlaceholder')" rows="5"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormUserMessage">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="closeUserMessage">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMessageOnSite,
  getMessageOnSite,
  delMessageOnSite,
  addMessageOnSite,
  updateMessageOnSite,
  exportMessageOnSite,
  addUserMessage
} from '@/api/activity/messageOnSite'
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: 'MessageOnSite',
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 站内信息表格数据
      messageOnSiteList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      openUserMessage:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        content: null,
        receiverType: null,
        receiver: null,
        action: null,
        pubdatetime: null,
        orderByColumn: 'pubdatetime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {required: true, message: this.$t('activity.messageOnSite.validation.title'), trigger: 'blur'}
        ],
        toUserId: [
          {required: true, message: this.$t('activity.messageOnSite.validation.toUserId'), trigger: 'blur'}
        ],
        content: [
          {required: true, message: this.$t('activity.messageOnSite.validation.content'), trigger: 'blur'}
        ],
        receiverType: [
          {required: true, message: this.$t('activity.messageOnSite.validation.receiverType'), trigger: 'change'}
        ],
        action: [
          {required: true, message: this.$t('activity.messageOnSite.validation.action'), trigger: 'blur'}
        ],
        pubdatetime: [
          {required: true, message: this.$t('activity.messageOnSite.validation.pubdatatime'), trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询站内信息列表 */
    getList() {
      this.loading = true
      listMessageOnSite(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.messageOnSiteList = response.rows
        this.total = response.total
        this.loading = false
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
        title: null,
        content: null,
        receiverType: null,
        receiver: null,
        action: null,
        pubdatetime: null
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
      this.dateRange = []
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
      this.title = this.$t('activity.messageOnSite.addTitle')
    },
    handleAddUserMessage() {
      this.reset()
      this.openUserMessage = true
      this.title = this.$t('activity.messageOnSite.addUserTitle')
    },
    closeUserMessage(){
      this.openUserMessage = false
    },

    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMessageOnSite(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = this.$t('activity.messageOnSite.editTitle')
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMessageOnSite(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false
              this.getList()
            })
          } else {
            addMessageOnSite(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    submitFormUserMessage() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addUserMessage(this.form).then(response => {
              this.msgSuccess(this.$t('activity.messageOnSite.submitFormSuccess'))
              this.openUserMessage = false
              this.getList()
            })
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm(this.$t('global.deleteConfirm') + ids + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delMessageOnSite(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportMessageOnSite(queryParams)
      }).then(response => {
        (response.msg)
      })
    }
  }
}
</script>
