<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('activity.messageSystemNotice.tableDialog.title')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('activity.messageSystemNotice.tableDialog.titlePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.selectDate')" prop="pubdatetime" label-width="100">
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
          v-hasPermi="['admin:messageSystemNotice:add']"
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
          v-hasPermi="['admin:messageSystemNotice:edit']"
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
          v-hasPermi="['admin:messageSystemNotice:remove']"
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
          v-hasPermi="['admin:messageSystemNotice:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="messageSystemNoticeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.messageSystemNotice.tableDialog.title')" align="center" prop="title"/>
      <el-table-column :label="$t('activity.messageSystemNotice.tableDialog.content')" show-overflow-tooltip align="center" prop="content"/>
      <el-table-column :label="$t('global.ctTime')" align="center" prop="pubdatetime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.pubdatetime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:messageSystemNotice:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:messageSystemNotice:remove']"
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

    <!-- 添加或修改系统公告对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.messageSystemNotice.tableDialog.title')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('activity.messageSystemNotice.tableDialog.titlePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.messageSystemNotice.tableDialog.content')">
          <el-input v-model="form.content" type="textarea" :placeholder="$t('activity.messageSystemNotice.tableDialog.contentPlaceholder')" rows="5"/>
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
  listMessageSystemNotice,
  getMessageSystemNotice,
  delMessageSystemNotice,
  addMessageSystemNotice,
  updateMessageSystemNotice,
  exportMessageSystemNotice
} from "@/api/activity/messageSystemNotice";
import {pickerDateShortcuts} from "@/utils/dateUtils";


export default {
  name: "MessageSystemNotice",
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 日期范围
      dateRange: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 系统公告表格数据
      messageSystemNoticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        pubdatetime: null,
        orderByColumn: 'pubdatetime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {required: true, message: this.$t('activity.messageSystemNotice.validation.title'), trigger: "blur"}
        ],
        content: [
          {required: true, message: this.$t('activity.messageSystemNotice.validation.content'), trigger: "blur"}
        ],
        device: [
          {required: true, message: this.$t('activity.messageSystemNotice.validation.device'), trigger: "blur"}
        ],
        action: [
          {required: true, message: this.$t('activity.messageSystemNotice.validation.action'), trigger: "blur"}
        ],
        pubdatetime: [
          {required: true, message: this.$t('activity.messageSystemNotice.validation.pubdatatime'), trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询系统公告列表 */
    getList() {
      this.loading = true;
      listMessageSystemNotice(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.messageSystemNoticeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        content: null,
        device: null,
        action: null,
        pubdatetime: null
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
      this.dateRange = []
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
      this.title = this.$t('activity.messageSystemNotice.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMessageSystemNotice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.messageSystemNotice.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMessageSystemNotice(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addMessageSystemNotice(this.form).then(response => {
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
      this.$confirm(this.$t('global.deleteConfirm') + ids + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delMessageSystemNotice(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportMessageSystemNotice(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('activity.messageSystemNotice.exportTitle'))
      }).catch(() => {
      })
    }
  }
};
</script>
