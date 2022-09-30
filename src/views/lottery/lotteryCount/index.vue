<template>
  <div class="app-container">
    <!--    search form 搜索表格 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 15px;">

      <el-form-item label="会员ID" prop="puserId">
        <el-input
          v-model="queryParams.pUserId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="下注内容" prop="betInfo">
        <el-input
          v-model="queryParams.betInfo"
          placeholder="下注内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item label="期数" prop="issue">
        <el-input
          v-model="queryParams.issue"
          placeholder="期数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item prop="lotteryName">
        <el-select
          v-model="queryParams.lotteryName"
          placeholder="请选择彩票名称"
          clearable
          size="small"
          style="width: 240px">
          <el-option
            v-for="dict in lotteryNameOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!--member lottery count table-->
    <el-table stripe v-loading="loading"  :data="lotteryCountList" class="el-table--border">
      <el-table-column label="主键" prop="id"  align="center" min-width="120"/>
      <el-table-column label="彩票名称" prop="lotteryName" align="center"  min-width="120"/>
      <el-table-column label="会员ID" prop="puserId" align="center" min-width="120"/>
      <el-table-column label="期数"  prop="issue" align="center"  min-width="120"/>
      <el-table-column label="下注内容" prop="betInfo" align="center"   min-width="120"/>
      <el-table-column label="下注金额" prop="chip" align="center"   min-width="120"/>
      <el-table-column label="下注IP" prop="ip" align="center"   min-width="120"/>
    </el-table>

    <pagination
      v-show="total>10"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {listLotteryCount} from "@/api/platform-web/lottery/lotteryCount";
import {listLotteryInfo} from "@/api/platform-web/lottery/lotteryInfo";

export default {
  name: "index",
  data() {
    return {
      // 遮罩层 - loading layer
      loading: true,
      lotteryCountList: [],
      lotteryNameOptions : [],

      /** 总条数 total number*/
      total: 0,
      /**显示搜索条件  Show search criteria */
      showSearch: true,

      queryParams: {
         id:null,
         agent:"",
         lotteryName : "",
         name : "",
         lotteryId:"",
         pUserId: "",
         issue : "",
         betInfo : "",
         chip : "",
         ip : "",
         pageNum: 1,
         pageSize: 15
      },

    };
  },

  created() {
    this.getList();
    this.getLotteryNameList();
  },
  methods: {

    /** 获取轮池的所有列表 get all list of wheel pool*/
    getList() {
      this.loading = true;
      listLotteryCount(this.queryParams).then(response => {
        this.lotteryCountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    getLotteryNameList() {
      listLotteryInfo().then(response => {
        this.lotteryNameOptions = response.rows
      })
    },

    /** 搜索按钮操作 handle search query */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作  Reset button action*/
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

  }

}
</script>

<style scoped>

</style>
