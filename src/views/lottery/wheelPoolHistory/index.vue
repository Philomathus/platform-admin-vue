<template>
  <div class="app-container">

    <div v-loading="totalLoading">
      <el-button type="primary" @click="copy1">总抽奖人数 {{ this.totalData.totalPeopleCount || 0 }}</el-button>
      <el-button type="primary" @click="copy2">总抽奖金额 {{ this.totalData.totalCountMoney || 0 }}</el-button>
      <el-button type="success" @click="copy3">测试抽奖人数 {{ this.totalData.testTotalPeoples || 0 }}</el-button>
      <el-button type="warning" @click="copy4">测试抽奖金额 {{ this.totalData.testTotalMoney || 0 }}</el-button>
      <el-button  type="primary" icon="el-icon-search" size="mini" @click="listCount()" style="margin-left: 20px">统计查询</el-button>
    </div>

<!--    search form 搜索表格 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 15px;">

      <el-form-item label="日期范围" prop="createTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

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

<!--  点击按钮弹出表缓存 click on button to popup table cache -->
    <el-row style="margin-bottom: 5px">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            size="mini"
            class="el-button el-button--success"
            @click="showCacheTable()">
            抽奖资格记录
        </el-button>
      </el-col>
      <el-col :span="1.5" class="ml5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="openWheelHistoryExport"
        >导出
        </el-button>
      </el-col>

    </el-row>

    <!-- 轮式台球历史表  wheel pool history table-->
    <el-table stripe v-loading="loading" :data="wheelPoolHistoryList" class="el-table--border">
      <el-table-column label="主键" align="center" prop="id" min-width="100"/>
      <el-table-column label="会员ID" align="center" prop="memberId" min-width="150"/>
      <el-table-column label="昵称" align="center" prop="nickName" min-width="150"/>

      <el-table-column label="中奖ID" align="center" prop="winId" min-width="120"/>

      <el-table-column label="会员类型" align="center" prop="memberStatus" min-width="120">
        <template slot-scope="scope">
            <span :style="{color: (status = typeList[parseInt(scope.row.memberStatus)]).color}">
              {{ status.dictLabel }}
            </span>
        </template>
      </el-table-column>

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
      v-show="total>10"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    在此处显示池彩票兑现选项卡 display while pool lottery cashes tab here -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="PopUpCacheTable" width="400" style="padding-bottom: 100px"  append-to-body>
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

    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleWheelHistoryExport"></ExcelPrompt>
  </div>
</template>


<script>
import {
  exportWheelPoolHistoryInfo,
  getLotteryList,
  listWheelPoolHistory,
  wheelPoolHistoryListCount
} from "@/api/platform-web/lottery/wheelPoolHistory";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";
import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';

export default {
  name: "WheelPoolHistory",
  components: {
    ExcelPrompt
  },
  data() {
    return {
      /** loading 遮罩层 */
      loading: true,

      /** ids array 选中数组 */
      ids: [],

      /**显示搜索条件  Show search criteria */
      showSearch: true,

      /** pop table boolean*/
      PopUpCacheTable : false,

      /** total loading*/
      totalLoading: false,

      /** 初始值 0 统计总行数和总金额 initial values 0 statistics count total rows and total money  */
      totalData: {
        totalPeopleCount: 0,
        totalCountMoney: 0,
        testTotalPeoples : 0,
        testTotalMoney: 0
      },

      /** date range 日期范围 */
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},

      /** 总条数 total number*/
      total: 0,
      /**  轮池历史列表 wheel pool history list */
      wheelPoolHistoryList: [],
      wheelPoolLotteryList: [],
      typeList : [],
      /**  弹出层标题 popup title*/
      title: "",

      /**  wheel status array */
      wheelStatus: [],


      /** 查询参数 query parameters */
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
      },
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
      this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
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
    showCacheTable(){
      this.PopUpCacheTable = true;
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
      this.PopUpCacheTable =false;
    },

    /**复制 copy*/
    copy1() {
      this.copyCommand(this.totalData.totalPeopleCount)
    },
    copy2() {
      this.copyCommand(this.totalData.totalCountMoney)
    },
    copy3() {
      this.copyCommand(this.totalData.testTotalPeoples)
    },
    copy4() {
      this.copyCommand(this.totalData.testTotalMoney)
    },

    /** 统计总行数和总金额 statistics count total rows and total money */
    listCount() {
      this.totalLoading=true
      this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      wheelPoolHistoryListCount(this.queryParams).then((res) => {
        this.totalData = res
      }).finally(()=>{
        this.totalLoading=false
      })
    },

    /** open export */
    openWheelHistoryExport() {
      this.$refs.excelPrompt.open=true;
    },

    /** 导出按钮操作 */
    handleWheelHistoryExport(date) {
      const queryParams = this.queryParams
      queryParams.params = []
      queryParams.downLoadDate = date
      this.$confirm('是否确认导出所有车轮历史列表数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportWheelPoolHistoryInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '轮池历史列表')
      })
    },


  }

};
</script>
