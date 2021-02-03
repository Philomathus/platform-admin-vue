<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">

      <el-form-item label="日期选择" prop="reporttime">
        <el-input
          v-model="queryParams.reporttime"
          placeholder="请输入日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="名称" prop="classTwoname">
        <el-input
          v-model="queryParams.classTwoname"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>

    </el-form>
    <el-table
      v-loading="loading"
      :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
      style="width: 100%;"
      :stripe="true"
    >
      <el-table-column label="序号" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" prop="classTwoname" :show-overflow-tooltip="true"/>
      <el-table-column label="金额" align="center" prop="tValue" :show-overflow-tooltip="true"/>
      <el-table-column label="类型" align="center" prop="type"/>
      <el-table-column label="时间" align="center" prop="reporttime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reporttime) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>
  </div>
</template>

<script>
import {list} from "@/api/platform-web/report/comprehensiveStatistics";


export default {
  name: "Online",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 日期范围
      dateRange: [],
      // 总条数
      total: 0,
      // 表格数据
      list: [],
      pageNum: 1,
      pageSize: 20,
      // 查询参数
      queryParams: {
        reporttime: undefined,
        classTwoname: undefined
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询登录日志列表 */
    getList() {
      this.loading = true;
      list(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>

