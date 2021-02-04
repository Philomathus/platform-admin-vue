<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总投注金额: {{ this.data.countBetMoney }}</el-button>
    <el-button type="success" @click="copy2">总投注人数: {{ this.data.countBetPeople }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="日期选择" prop="begindate">
        <el-date-picker v-model="queryParams.begindate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="平台名称" prop="gameplame">
        <el-input
          v-model="queryParams.gameplame"
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

    <el-table v-loading="loading"
              :data="list.slice((pageNum-1)*pageSize,pageNum*pageSize)"
              style="width: 100%;"
              :stripe="true">
      <el-table-column label="平台编号" align="center" prop="gameagent" :show-overflow-tooltip="true"/>
      <el-table-column label="名称-详情" align="center" prop="gameplame" :show-overflow-tooltip="true"/>
      <el-table-column label="投注人数" align="center" prop="gamepepole"/>
      <el-table-column label="投注比数" align="center" prop="gametouzhu"/>
      <el-table-column label="总投注金额" align="center" prop="gamecell"/>
      <el-table-column label="有效投注金额" align="center" prop="gamebet"/>
      <el-table-column label="平台抽水" align="center" prop="gamerevenve"/>
      <el-table-column label="会员盈利" align="center" prop="gameprofit"/>
      <el-table-column label="比例" align="center" prop="bili"/>
      <el-table-column label="日期" align="center" prop="begindate">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.begindate) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>
  </div>
</template>

<script>
import {list, count,liststorage} from "@/api/platform-web/report/gameBet";


export default {
  name: "Online",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // countBetMoney:null,
      // countBetPeople:null,
      // 表格数据
      list: [],
      data: {},
      pageNum: 1,
      pageSize: 20,
      // 查询参数
      queryParams: {
        begindate: undefined,
        gameplame: undefined
      }
    };
  },
  created() {
    this.getliststorage();
    this.getList();
    this.count();
  },
  methods: {

    getList() {
      this.loading = true;
      list(this.queryParams).then(response => {
        debugger
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      })
    },
    getliststorage() {
      this.loading = true;
      liststorage(this.queryParams).then(response => {
      });
    },
    //复制
    copy1() {
      this.copyCommand(this.data.countBetMoney)
    },
    copy2() {
      this.copyCommand(this.data.countBetPeople)
    },
    //统计
    count() {
      this.loading = true;
      count(this.queryParams).then(response => {
        this.data = response.data;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {

      this.pageNum = 1;
     this.getliststorage();
      this.getList();
      this.count();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>

