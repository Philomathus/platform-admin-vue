<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">{{ $t('report.rechargeStatistics.tai') }} {{ this.data.paymentAmount || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('report.rechargeStatistics.td') }} {{ this.data.outMoney || 0 }}</el-button>
    <el-button type="primary" @click="copy3">{{ $t('report.rechargeStatistics.ta') }} {{ this.data.countMoney || 0 }}</el-button>
    <el-button type="success" @click="copy4">{{ $t('report.rechargeStatistics.as') }} {{ this.data.totalAccountGifts || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" v-show="showSearch"
             label-width="68px">
      <el-form-item :label=" $t('report.rechargeStatistics.ds') " prop="reptime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          :start-placeholder=" $t('global.datePickerStartDatePlaceholder') "
          :end-placeholder=" $t('global.datePickerEndDatePlaceholder') "
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
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
          v-hasPermi="['web:report-moneyinfo:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">
      <el-table v-loading="loading" :stripe="true" :data="report" @selection-change="handleSelectionChange">
        <el-table-column  :label=" $t('report.rechargeStatistics.rt') " align="center" prop="reptime" min-width="120" fixed="left"/>
        <el-table-column  :label=" $t('report.rechargeStatistics.tne') " min-width="90" align="center" prop="totalRukuanrenshu">
          <template v-slot="{row}">
            <span style="color: #5FB878">{{ row.totalRukuanrenshu}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="出款总人数" min-width="120" align="center" prop="totalChukuanrenshu" >
        <template v-slot="{row}">
          <span style="color: #FF5722">{{ row.totalChukuanrenshu}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.tnc') " min-width="120" align="center" prop="gsRukuanrenshu">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.gsRukuanrenshu}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.cda') " min-width="100" align="center" prop="gsRukuanjine">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.gsRukuanjine}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.nod') " min-width="100" align="center" prop="xsRukunanrenshu">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.xsRukunanrenshu}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.oda') " min-width="100" align="center" prop="xsRukunanjine">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.xsRukunanjine}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.nme') " min-width="100" align="center" prop="rgRukunanrenshu">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.rgRukunanrenshu}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.mda') " min-width="100" align="center" prop="rgRukunanjine">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.rgRukunanjine}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.noc') " min-width="100" align="center" prop="totalAccount">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.totalAccount}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.ca') " min-width="100" align="center" prop="totalLast">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.totalLast}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.as') " min-width="100" align="center" prop="totalGiveprop">
          <template v-slot="{row}">
            <span style="color: #FF5722">{{ row.totalGiveprop}}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.noo') " min-width="100" align="center" prop="palmYouhuirenshu">
        <template v-slot="{row}">
          <span style="color: #FF5722">{{ row.palmYouhuirenshu}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.po') " min-width="100" align="center" prop="palmYouhuijine">
        <template v-slot="{row}">
          <span style="color: #FF5722">{{ row.palmYouhuijine}}</span>
        </template>
        </el-table-column>
        <el-table-column label=" usdt人数 " min-width="130" align="center" prop="usdtRenshu">
          <template v-slot="{row}">
            <span style="color: #FF5722">{{ row.usdtRenshu}}</span>
          </template>
        </el-table-column>

        <el-table-column label=" usdt金额 " min-width="130" align="center" prop="usdtJine">
          <template v-slot="{row}">
            <span style="color: #FF5722">{{ row.usdtJine}}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.tad') " min-width="130" align="center" prop="totalRukuanjine" fixed="right">
        <template v-slot="{row}">
          <span style="color: #5FB878">{{ row.totalRukuanjine}}</span>
        </template>
        </el-table-column>
        <el-table-column :label=" $t('report.rechargeStatistics.tamp') " min-width="130" align="center" prop="totalChukuanjine" fixed="right">
        <template v-slot="{row}">
          <span style="color: #FF5722">{{ row.totalChukuanjine}}</span>
        </template>
        </el-table-column>

        <el-table-column :label=" $t('report.rechargeStatistics.aw') " min-width="130" align="center" prop="totalActiveprop" fixed="right">
          <template v-slot="{row}">
            <span style="color: #FF5722">{{ row.totalActiveprop}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合计" align="center" prop="totalChukuanjineMath" fixed="right"
                         :formatter="totalChukuanjineMath" min-width="130"
        />
      </el-table>
    </div>

    <!--    <pagination-->
    <!--      v-show="total>0"-->
    <!--      :total="total"-->
    <!--      :page.sync="queryParams.pageNum"-->
    <!--      :limit.sync="queryParams.pageSize"-->
    <!--      @pagination="getList"-->
    <!--    />-->


  </div>
</template>

<script>
import {listReport, count, liststorage, exportReportMonwyInfo} from '@/api/platform-web/report/rechargeStatistics'
import {get7beforeDay, getDateEndTime, getDateStartTime, pickerDateShortcuts} from '@/utils/dateUtils'

export default {
  name: 'Recharge',
  components: {},
  data() {
    return {
      //日期快捷
      pickerOptions: { shortcuts: pickerDateShortcuts },
      interval: {listTime: null},
      // 遮罩层
      listLoading: false,
      isDestroyed: false,
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
      // 平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额表格数据
      report: [],
      // 日期范围
      dateRange: [this.parseTime(get7beforeDay(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
      data: {},
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        reptime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  destroyed() {
    this.isDestroyed = true
    this.listLoading = false;
  },
  methods: {
    /** 查询平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额列表 */
    getList() {
      var that = this
      this.loading = true
      listReport(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.report = response.rows
        that.listLoading = false;
        that.$rjLoading.hide();
        this.count();
      })
      //   .catch((err) => {
      //   if (err == 'Error: 报表正在生成，请稍后...') {
      //     if (!that.listLoading) {
      //       that.listLoading = true;
      //       that.$rjLoading.show('报表正在生成', that);
      //     }
      //     if (!this.isDestroyed) {
      //       setTimeout(() => {
      //         that.getList();
      //       }, 10000);
      //     }
      //   }
      // }).finally(() => {
      //     this.loading = false
      //   }
      // );
    },
    getliststorage() {
      this.loading = true
      liststorage(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.getList()
      })
    },
    //复制
    copy1() {
      this.copyCommand(this.data.paymentAmount)
    },
    copy2() {
      this.copyCommand(this.data.outMoney)
    },
    copy3() {
      this.copyCommand(this.data.countMoney)
    },
    copy4() {
      this.copyCommand(this.data.totalAccountGifts)
    },
    count() {
      this.loading = true
      count(this.queryParams).then(response => {
        this.data = response.data
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
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
      this.ids = selection.map(item => item.repId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    totalChukuanjineMath(rows, column) {
      return (rows.totalRukuanjine - rows.totalChukuanjine-rows.totalActiveprop).toFixed(2)
    },
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm( this.$t('report.rechargeStatistics.cpe') , this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportReportMonwyInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('report.rechargeStatistics.pfs') )
      }).catch(() => {
      })
    }

  }
}
</script>
