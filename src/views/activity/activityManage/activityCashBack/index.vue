<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('global.selectDate')" prop="selectDate"
                    label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}"
                        :start-placeholder="$t('global.datePickerStartDatePlaceholder')"
                        :end-placeholder="$t('global.datePickerEndDatePlaceholder')"
                        :range-separator="$t('global.selectDateRangeSeparator')"
                        :default-time="['00:00:00', '23:59:59']" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="rebate">
        <el-input
          v-model="queryParams.rebate"
          :placeholder="$t('activity.activityManage.activityCashBack.rebateAmount')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status"
                   :placeholder="$t('global.selectStatus')" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['admin:activityCashBack:add']"
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
          v-hasPermi="['admin:activityCashBack:edit']"
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
          v-hasPermi="['admin:activityCashBack:remove']"
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
          v-hasPermi="['admin:activityCashBack:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="activityCashBackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.activityManage.activityCashBack.tableDialog.tableId')" align="center" prop="id"/>
      <el-table-column :label="$t('activity.activityManage.activityCashBack.tableDialog.minDeposit')" align="center" prop="depositTotalMin"/>
      <el-table-column :label="$t('activity.activityManage.activityCashBack.tableDialog.maxDeposit')" align="center" prop="depositTotalMax"/>
      <el-table-column :label="$t('activity.activityManage.activityCashBack.rebateAmount')" align="center" prop="rebate"/>
      <el-table-column :label="$t('global.status')" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:activityCashBack:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:activityCashBack:remove']"
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

    <!-- 添加或修改【充值返现】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item :label="$t('activity.activityManage.activityCashBack.tableDialog.minDeposit')" prop="depositTotalMin">
          <el-input v-model="form.depositTotalMin" type="number" :placeholder="$t('activity.activityManage.activityCashBack.tableDialog.minDepositPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.activityCashBack.tableDialog.maxDeposit')" prop="depositTotalMax">
          <el-input v-model="form.depositTotalMax" type="number" :placeholder="$t('activity.activityManage.activityCashBack.tableDialog.maxDepositPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.activityCashBack.rebateAmount')" prop="rebate">
          <el-input v-model="form.rebate" type="number" :placeholder="$t('activity.activityManage.activityCashBack.rebateAmount')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton' )}}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton' ) }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listActivityCashBack,
  changeActivityInfoStatus,
  getActivityCashBack,
  delActivityCashBack,
  addActivityCashBack,
  updateActivityCashBack,
  exportActivityCashBack
} from "@/api/activity/activityCashBack";
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'


export default {
  name: "ActivityCashBack",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      statusOptions: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【充值返现】表格数据
      activityCashBackList: [],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 弹出层标题
      title: this.$t('activity.activityManage.activityCashBack.title'),
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],//回调日期
        pageNum: 1,
        pageSize: 10,
        depositTotalMin: null,
        depositTotalMax: null,
        rebate: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        depositTotalMin: [
          {required: true, message: this.$t('activity.activityManage.activityCashBack.validation.depositTotalMin'), trigger: "blur"}
        ],
        depositTotalMax: [
          {required: true, message: this.$t('activity.activityManage.activityCashBack.validation.depositTotalMax'), trigger: "blur"}
        ],
        rebate: [
          {required: true, message: this.$t('activity.activityManage.activityCashBack.validation.rebate'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
    //状态字典
    this.getDicts('activityInfo_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询【充值返现】列表 */
    getList() {
      this.loading = true;
      listActivityCashBack(this.queryParams).then(response => {
        this.activityCashBackList = response.rows;
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
        depositTotalMin: null,
        depositTotalMax: null,
        rebate: null,
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
      this.title = this.$t('activity.activityManage.activityCashBack.addCashbackTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivityCashBack(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.activityManage.activityCashBack.editCashbackTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivityCashBack(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addActivityCashBack(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */


    deleteConfirm1: 'Do you want to delete "',
    deleteConfirmTitle: 'Confirm',
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(this.$t('global.deleteConfirm') + ids + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delActivityCashBack(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    //修改状态
    handleStatusChange(row) {
      let text = row.status === '1'
        ? this.$t('global.statusEnable')
        : this.$t('global.statusDisable')
      this.$confirm(this.$t('global.statusEditSuccess')
        + text
        + '""'
        + this.title
        + this.$t('global.statusConfirmQuestion'),
        this.$t('global.statusConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return changeActivityInfoStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('global.statusEditSuccess'))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
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
        return exportActivityCashBack(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('global.exportResponse'));
      }).catch(() => {
      })
    }
  }
};
</script>
