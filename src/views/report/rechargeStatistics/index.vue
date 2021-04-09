<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">入款总额: {{ this.data.paymentAmount || 0 }}</el-button>
    <el-button type="success" @click="copy2">出款总额: {{ this.data.outMoney || 0 }}</el-button>
    <el-button type="primary" @click="copy3">金额合计: {{ this.data.countMoney || 0 }}</el-button>
    <el-button type="success" @click="copy4">送礼总额: {{ this.data.totalAccountGifts || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" v-show="showSearch"
             label-width="68px">
      <el-form-item label="日期选择" prop="reptime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">
      <el-table v-loading="loading" :stripe="true" :data="report" @selection-change="handleSelectionChange">
        <el-table-column label="报表时间" align="center" prop="reptime" min-width="120" fixed="left"/>
        <el-table-column label="入款总人数" min-width="90" align="center" prop="totalRukuanrenshu"/>
        <el-table-column label="出款总人数" min-width="120" align="center" prop="totalChukuanrenshu"/>
        <el-table-column label="公司入款人数" min-width="100" align="center" prop="gsRukuanrenshu"/>
        <el-table-column label="公司入款金额" min-width="100" align="center" prop="gsRukuanjine"/>
        <el-table-column label="线上入款人数" min-width="100" align="center" prop="xsRukunanrenshu"/>
        <el-table-column label="线上入款金额" min-width="100" align="center" prop="xsRukunanjine"/>
        <el-table-column label="人工入款人数" min-width="100" align="center" prop="rgRukunanrenshu"/>
        <el-table-column label="人工入款金额" min-width="100" align="center" prop="rgRukunanjine"/>
        <el-table-column label="代充人数" min-width="100" align="center" prop="totalAccount"/>
        <el-table-column label="代充金额" min-width="100" align="center" prop="totalLast"/>
        <el-table-column label="优惠人数" min-width="100" align="center" prop="palmYouhuirenshu"/>
        <el-table-column label="平台优惠" min-width="100" align="center" prop="palmYouhuijine"/>
        <el-table-column label="主播工资" min-width="100" align="center" prop="totalGiveprop"/>
        <el-table-column label="入款总金额" min-width="130" align="center" prop="totalRukuanjine" fixed="right"/>
        <el-table-column label="出款总金额" min-width="130" align="center" prop="totalChukuanjine" fixed="right"/>
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
      }).catch((err) => {
        if (err == 'Error: 报表正在生成，请稍后...') {
          if (!that.listLoading) {
            that.listLoading = true;
            that.$rjLoading.show('报表正在生成', that);
          }
          if (!this.isDestroyed) {
            setTimeout(() => {
              that.getList();
            }, 10000);
          }
        }
      }).finally(() => {
          this.loading = false
        }
      );
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
      return (rows.totalRukuanjine - rows.totalChukuanjine).toFixed(2)
    },
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportReportMonwyInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '平台资金报表')
      }).catch(() => {
      })
    }

  }
}
</script>
