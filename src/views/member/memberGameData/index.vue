<template>
  <div class="app-container">
    <el-button type="primary">有效下注 {{ this.totalData.totalSuccessBet||0 }}</el-button>
    <el-button type="success">总下注 {{this.totalData.totalBet||0 }}</el-button>
    <el-button type="warning">盈利 {{ this.totalData.totalIncome||0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入会员ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="gameId">
        <el-input
          v-model="queryParams.gameId"
          placeholder="请输入游戏局号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="platformId">
        <el-select v-model="queryParams.name" placeholder="请选择平台" :change="selectOne()">
          <el-option
            v-for="(item,index) in platformList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberGameDataList">
      <el-table-column label="会员ID" align="center" prop="account"/>
      <el-table-column label="子平台ID" align="center" prop="agent"/>
      <el-table-column label="游戏ID" align="center"  min-width="180px" prop="gameId"/>
      <el-table-column label="游戏局号" align="center"  min-width="180px" :show-overflow-tooltip="true" prop="gameRound">
        <template v-slot="{row}">
          <div v-if="row.platformId == 1 || row.platformId == 15 || row.platformId == 17">
            <a style="color: #00afff"  @click="handleRecord(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else-if="row.platformId == 5">
            <a style="color: #00afff"  @click="openAgPlaypDetail(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else-if="row.platformId == 14">
            <a style="color: #00afff"  @click="openRecordLink(row)">{{ row.gameRound }}</a>
          </div>
          <div v-else>
            {{ row.gameRound }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="平台名称" align="center" prop="platformName"/>
      <el-table-column label="游戏名称" align="center" prop="kindId"/>
      <el-table-column label="子平台名称" align="center" prop="sonPlatformName"/>
      <el-table-column label="有效下注" align="center" prop="cell_score"/>
      <el-table-column label="总下注" align="center" prop="all_bet"/>
      <el-table-column label="盈利" align="center" prop="profit"/>
      <el-table-column label="结算时间" align="center" width="150px" prop="game_end_time"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <record ref="record" :game-id="gameId" />

    <!-- 游戏对局日志 -->
    <el-dialog title="游戏对局日志" :visible.sync="fundsOpen" width="1500px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
      <div v-loading="loading" :style="'height:'+ height">
        <iframe :src="recordLink" frameborder="no" style="width: 100%;height: 600px" scrolling="auto" />
      </div>
    </el-dialog>

    <!--会员注单数据详情-->
    <el-dialog v-dialogDrag title="注单数据详情" :visible.sync="openBetData" width="450px" append-to-body>
      <el-table :stripe="true" v-loading="loading" :data="betData">
        <el-table-column label="项目名称" align="center" width="120px" prop="label"/>
        <el-table-column label="项目值" align="center" prop="value"/>
      </el-table>
    </el-dialog>

    <!--会员Ag视讯注单数据详情-->
    <el-dialog
      title="注单数据详情"
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="agVisible"
      width="600px"
      top="5vh"
      @close="reset()"
      append-to-body
    >
      <el-form ref="form" :model="messageText">
        <el-form-item>
          <el-input v-model="messageText" placeholder=""  type="textarea" :rows="20"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberGameData,
  exportMemberGameData,
  getCount, getLotteryBetData,getKYgameResReport
} from '@/api/platform-web/member/memberGameData'
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";
import record from './record'
import { gameDetailList, gamePlatformList, gameRecordList } from '../../../api/platform-web/member/memberGameData'
import { messageCode, messageVal } from '../../../utils/sportCode'


export default {
  name: 'MemberGameData',
  components: { record },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
      //统计数据
      totalData: {
        totalSuccessBet: 0,
        totalBet: 0,
        totalIncome: 0
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
      //ag视讯详情
      messageText: null,
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
        name: null,
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
          { required: true, message: '游戏局号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  activated(){
    this.init()
  },
  methods: {
    init(){
      var userId = this.$route.query.userId
      var createTime = this.$route.query.createTime
      if (createTime) {
        this.queryParams.account = userId
        this.queryParams.selectDate = [createTime,this.parseTime(this.getTodayEndTime())]
      }
      this.getList()
      this.getPlatformList()
    },
    // 0:未洗码1已经洗码
    formatterStatus(row) {
      if (row.status == 0) {
        return '未洗码'
      } else if (row.status == 1) {
        return '已洗码'
      } else {
        return '未知'
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
    handleRecord(row){
      this.$refs.record.show(row)
    },
    openRecordLink(row){
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
    openAgPlaypDetail(row){
      this.queryParams.gameId = row.gameId;
      this.queryParams.serverId = row.serverId;
      this.queryParams.agent = row.agent;
      this.queryParams.gameStartTime = row.game_start_time
      this.queryParams.gameEndTime = row.game_end_time
      this.queryParams.platformId = row.platformId
      this.queryParams.kindId = row.kindId
      this.loading = true
      gameDetailList(this.queryParams).then(response => {
        if (response.data != null && response.data != undefined){
          let strings = response.data[0];
          let buffer = "";
          for (let key in strings){
            buffer = buffer + (messageCode(key) + ":" +messageVal(key,strings[key]) + "\n");
          }
          this.messageText = buffer;
        }
        this.agVisible = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
        this.total = response.total
        this.loading = false
      })
    },
    /** 查询平台列表 8*/
    getPlatformList() {
      gamePlatformList(this.queryParams).then(response => {
          this.platformList = response.data
          this.platformList[this.platformList.length] = {"agent":null,id:null,name:"全部"}
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
      this.queryParams.kindId = null
      this.queryParams.pageNum = 1
      this.getList()
      if(this.queryParams.account){
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberGameData(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员注单数据')
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
        item.label = '会员平台ID'
        item.value = data.userid
        this.betData.push(item)
        item2.label = '期数'
        item2.value = data.issue
        this.betData.push(item2)
        item3.label = '彩票金额'
        item3.value = data.bet_amount
        this.betData.push(item3)
        item4.label = '金额'
        if (data.prize > 0) {
          item4.value = data.prize + '  已中奖'
        } else {
          item4.value = data.prize + '  未中奖'
        }
        this.betData.push(item4)
        item5.label = '彩票名称'
        item5.value = data.son_platform_name
        this.betData.push(item5)
        item6.label = '下注时间'
        item6.value = data.bet_time
        this.betData.push(item6)
        item7.label = '彩票码'
        item7.value = data.code
        this.betData.push(item7)
        item8.label = '下注内容'
        item8.value = data.bet_select
        this.betData.push(item8)
        this.openBetData = true
        this.title = '注单数据'
      })
    },
    selectOne() {     //change 触发事件
      let id = this.queryParams.name;
      if (id != null && id != undefined){
        if (this.platformList != null && this.platformList != undefined){
          this.platformList.forEach((value, key) => {
            if (value.id == id){
              this.queryParams.agent = value.agent
              this.queryParams.platformId = value.id
              this.queryParams.gameId = null
              this.queryParams.kindId = null
              this.queryParams.gameEndTime = null
              this.queryParams.gameStartTime = null
            }
          })
        }
      }else {
        this.queryParams.agent = null
        this.queryParams.platformId = null
      }
    }
  }
}
</script>
