<template>
  <div class="app-container">

    <div v-loading="totalLoading">
      <el-button type="primary" @click="copy1">{{$t('lottery.wheelPoolHistory.totalPeopleCount')}} {{ this.totalData.totalPeopleCount || 0 }}</el-button>
      <el-button type="primary" @click="copy2">{{$t('lottery.wheelPoolHistory.totalCountMoney')}} {{ this.totalData.totalCountMoney || 0 }}</el-button>
      <el-button type="success" @click="copy3">{{$t('lottery.wheelPoolHistory.testTotalPeoples')}} {{ this.totalData.testTotalPeoples || 0 }}</el-button>
      <el-button type="warning" @click="copy4">{{$t('lottery.wheelPoolHistory.testTotalMoney')}} {{ this.totalData.testTotalMoney || 0 }}</el-button>
      <el-button  type="primary" icon="el-icon-search" size="small" @click="listCount()" style="margin-left: 15px" plain>{{$t('lottery.wheelPoolHistory.listCount')}}</el-button>
    </div>

<!--    search form 搜索表格 -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 15px;">

      <el-form-item :label="$t('global.selectDatePlaceholder')" prop="createTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '95%'}" :start-placeholder="$t('global.dateTimePickerStartTimePlaceholder')"
                        :end-placeholder="$t('global.dateTimePickerEndTimePlaceholder')"
                        :range-separator="$t('global.dateTimePickerRangeSeparator')" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('lottery.wheelPoolHistory.form.memberIdLabel')" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          :placeholder="$t('lottery.wheelPoolHistory.form.memberIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.nickname')" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('global.nicknamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery" plain>{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

<!--  点击按钮弹出表缓存 click on button to popup table cache -->
    <el-row style="margin-bottom: 5px">
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            size="mini"
            class="el-button el-button--success"
            @click="showCacheTable()">
          {{$t('lottery.wheelPoolHistory.showTableButton')}}
        </el-button>
      </el-col>
      <el-col :span="1.5" class="ml5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleWheelHistoryExport"
        >{{$t('global.exportButton')}}
        </el-button>
      </el-col>

    </el-row>

    <!-- 轮式台球历史表  wheel pool history table-->
    <el-table stripe v-loading="loading" :data="wheelPoolHistoryList" class="el-table--border">
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.id')" align="center" prop="id" min-width="100"/>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.memberId')" align="center" prop="memberId" min-width="150"/>
      <el-table-column :label="$t('global.nickname')" align="center" prop="nickName" min-width="150"/>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.winTimes')" align="center" prop="winTimes" min-width="150"/>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.winId')" align="center" prop="winId" min-width="120"/>

      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.memberStatus')" align="center" prop="memberStatus" min-width="120">
        <template slot-scope="scope">
            <span :style="{color: (status = typeList[parseInt(scope.row.memberStatus)]).color}">
              {{ status.dictLabel }}
            </span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.prize')" align="center" prop="prize" min-width="120"/>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.first')" align="center" prop="first" min-width="120"/>

      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.status')" align="center" prop="status" min-width="120">  <!-- 0 未中奖 1 已中奖 2 已放弃-->
        <template slot-scope="scope">
          <span :style="{color: (status = wheelStatus[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.medalType')" align="center" prop="medalType" min-width="180"/>
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.drawType')" align="center" prop="drawType" min-width="240" />
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.position')" align="center" prop="position" min-width="280" />
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.createTime')" align="center" prop="createTime"  min-width="180" />
      <el-table-column :label="$t('lottery.wheelPoolHistory.tableColumns.updateTime')" align="center" prop="updateTime"  min-width="180" />
    </el-table>

    <pagination
      v-show="total>10"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!--    在此处显示池彩票兑现选项卡 display while pool lottery cashes tab here -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="popUpCacheTable" width="400" style="padding-bottom: 100px"  append-to-body>
        <el-table stripe v-loading="loading" :data="wheelPoolLotteryList" class="el-table--border" style="margin-bottom: 50px">
          <el-table-column :label="$t('lottery.wheelPoolHistory.dialogForm.userId')" align="center" prop="userId" min-width="150"/>
          <el-table-column :label="$t('lottery.wheelPoolHistory.dialogForm.nickName')" align="center" prop="nickName" min-width="150"/>
          <el-table-column :label="$t('lottery.wheelPoolHistory.dialogForm.status')" align="center" prop="status" min-width="120">
            <template slot-scope="scope">
            <span :style="{color: (status = typeList[parseInt(scope.row.status)]).color}">
              {{ status.dictLabel }}
            </span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('lottery.wheelPoolHistory.dialogForm.vip')" align="center" prop="vip" min-width="180"/>

          <el-table-column :label="$t('lottery.wheelPoolHistory.dialogForm.time')" align="center" prop="time" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.time) }}</span>
            </template>
          </el-table-column>

        </el-table>
      <el-button type="primary" plain @click="closeTapBtn()"  style="float: right;margin-top: -25px">
        {{$t('global.close')}}
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
      popUpCacheTable : false,

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
      this.popUpCacheTable = true;
      this.title = this.$t('lottery.wheelPoolHistory.popUpTitle')
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
      this.popUpCacheTable =false;
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

    /** 导出按钮操作 Export button action*/
    handleWheelHistoryExport() {
      let queryParams = this.queryParams
      queryParams.params = []
      queryParams = this.addDateRange(this.queryParams, this.dateRange);
      this.$confirm($t('lottery.wheelPoolHistory.confirmExportMessage'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportWheelPoolHistoryInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '大奖池历史列表')
      })
    },
  }

};
</script>
