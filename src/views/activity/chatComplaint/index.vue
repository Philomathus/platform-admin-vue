<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('global.selectDate')" prop="selectDate">
        <el-date-picker
          v-model="queryParams.selectDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          :range-separator="$t('global.selectDateRangeSeparator')"
          :start-:placeholder="$t('global.selectDateStartPlaceholder')"
          :end-:placeholder="$t('global.selectDateEndPlaceholder')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder="$t('activity.chatComplaint.tableDialog.userIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="kfId">
        <el-input
          v-model="queryParams.kfId"
          :placeholder="$t('activity.chatComplaint.tableDialog.kfIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="queryParams.account"
          :placeholder="$t('activity.chatComplaint.tableDialog.accountPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="approver">
        <el-input
          v-model="queryParams.approver"
          :placeholder="$t('activity.chatComplaint.tableDialog.approverPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item :label="审批备注" prop="comments">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.comments"-->
      <!--          :placeholder="请输入审批备注"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('activity.chatComplaint.tableDialog.statusPlaceholder')" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            ::label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>-->
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          plain-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['admin:chatComplaint:add']"-->
      <!--        >{{ $t('global.addButton') }}</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          plain-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['admin:chatComplaint:edit']"-->
      <!--        >{{ $t('global.editButton') }}</el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          plain-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['admin:chatComplaint:remove']"-->
      <!--        >{{ $t('global.deleteButton') }}</el-button>-->
      <!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:chatComplaint:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="chatComplaintList">
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.remark')" align="center" prop="remark"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.userId')" align="center" prop="userId"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.kfId')" align="center" prop="kfId"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.account')" align="center" prop="account"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.createTime')" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.approver')" align="center" prop="approver"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.comments')" align="center" prop="comments"/>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.processingTime')" align="center" prop="processingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.processingTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.chatComplaint.tableDialog.status')" align="center" prop="status" :formatter="formatterStatus"/>

      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,1)"
            v-hasPermi="['admin:chatComplaint:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,2)"
            v-hasPermi="['admin:chatComplaint:edit']"
          >{{
              $t('global.deleteButton')
            }}
          </el-button>
        </template>
        <!--        <template slot-scope="scope">-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            type="text"-->
        <!--            icon="el-icon-edit"-->
        <!--            @click="handleUpdate(scope.row)"-->
        <!--            v-hasPermi="['admin:chatComplaint:edit']"-->
        <!--          >{{ $t('global.editButton') }}</el-button>-->
        <!--          <el-button-->
        <!--            size="mini"-->
        <!--            type="text"-->
        <!--            icon="el-icon-delete"-->
        <!--            @click="handleDelete(scope.row)"-->
        <!--            v-hasPermi="['admin:chatComplaint:remove']"-->
        <!--          >{{ $t('global.deleteButton') }}</el-button>-->
        <!--        </template>-->
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改客服投诉对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.remark')" prop="remark">
          <el-input v-model="form.remark" type="textarea"
                    :placeholder="$t('activity.chatComplaint.tableDialog.remarkPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.userId')" prop="userId">
          <el-input v-model="form.userId" :placeholder="$t('activity.chatComplaint.tableDialog.userIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.kfid')" prop="kfId">
          <el-input v-model="form.kfId" :placeholder="$t('activity.chatComplaint.tableDialog.kfidPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.processingTime')" prop="processingTime">
          <el-date-picker clearable size="small"
                          v-model="form.processingTime"
                          type="date"
                          value-format="yyyy-MM-dd"
                          :placeholder="$t('activity.chatComplaint.tableDialog.processingTime')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.approver')" prop="approver">
          <el-input v-model="form.approver" :placeholder="$t('activity.chatComplaint.tableDialog.approverPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.comments')" prop="comments">
          <el-input v-model="form.comments" :placeholder="$t('activity.chatComplaint.tableDialog.commentsPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.chatComplaint.tableDialog.statusOptions')">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">$t('activity.chatComplaint.tableDialog.statusPlaceholder')</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listChatComplaint,
  getChatComplaint,
  delChatComplaint,
  addChatComplaint,
  updateChatComplaint,
  exportChatComplaint
} from "@/api/activity/chatComplaint";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "ChatComplaint",
  components: {},
  data() {
    return {
      statusOptions: [{
        value: '0',
        label: this.$t('activity.chatComplaint.statusOptions.unprocessed')
      }, {
        value: '1',
        label: this.$t('activity.chatComplaint.statusOptions.processed')
      }, {
        value: '2',
        label: this.$t('activity.chatComplaint.statusOptions.rejected')
      }],
      // 日期范围
      selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      pickerOptions: {shortcuts: pickerDateShortcuts},
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
      // 客服投诉表格数据
      chatComplaintList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
        pageNum: 1,
        pageSize: 10,
        userId: null,
        kfId: null,
        processingTime: null,
        approver: null,
        comments: null,
        status: null,
        account: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询客服投诉列表 */
    getList() {
      this.loading = true;
      listChatComplaint(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.chatComplaintList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 处理状态
    formatterStatus(row) {
      if (row.status == 0) {
        return this.$t('activity.chatComplaint.statusOptions.unprocessed')
      } else if (row.status == 1) {
        return this.$t('activity.chatComplaint.statusOptions.processed')
      } else if (row.status == 2) {
        return this.$t('activity.chatComplaint.statusOptions.rejected')
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        remark: null,
        userId: null,
        kfId: null,
        processingTime: null,
        approver: null,
        comments: null,
        createTime: null,
        account: null,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('activity.chatComplaint.addTitle');
    },
    /** 处理驳回按钮操作 */
    handleUpdate(row, status) {
      this.$prompt(this.$t('activity.chatComplaint.updateChatComplaintPrompt', this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
      }).then(({value}) => {
        const id = row.id
        updateChatComplaint(id, value, status).then(response => {
          this.msgSuccess(this.$t('activity.updateChatComplaintSuccess'));
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('activity.updateChatComplaintError')
        });
      }));
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChatComplaint(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'))
              this.open = false;
              this.getList();
            });
          } else {
            addChatComplaint(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(this.$t('global.deleteConfirm') + row.title + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delChatComplaint(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportChatComplaint(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('global.exportResponse'))
      }).catch(() => {
      })
    }
  }
};
</script>
