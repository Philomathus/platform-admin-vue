<template>
  <div class="app-container">

    <div v-loading="totalLoading">
    <el-button type="primary" @click="copy1">{{ $t('members.memberGameData.index.button.vBets') }} {{ this.totalData.totalSuccessBet || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('members.memberGameData.index.button.tBets') }} {{ this.totalData.totalBet || 0 }}</el-button>
    <el-button type="warning" @click="copy3">{{ $t('members.memberGameData.index.button.profit') }} {{ this.totalData.totalIncome || 0 }}</el-button>

      <el-button type="primary" icon="el-icon-search" size="mini" @click="listCount()" style="margin-left: 20px">
        {{ $t('members.memberInfo.index.button.statQ') }}
      </el-button>
    </div>


    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">

      <el-form-item :label=" $t('members.memberGameData.index.pName') " prop="platformId" id="checkbox">
        <el-checkbox-group v-model="queryParams.platformIds" size="medium">
          <el-checkbox v-for="item in platformList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox v-model="checkNodeAll" @change="handleCheckedTreeNodeAll()"
                     class="text-info"
                     style="margin-right: 30px; float: right">{{ $t('members.memberGameData.index.sel') }}
        </el-checkbox>
      </el-form-item>

      <el-form-item :label=" $t('members.memberGameData.index.date.datRange') " prop="selectDate" class="small-layout">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '95%'}" :start-placeholder=" $t('members.memberGameData.index.date.sTime') "
                        :end-placeholder=" $t('members.memberGameData.index.date.eTime') "
                        :range-separator=" $t('members.memberGameData.index.date.to') " clearable :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="account" style="margin-left: -20px"  class="small-layout">
        <el-input
          v-model.trim="queryParams.account"
          :placeholder=" $t('members.memberGameData.index.entMemid') "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="gameId" class="small-layout">
        <el-input
          v-model="queryParams.gameId"
          :placeholder=" $t('members.memberGameData.index.entbNum') "
          clearable
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item class="small-layout">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.memberGameData.index.button.search') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.memberGameData.index.button.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['member:memberGameData:export']"
        >{{ $t('members.memberGameData.index.button.exp') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberGameDataList">
      <el-table-column :label=" $t('members.memberGameData.index.memId') " align="center" prop="account" min-width="100"/>
      <el-table-column :label=" $t('members.memberGameData.index.subId') " align="center" prop="agent" min-width="120"/>
      <el-table-column :label=" $t('members.memberGameData.index.gameId') " align="center" min-width="300px" prop="gameId"/>
      <el-table-column :label=" $t('members.memberGameData.index.gbNum') " align="center" min-width="160px" :show-overflow-tooltip="true" prop="gameRound">
        <template v-slot="{row}">
          <div
            v-if="row.platformId == 1 || row.platformId == 15 || row.platformId == 17 || row.platformId == 50 || row.platformId == 51 ">
            <a style="color: #00afff" @click="handleRecord(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else-if="row.platformId == 5">
            <a style="color: #00afff" @click="handleAgRecord(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else-if="row.platformId == 14">
            <a style="color: #00afff" @click="openRecordLink(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else>
            {{ row.gameRound }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameData.index.pName') " align="center" prop="platformName" width="120"/>
      <el-table-column :label=" $t('members.memberGameData.index.gName') " align="center" prop="kindId" width="120"/>
      <el-table-column :label=" $t('members.memberGameData.index.subName') " align="center" prop="sonPlatformName" min-width="160"/>
      <el-table-column :label=" $t('members.memberGameData.index.vBets') " align="center" prop="cell_score" width="120"/>
      <el-table-column :label=" $t('members.memberGameData.index.tBets') " align="center" prop="all_bet" width="120"/>
      <el-table-column :label=" $t('members.memberGameData.index.profit') " align="center" prop="profit"/>
      <el-table-column :label=" $t('members.memberGameData.index.startTime') " align="center" width="160px" prop="game_start_time"/>
      <el-table-column :label=" $t('members.memberGameData.index.setTime') " align="center" width="160px" prop="game_end_time"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <record ref="record" :game-id="gameId"/>

    <AgRecord ref="agRecord" :game-id="gameId"/>

    <!-- 游戏对局日志 -->
    <el-dialog :title=" $t('members.memberGameData.index.gLog') " :visible.sync="fundsOpen" width="1500px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
      <!--      <div v-loading="loading" :style="'height:'+ height">-->
      <div v-loading="loading">
        <iframe :src="recordLink" frameborder="no" style="width: 100%;height: 600px" scrolling="auto"/>
      </div>
    </el-dialog>

    <!--会员注单数据详情-->
    <el-dialog v-dialogDrag :title=" $t('members.memberGameData.index.nData') " :visible.sync="openBetData" width="450px" append-to-body>
      <el-table :stripe="true" v-loading="loading" :data="betData">
        <el-table-column :label=" $t('members.memberGameData.index.proName') " align="center" width="120px" prop="label"/>
        <el-table-column :label=" $t('members.memberGameData.index.proVal') " align="center" prop="value"/>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import {
  listMemberGameData,
  exportMemberGameData,
  getCount, getLotteryBetData, getKYgameResReport
} from '@/api/platform-web/member/memberGameData'
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";
import record from './record'
import {gamePlatformList, gameRecordList} from '../../../api/platform-web/member/memberGameData'
import AgRecord from './agRecord'


export default {
  name: 'MemberGameData',
  components: {AgRecord, record},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},

      totalLoading: false,

      //统计数据
      totalData: {
        totalSuccessBet: 0,
        totalBet: 0,
        totalIncome: 0
      },
      checkNodeAll: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      openBetData: false,
      betData: [],
      // 会员注单数据表格数据
      memberGameDataList: [],
      // 平台列表
      platformList: [],
      //资金明细数据
      fundsData: [],
      fundsOpen: false,
      agVisible: false,
      // 弹出层标题
      title: '',
      //游戏参数
      gameId: null,
      // 是否显示弹出层
      open: false,
      //房间号
      serverId: null,
      //对局地址
      recordLink: null,
      // 查询参数
      queryParams: {
        sonPlatformName: null,
        pageNum: 1,
        platformIds: [],
        pageSize: 15,
        gameId: null,
        gameRound: null,
        account: null,
        kindId: null,
        cellScore: null,
        allBet: null,
        profit: null,
        revenue: null,
        gameEndTime: null,
        platformId: null,
        agent: null,
        platformType: null,
        status: null,
        gameStartTime: null,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        orderByColumn: 'game_end_time',
        serverId: null,
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gameId: [
          {required: true, message: this.$t('members.memberGameData.index.gbNotemp') , trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      var userId = this.$route.query.userId
      var createTime = this.$route.query.createTime
      if (createTime) {
        this.queryParams.account = userId
        this.queryParams.selectDate = [createTime, this.parseTime(this.getTodayEndTime())]
      }
      this.getList()
      this.getPlatformList()
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.totalSuccessBet)
    },
    copy2() {
      this.copyCommand(this.totalData.totalBet)
    },
    copy3() {
      this.copyCommand(this.totalData.totalIncome)
    },

    listCount(){
      this.totalLoading = true
      // this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      getCount(this.queryParams).then((res) => {
        this.totalData = res.data
      }).finally(() => {
        this.totalLoading = false
      })
    },
    // 0:未洗码1已经洗码
    formatterStatus(row) {
      if (row.status == 0) {
        return this.$t('members.memberGameData.index.script.uCode')
      } else if (row.status == 1) {
        return this.$t('members.memberGameData.index.script.wCode')
      } else {
        return this.$t('members.memberGameData.index.script.unk')
      }
    },
    getCount() {
      getCount(this.queryParams).then((res) => {
        if (res.data) {
          this.totalData = res.data
        }
        this.loading = false
      })
    },
    handleRecord(row) {
      this.$refs.record.show(row)
    },
    openRecordLink(row) {
      this.queryParams.gameId = row.gameId;
      this.queryParams.gameRound = row.gameRound;
      this.queryParams.agent = row.agent;
      this.queryParams.gameStartTime = row.game_start_time
      this.queryParams.gameEndTime = row.game_end_time
      this.queryParams.platformId = row.platformId
      this.queryParams.account = row.account;
      this.loading = true
      gameRecordList(this.queryParams).then(response => {
        this.recordLink = response.data.url
        this.fundsOpen = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleAgRecord(row) {
      this.$refs.agRecord.show(row)
    },
    funds(row) {
      getKYgameResReport(row).then((res) => {
        console.info(res.data);
        this.fundsData = res.data
        this.fundsOpen = true
      })
    },

    /** 查询会员注单数据列表 */
    getList() {
      this.loading = true
      listMemberGameData(this.queryParams).then(response => {
        this.memberGameDataList = response.rows
        this.memberGameDataList.profit = this.formatNumber( this.memberGameDataList.profit );
        this.memberGameDataList.all_bet = this.formatNumber( this.memberGameDataList.all_bet );
        this.memberGameDataList.cell_score = this.formatNumber( this.memberGameDataList.cell_score );
        this.total = response.total
        this.loading = false
      })
    },

    formatNumber(num){
      if (num !== undefined && num !== null) {
        return num.toFixed(2);
      }
      return '0.00';
    },
    /** 查询平台列表 8*/
    getPlatformList() {
      gamePlatformList(this.queryParams).then(response => {
        this.platformList = response.data
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        gameId: null,
        account: null,
        kindId: null,
        cellScore: null,
        allBet: null,
        profit: null,
        revenue: null,
        gameEndTime: null,
        platformId: null,
        agent: null,
        platformType: null,
        status: 0,
        gameStartTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.queryParams.account) {
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.account.match(reg)
        if (!flag) {
          this.msgError( this.$t('members.memberGameData.index.script.memNum') )
          return
        }
      }
      this.queryParams.kindId = null
      this.queryParams.pageNum = 1
      this.getList()
      if (this.queryParams.account) {
        this.getCount()
      } else {
        this.totalData.totalSuccessBet = 0
        this.totalData.totalBet = 0
        this.totalData.totalIncome = 0
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.sonPlatformName = null;
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm("确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(function () {
        return exportMemberGameData(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('members.memberGameData.index.script.mNote') )
      }).catch(() => {
      })
    },
    lotteryBetData(row) {

      this.openBetData = true
      const agent = row.agent
      const gameId = row.gameId
      this.reset()
      getLotteryBetData(agent, gameId).then(response => {
        debugger;
        this.betData = []
        var data = response.data
        var item = {}
        var item2 = {}
        var item3 = {}
        var item4 = {}
        var item5 = {}
        var item6 = {}
        var item7 = {}
        var item8 = {}
        item.label = this.$t('members.memberGameData.index.script.mPlat')
        item.value = data.userid
        this.betData.push(item)
        item2.label = this.$t('members.memberGameData.index.script.nPer')
        item2.value = data.issue
        this.betData.push(item2)
        item3.label = this.$t('members.memberGameData.index.script.lAm')
        item3.value = data.bet_amount
        this.betData.push(item3)
        item4.label = this.$t('members.memberGameData.index.script.amt')
        if (data.prize > 0) {
          item4.value = data.prize +  this.$t('members.memberGameData.index.script.won')
        } else {
          item4.value = data.prize + this.$t('members.memberGameData.index.script.unwin')
        }
        this.betData.push(item4)
        item5.label = this.$t('members.memberGameData.index.script.lName')
        item5.value = data.son_platform_name
        this.betData.push(item5)
        item6.label = this.$t('members.memberGameData.index.script.pBet')
        item6.value = data.bet_time
        this.betData.push(item6)
        item7.label = this.$t('members.memberGameData.index.script.lCode')
        item7.value = data.code
        this.betData.push(item7)
        item8.label = this.$t('members.memberGameData.index.script.cNote')
        item8.value = data.bet_select
        this.betData.push(item8)
        this.openBetData = true
        this.title = this.$t('members.memberGameData.index.script.nData')
      })
    },
    selectOne() {     //change 触发事件
      let id = this.queryParams.name;
      if (id != null && id != undefined) {
        if (this.platformList != null && this.platformList != undefined) {
          this.platformList.forEach((value, key) => {
            if (value.id == id) {
              this.queryParams.agent = value.agent
              this.queryParams.platformId = value.id
              this.queryParams.gameId = null
              this.queryParams.kindId = null
              this.queryParams.gameEndTime = null
              this.queryParams.gameStartTime = null
            }
          })
        }
      } else {
        this.queryParams.agent = null
        this.queryParams.platformId = null
      }
    },

    handleCheckedTreeNodeAll() {
      if (this.checkNodeAll) {
        let arrays = [];
        for (const platform of this.platformList) {
          arrays.push(platform.id)
        }
        this.queryParams.platformIds = arrays
        this.checkNodeAll = true
      } else {
        this.queryParams.platformIds = []
        this.checkNodeAll = false
      }
    },

  }
}
</script>

<style>
#checkbox .el-form-item__content {
  width:90%;
}

.selection{
  position:absolute;
  margin-left: 76%;
  margin-top: -40px
}

@media only screen and (min-width: 1000px) and (max-width: 1027px){
  .openSidebar .selection{
    margin-left: 0;
    float: left;
    margin-top: 0;
  }
  .openSidebar .small-layout{
    margin-top: 20px;
  }
  .hideSidebar .selection{
    margin-left: 42%;
  }
}

@media only screen and (min-width: 1028px) and (max-width: 1112px){
  .openSidebar .selection{
    margin-left: 70%
  }
  .hideSidebar .selection{
    margin-left: 29%;
  }

}

@media only screen and (min-width: 1113px) and (max-width: 1127px){
  .openSidebar .selection{
    margin-left: 70%
  }
  .hideSidebar .selection{
    margin-left: 0;
    float: left;
    margin-top: 0;
  }
  .hideSidebar .small-layout{
    margin-top: 20px;
  }
}

@media only screen and (min-width: 1128px) and (max-width: 1145px){
  .openSidebar .selection{
    margin-left: 56%
  }
  .hideSidebar .selection{
    margin-left: 0;
    float: left;
    margin-top: 0;
  }
  .hideSidebar .small-layout{
    margin-top: 20px;
  }
}
@media only screen and (min-width: 1146px) and (max-width: 1173px){
  .openSidebar .selection{
    margin-left: 42.5%
  }
  .hideSidebar .selection{
    margin-left: 0;
    float: left;
    margin-top: 0;
  }
  .hideSidebar .small-layout{
    margin-top: 20px;
  }
}

@media only screen and (min-width: 1174px) and (max-width: 1227px){
  .openSidebar .selection{
    margin-left: 30%
  }
  .hideSidebar .selection{
    margin-left: 83%;
  }
}

@media only screen and (min-width: 1228px) and (max-width: 1258px){
  .openSidebar .selection{
    margin-left: 30%
  }
  .hideSidebar .selection{
    margin-left: 68%;
  }
}

@media only screen and (min-width: 1259px)  and (max-width: 1284px){
  .openSidebar .selection{
    margin-left: 0;
    margin-top: 0;
    float: left;
  }
  .hideSidebar .selection{
    margin-left: 68%;
  }
  .openSidebar .small-layout{
    margin-top: 20px;
  }
}

@media only screen and (min-width: 1285px) and (max-width: 1300px){
  .openSidebar .selection{
    margin-left: 0;
    margin-top: 0;
    float: left;
  }
  .hideSidebar .selection{
    margin-left: 52%;
  }
  .openSidebar .small-layout{
    margin-top: 20px;
  }
}

@media only screen and (min-width: 1300px) and (max-width: 1309px){
  .openSidebar .selection{
    margin-left: 86%;
    /*margin-left: 50%;*/
  }
  .hideSidebar .selection{
    margin-left: 50%;
  }
}

@media only screen and (min-width: 1310px) and (max-width: 1312px){
  .selection{
    margin-left: 84%;
  }
}

@media only screen and (min-width: 1313px) and (max-width: 1350px){
  .selection{
    margin-left: 84%;
  }
  .hideSidebar .selection{
    margin-left: 50%;
  }
}

@media only screen and (min-width: 1350px) and (max-width:1373px){
  .selection{
    margin-left: 81%;
  }
  .hideSidebar .selection{
    margin-left: 50%;
  }
}

@media only screen and (min-width: 1374px) and (max-width:1399px){
  .selection{
    margin-left: 70%;
  }
  .hideSidebar .selection{
    margin-left: 48%;
  }
}

@media only screen and (min-width: 1400px) and (max-width:1413px){
  .selection{
    margin-left:67%;
  }
  .hideSidebar .selection{
    margin-left: 38%;
  }
}

@media only screen and (min-width: 1414px) and (max-width:1430px){
  .selection{
    margin-left:67%;
  }
  .hideSidebar .selection{
    margin-left: 28%;
  }
}

@media only screen and (min-width: 1431px) and (max-width: 1475px){
  .selection{
    margin-left: 51%;
  }

  .hideSidebar .selection{
    margin-left: 29%;
  }
}

@media only screen and (min-width: 1476px) and (max-width: 1523px){
  .selection{
    margin-left: 51%;
  }

  .hideSidebar .selection{
    margin-left: 19%;
  }

}

@media only screen and (min-width: 1524px) and (max-width: 1559px){
  .selection{
    margin-left: 39%;
  }

  .hideSidebar .selection{
    margin-left: 19%;
  }
}

@media only screen and (min-width: 1560px) and (max-width: 1599px){
  .selection{
    margin-left: 29%;
  }

  .hideSidebar .selection{
   margin-left: 10%;
  }
}

@media only screen and (min-width: 1600px) and (max-width: 1622px){
  .selection{
    margin-left: 28%;
  }

  .hideSidebar .selection{
    margin-left: 0;
    position: relative;
  }
}


@media only screen and (min-width: 1623px) and (max-width: 1656px){
  .selection{
    margin-left: 20%;
  }

  .hideSidebar .selection{
    margin-left: 0;
    position: relative;
  }
}

@media only screen and (min-width: 1657px) and (max-width: 1670px){
  .selection{
    margin-left: 20%;
  }

  .hideSidebar .selection{
    margin-left: 90%;
  }
}

@media only screen and (min-width: 1670px){
  .selection{
    margin-left: 85%;
  }

  .hideSidebar .selection{
    margin-left: 65%;
  }
}

@media only screen and (min-width: 1671px) and (max-width: 1745px){
  .openSidebar .selection{
    margin-left: 20%;
  }
  .hideSidebar .selection{
    margin-left: 90%;
  }
}

@media only screen and (min-width: 1746px) and (max-width: 1799px){
  .openSidebar .selection{
    margin-left: 100%;
  }
  .hideSidebar .selection{
    margin-left: 85%;
  }
}

@media only screen and (min-width: 1800px) and (max-width: 1802px){
  .openSidebar .selection{
    margin-left: 97.5%;
  }
  .hideSidebar .selection{
    margin-left: 75%;
  }
}


@media only screen and (min-width: 1803px){
  .openSidebar .selection{
    margin-left: 85%;
  }
  .hideSidebar .selection{
    margin-left: 72%;
  }
}





</style>
