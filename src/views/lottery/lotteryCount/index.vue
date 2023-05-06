<template>
  <div class="app-container">
    <!--    search form 搜索表格 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 15px;">

      <el-form-item :label="$t('lottery.lotteryCount.form.puserIdLabel')" prop="puserId" label-width="120">
        <el-input
          v-model="queryParams.pUserId"
          :placeholder="$t('lottery.lotteryCount.form.puserIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryCount.form.betInfoLabel')" prop="betInfo" label-width="120">
        <el-input
          v-model="queryParams.betInfo"
          :placeholder="$t('lottery.lotteryCount.form.betInfoPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item :label="$t('lottery.lotteryCount.form.issueLabel')" prop="issue" label-width="120">
        <el-input
          v-model="queryParams.issue"
          :placeholder="$t('lottery.lotteryCount.form.issuePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item prop="lotteryName">
        <el-select
          v-model="queryParams.lotteryName"
          :placeholder="$t('lottery.lotteryCount.form.lotteryNamePlaceholder')"
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

    <!--member lottery count table-->
    <el-table stripe v-loading="loading"  :data="lotteryCountList" class="el-table--border">
      <el-table-column :label="$t('global.id')" prop="id"  align="center" min-width="120"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.lotteryName')" prop="lotteryName" align="center"  min-width="120"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.puserId')" prop="puserId" align="center" min-width="120"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.issue')"  prop="issue" align="center"  min-width="120"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.betInfo')" prop="betInfo" align="center"   min-width="140"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.chip')" prop="chip" align="center"   min-width="120"/>
      <el-table-column :label="$t('lottery.lotteryCount.tableColumns.ip')" prop="ip" align="center"   min-width="120"/>
    </el-table>

    <pagination
      v-show="total>15"
      :total="total"
      :page-sizes="[15,30,50,100]"
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
