<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveComplaint.queryForm.selectDateLabel')" prop="selectDate">
        <el-date-picker
          v-model="queryParams.selectDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('liveWeb.liveComplaint.queryForm.selectDateStartPlaceholder')"
          :end-placeholder="$t('liveWeb.liveComplaint.queryForm.selectDateEndPlaceholder')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder="$t('liveWeb.liveComplaint.queryForm.userIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="anchor">
        <el-input
          v-model="queryParams.anchor"
          :placeholder="$t('liveWeb.liveComplaint.queryForm.anchorPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('liveWeb.liveComplaint.queryForm.statusPlaceholder')" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveComplaint.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveComplaint.queryForm.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveComplaint:export']"
        >{{$t('liveWeb.liveComplaint.actions.export')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveComplaintList">
      <el-table-column :label="$t('liveWeb.liveComplaint.table.content')" align="center" prop="content" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.mobile')" align="center" prop="mobile" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.roomName')" align="center" prop="roomName" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.userId')" align="center" prop="userId" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.anchor')" align="center" prop="anchor" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.createTime')" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveComplaint.table.approver')" align="center" prop="approver" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.remark')" align="center" prop="remark" />
      <el-table-column :label="$t('liveWeb.liveComplaint.table.processingTime')" align="center" prop="processingTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.processingTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveComplaint.table.status')" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column :label="$t('liveWeb.liveComplaint.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,1)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >{{$t('liveWeb.liveComplaint.table.processButton')}}
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status == 0"
            @click="handleUpdate(scope.row,2)"
            v-hasPermi="['admin:liveComplaint:edit']"
          >{{$t('liveWeb.liveComplaint.table.rejectButton')}}
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

    <!-- 添加或修改主播投诉记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.remarkLabel')" prop="remark">
          <el-input v-model="form.remark" type="textarea" :placeholder="$t('liveWeb.liveComplaint.addDialog.remarkPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.userIdLabel')" prop="userId">
          <el-input v-model="form.userId" :placeholder="$t('liveWeb.liveComplaint.addDialog.userIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.anchorLabel')" prop="anchor">
          <el-input v-model="form.anchor" :placeholder="$t('liveWeb.liveComplaint.addDialog.anchorPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.approverLabel')" prop="approver">
          <el-input v-model="form.approver" :placeholder="$t('liveWeb.liveComplaint.addDialog.approverPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.processingTimeLabel')" prop="processingTime">
          <el-date-picker clearable size="small"
            v-model="form.processingTime"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="$t('liveWeb.liveComplaint.addDialog.processingTimePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveComplaint.addDialog.statusLabel')">
          <el-radio-group v-model="form.status">
            <el-radio label="1">{{$t('liveWeb.liveComplaint.addDialog.statusPlaceholder')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveComplaint.addDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveComplaint.addDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLiveComplaint, getLiveComplaint, delLiveComplaint, addLiveComplaint, updateLiveComplaint, exportLiveComplaint } from "@/api/live-web/liveComplaint";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "LiveComplaint",
  components: {
  },
  data() {
    return {
      statusOptions: [{
        value: '0',
        label: this.$t('liveWeb.liveComplaint.table.status0')
      }, {
        value: '1',
        label: this.$t('liveWeb.liveComplaint.table.status1')
      }, {
        value: '2',
        label: this.$t('liveWeb.liveComplaint.table.status2')
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
      // 主播投诉记录表格数据
      liveComplaintList: [],
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
        anchor: null,
        approver: null,
        processingTime: null,
        status: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询主播投诉记录列表 */
    getList() {
      this.loading = true;
      listLiveComplaint(this.queryParams).then(response => {
        this.liveComplaintList = response.rows;
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
        return this.$t('liveWeb.liveComplaint.table.status0')
      } else if (row.status == 1) {
        return this.$t('liveWeb.liveComplaint.table.status1')
      } else if (row.status == 2){
        return this.$t('liveWeb.liveComplaint.table.status2')
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        remark: null,
        userId: null,
        anchor: null,
        createTime: null,
        approver: null,
        processingTime: null,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.userId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.userId.match(reg)
        if(!flag){
          this.msgError(this.$t('liveWeb.liveComplaint.messageBox.userIdFormatError'))
          return
        }
      }
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('liveWeb.liveComplaint.addDialog.title');
    },
    /** 处理驳回按钮操作 */
    handleUpdate(row,status) {
      this.$prompt(this.$t('liveWeb.liveComplaint.confirmEditConfirmationPrompt.message'), this.$t('liveWeb.liveComplaint.confirmEditConfirmationPrompt.title'), {
        confirmButtonText: this.$t('liveWeb.liveComplaint.confirmEditConfirmationPrompt.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveComplaint.confirmEditConfirmationPrompt.cancelButton')
      }).then(({ value }) => {
        const id = row.id
        updateLiveComplaint(id,value,status).then(response => {
          this.msgSuccess(this.$t('liveWeb.liveComplaint.messageBox.editSuccess'));
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('liveWeb.liveComplaint.messageBox.editCancel')
        });
      });

    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveComplaint(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveComplaint.messageBox.updateLiveComplaintSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveComplaint(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveComplaint.messageBox.addLiveComplaintSuccess'));
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
      this.$confirm('是否确认删除主播投诉记录编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveComplaint(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('liveWeb.liveComplaint.confirmExportDialog.message'), this.$t('liveWeb.liveComplaint.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveComplaint.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveComplaint.confirmExportDialog.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportLiveComplaint(queryParams);
      }).then(response => {
        this.downloadExcel(response, '主播投诉记录');
      }).catch(() => {
      })
    }
  }
};
</script>
