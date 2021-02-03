<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总成功金额: {{this.data.countSuccessMoney}}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期选择" prop="paydate">
        <el-date-picker v-model="queryParams.paydate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="report" :stripe="true">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="收款金额" align="center" prop="money"/>
      <el-table-column label="线下或者线上" align="center" prop="type"/>
      <el-table-column label="收款平台" align="center" prop="payplam"/>
      <el-table-column label="收款通道" align="center" prop="paychancl"/>
      <el-table-column label="收款商户" align="center" prop="paycard"/>
      <el-table-column label="时间" align="center" prop="paydate">
      </el-table-column>
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

import {listReport,count} from "@/api/platform-web/report/incomeDay";
import FileUpload from '@/components/FileUpload';


export default {
  name: "memberGame",
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
        paydate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
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
    //复制
    copy1() {
      this.copyCommand(this.data.countSuccessMoney)
    },
    count() {
      this.loading = true;
      count(this.queryParams).then(response => {
        this.data= response.data;
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
      this.getList();
      this.count();
    },


  }
};
</script>
