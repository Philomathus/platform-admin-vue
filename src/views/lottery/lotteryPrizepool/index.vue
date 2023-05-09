<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="lotteryDate">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 350px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          :start-placeholder="$t('global.datePickerStartDatePlaceholder')"
          :end-placeholder="$t('global.datePickerEndDatePlaceholder')"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item ::label="$t('lottery.lotteryPrizepool.form.lotteryIdlabel')" prop="lotteryId">
        <el-input
          v-model="queryParams.lotteryId"
          placeholder="$t('lottery.lotteryPrizepool.form.lotteryIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
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
          v-hasPermi="['admin:lotteryPrizepool:export']"
        >{{$t('global.exportButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryPrizepoolList" @selection-change="handleSelectionChange">
      <el-table-column width="55" align="center" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.lotteryName')" align="center" prop="lotteryName" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.lotteryId')" align="center" prop="lotteryId" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.lotteryDate')" align="center" prop="lotteryDate" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.lotteryHour')" align="center" prop="lotteryHour" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.ptzTotal')" align="center" prop="ptzTotal" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.ppjTotal')" align="center" prop="ppjTotal" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.psyTotal')" align="center" prop="psyTotal" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.pkillrate')" align="center" prop="pkillrate" />
      <el-table-column :label="$t('lottery.lotteryPrizepool.tableColumns.poolUsemoney')" align="center" prop="poolUsemoney" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      :page-sizes="[20,50,100]"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listLotteryPrizepool, getLotteryPrizepool, delLotteryPrizepool, addLotteryPrizepool, updateLotteryPrizepool, exportLotteryPrizepool } from "@/api/platform-web/lottery/lotteryPrizepool";
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: "LotteryPrizepool",
  components: {
  },
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      // 遮罩层
      loading: true,
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
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
      // 奖池配置表格数据
      lotteryPrizepoolList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        lotteryId: null,
        lotteryDate: null,
        lotteryHour: null,
        pTzTotal: null,
        pPjTotal: null,
        pSyTotal: null,
        pKillrate: null,
        poolUsemoney: null
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
    /** 查询奖池配置列表 */
    getList() {
      this.loading = true;
      listLotteryPrizepool(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.lotteryPrizepoolList = response.rows;
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
        lotteryId: null,
        lotteryDate: null,
        lotteryHour: null,
        pTzTotal: null,
        pPjTotal: null,
        pSyTotal: null,
        pKillrate: null,
        poolUsemoney: null
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = this.$t('lottery.lotteryPrizepool.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryPrizepool(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lottery.lotteryPrizepool.updateTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryPrizepool(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryPrizepool.updateSuccessMessage'));
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryPrizepool(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryPrizepool.addSuccessMessage'));
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
      this.$confirm(this.$t('lottery.lotteryPrizepool.confirmDeleteMessage', row.id), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delLotteryPrizepool(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('lottery.lotteryPrizepool.deleteSuccessMessage'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lottery.lotteryPrizepool.confirmExportMessage'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportLotteryPrizepool(queryParams);
      }).then(response => {
        this.downloadExcel(response, '奖池配置');
      }).catch(() => {
      })
    }
  }
};
</script>
