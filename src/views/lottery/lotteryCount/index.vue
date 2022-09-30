<template>
  <div class="app-container">
    <!--member lottery count table-->
    <el-table stripe v-loading="loading"  :data="lotteryCountList" class="el-table--border">
      <el-table-column label="主键" prop="id"  align="center" min-width="120"/>
      <el-table-column label="彩票ID" prop="lotteryId" align="center"  min-width="120"/>
      <el-table-column label="会员ID" prop="puserId" align="center" min-width="120"/>
<!--      <el-table-column label="agent" prop="agent" align="center" min-width="120"/>-->
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

export default {
  name: "index",
  data() {
    return {
      // 遮罩层 - loading layer
      loading: true,
      lotteryCountList: [],

      /** 总条数 total number*/
      total: 0,

      queryParams: {
         id:null,
         agent:"",
         lotteryId : null,
         puserId: "",
         issue : "",
         betInfo : "",
         chip : "",
         ip : "",
         pageNum: 1,
         pageSize: 20,
      },

    };
  },

  created() {
    this.getList();
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
  }

}
</script>

<style scoped>

</style>
