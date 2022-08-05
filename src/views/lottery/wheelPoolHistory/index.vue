<template>
  <div class="app-container">
<!--    search form 搜索表格 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入昵称"
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

<!--    popup button -->
    <el-row style="margin-bottom: 5px">
      <el-col>
        <el-button
            type="primary"
            plain
            size="mini"
            class="el-button el-button--primary"
            @click="showMenuTab()">
            抽奖资格记录
        </el-button>
      </el-col>
    </el-row>

    <!-- 轮式台球历史表  wheel pool history table-->
    <el-table stripe v-loading="loading" :data="wheelPoolHistoryList" class="el-table--border">
      <el-table-column label="主键" align="center" prop="id" min-width="100"/>
      <el-table-column label="会员ID" align="center" prop="memberId" min-width="150"/>
      <el-table-column label="昵称" align="center" prop="nickName" min-width="150"/>
      <el-table-column label="中奖ID" align="center" prop="winId" min-width="120"/>
      <el-table-column label="中奖金额" align="center" prop="prize" min-width="120"/>
      <el-table-column label="是否首次中奖" align="center" prop="first" min-width="120"/>

      <el-table-column label="状态" align="center" prop="status" min-width="120">  <!-- 0 未中奖 1 已中奖 2 已放弃-->
        <template slot-scope="scope">
          <span :style="{color: (status = wheelStatus[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="中奖牌型" align="center" prop="medalType" min-width="180"/>
      <el-table-column label="抽奖排序" align="center" prop="drawType" min-width="240" />
      <el-table-column label="已抽位置" align="center" prop="position" min-width="280" />
      <el-table-column label="创建时间" align="center" prop="createTime"  min-width="180" />
      <el-table-column label="更新时间" align="center" prop="updateTime"  min-width="180" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    在此处显示池彩票兑现选项卡 display while pool lottery cashes tab here -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="PopUpTable" width="400" style="padding-bottom: 100px"  append-to-body>
        <el-table stripe v-loading="loading" :data="wheelPoolLotteryList" class="el-table--border" style="margin-bottom: 50px">
          <el-table-column label="会员ID" align="center" prop="userId" min-width="150"/>
          <el-table-column label="会员昵称" align="center" prop="nickName" min-width="150"/>
          <el-table-column label="会员类型" align="center" prop="status" min-width="120">
            <template slot-scope="scope">
            <span :style="{color: (status = typeList[parseInt(scope.row.status)]).color}">
              {{ status.dictLabel }}
            </span>
            </template>
          </el-table-column>
          <el-table-column label="会员vip" align="center" prop="vip" min-width="180"/>

          <el-table-column label="开奖时间" align="center" prop="time" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.time) }}</span>
            </template>
          </el-table-column>

        </el-table>
      <el-button type="primary" plain @click="closeTapBtn()"  style="float: right;margin-top: -25px">
        关闭
      </el-button>
    </el-dialog>

  </div>
</template>


<script>
import {getLotteryList, listWheelPoolHistory} from "@/api/platform-web/lottery/wheelPoolHistory";

export default {
  name: "WheelPoolHistory",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],

      // 显示搜索条件 -
      showSearch: true,

      //pop table boolean
      PopUpTable : false,

      // 总条数
      total: 0,
      // 轮池历史列表 wheel pool history list
      wheelPoolHistoryList: [],
      wheelPoolLotteryList: [],
      typeList : [],
      // 弹出层标题
      title: "",
      wheelStatus: [],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        memberId : null,
        nickName :null,
        headId : null,
        status : null,
        first:null,
        prize: null,
        winId: null,
        medalType:null,
        drawType:null,
        position:null,
        createTime : null,
        updateTime:null
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
    this.getWheelPoolLotteryList();
    this.getDicts('wheel_pool_status').then(response => {
      this.wheelStatus = response.data
    });
    this.getDicts('member_type').then(response => {
      this.typeList = response.data
    })
  },

  methods: {
    /** 获取轮池的所有列表 get all list of wheel pool history */
    getList() {
      this.loading = true;
      listWheelPoolHistory(this.queryParams).then(response => {
        this.wheelPoolHistoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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

    /** start click to display while list caches list pop up tab **/
    showMenuTab(){
      this.PopUpTable = true;
      this.title = "抽奖资格记录"
    },

    /** get all list of wheel pool lottery caches */
    getWheelPoolLotteryList() {
      this.loading = true;
      getLotteryList().then(response => {
        this.wheelPoolLotteryList = response.rows;
        this.loading = false;
      });
    },

    closeTapBtn(){
      this.PopUpTable =false;
    },

    // 状态字典翻译
    // wheelStatusFormat(row, column) {
    //   return this.selectDictLabel(this.wheelStatus, row.status)
    // },
  }

};
</script>
