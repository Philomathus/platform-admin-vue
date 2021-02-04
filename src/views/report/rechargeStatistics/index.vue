<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">入款总额: {{ this.data.paymentAmount }}</el-button>
    <el-button type="success" @click="copy2">出款总额: {{ this.data.outMoney }}</el-button>
    <el-button type="primary" @click="copy3">金额合计: {{ this.data.countMoney }}</el-button>
    <el-button type="success" @click="copy4">送礼总额: {{ this.data.totalAccountGifts }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :stripe="true" :data="report" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="报表时间" align="center" prop="reptime"/>
      <el-table-column label="入款总人数" min-width="90" align="center" prop="totalRukuanrenshu"/>
      <el-table-column label="公司入款人数" min-width="100" align="center" prop="gsRukuanrenshu"/>
      <el-table-column label="公司入款金额" min-width="100" align="center" prop="gsRukuanjine"/>
      <el-table-column label="公司出款总人数" min-width="120" align="center" prop="totalChukuanrenshu"/>
      <el-table-column label="线上入款人数" min-width="100" align="center" prop="xsRukunanrenshu"/>
      <el-table-column label="线上入款金额" min-width="100" align="center" prop="xsRukunanjine"/>
      <el-table-column label="人工入款人数" min-width="100" align="center" prop="rgRukunanrenshu"/>
      <el-table-column label="人工入款金额" min-width="100" align="center" prop="rgRukunanjine"/>
      <el-table-column label="平台优惠人数" min-width="100" align="center" prop="palmYouhuirenshu"/>
      <el-table-column label="平台优惠金额" min-width="100" align="center" prop="palmYouhuijine"/>
      <el-table-column label="预估会员剩余积分" min-width="130" align="center" prop="totalAccount"/>
      <el-table-column label="每日平台盈利" min-width="100" align="center" prop="totalProfile"/>
      <el-table-column label="每日送礼金额" min-width="100" align="center" prop="totalGiveprop"/>
      <el-table-column label="合计偏差" align="center" prop="totalLast"/>
      <el-table-column label="入款总金额" min-width="90" align="center" prop="totalRukuanjine"/>
      <el-table-column label="出款总金额" min-width="90" align="center" prop="totalChukuanjine"/>
      <el-table-column label="合计" align="center" prop="totalChukuanjineMath" fixed="right"
                       :formatter="totalChukuanjineMath"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


  </div>
</template>

<script>
import {listReport, count,liststorage} from "@/api/platform-web/report/rechargeStatistics";
import FileUpload from '@/components/FileUpload';


export default {
  name: "Report-moneyinfo",
  components: {
    FileUpload,
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
      // 平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额表格数据
      report: [],
      // 日期范围
      dateRange: [],
      data: {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        reptime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getliststorage()
    this.getList();
    this.count();
  },
  methods: {
    /** 查询平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额列表 */
    getList() {
      this.loading = true;
      listReport(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.report = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getliststorage() {
      this.loading = true;
      liststorage(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.getList();
      });
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
      this.loading = true;
      count(this.queryParams).then(response => {
        this.data = response.data;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getliststorage();
      this.getList();
      this.count();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.repId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    totalChukuanjineMath(rows, column) {
      return rows.totalRukuanjine - rows.totalChukuanjine
    }

  }
};
</script>
