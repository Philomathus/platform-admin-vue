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
                        range-separator="至" clearable :picker-options="pickerOptions"
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
      <el-form-item prop="agent">
        <el-input
          v-model="queryParams.agent"
          placeholder="请输入子平台ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="kindId">
        <el-input
          v-model="queryParams.sonPlatformName"
          placeholder="请输入子平台名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
<!--        <template v-slot="{row}">-->
<!--          <a @click="lotteryBetData(row)" style="color: #00afff" v-if="row.agent==10000">{{ row.account }}</a>-->
<!--          <a @click="lotteryBetData(row)" style="color: #f38010" v-else-if="row.agent==80000">{{ row.account }}</a>-->
<!--          <div v-else>{{ row.account }}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="子平台ID" align="center" prop="agent"/>
      <el-table-column label="平台名称" align="center" prop="platformName"/>
      <el-table-column label="子平台名称" align="center" prop="sonPlatformName"/>
      <el-table-column label="有效下注" align="center" prop="cell_score"/>
      <el-table-column label="总下注" align="center" prop="all_bet"/>
      <el-table-column label="盈利" align="center" prop="profit"/>
      <el-table-column label="抽水" align="center" prop="revenue"/>
      <el-table-column label="游戏开始时间" align="center" width="150px" prop="game_start_time"/>
      <el-table-column label="游戏结束时间" align="center" width="150px" prop="game_end_time"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!--会员注单数据详情-->
    <el-dialog v-dialogDrag title="注单数据详情" :visible.sync="openBetData" width="450px" append-to-body>
      <el-table :stripe="true" v-loading="loading" :data="betData">
        <el-table-column label="项目名称" align="center" width="120px" prop="label"/>
        <el-table-column label="项目值" align="center" prop="value"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberGameData,
  exportMemberGameData,
  getCount, getLotteryBetData
} from '@/api/platform-web/member/memberGameData'
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {
  name: 'MemberGameData',
  components: {},
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
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        sonPlatformName: null,
        pageNum: 1,
        pageSize: 15,
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
        status: null,
        gameStartTime: null,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        orderByColumn: 'game_end_time',
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
      this.getCount()
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
        console.info(res)
        if (res.data) {
          this.totalData = res.data
        }
        this.loading = false
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
      this.queryParams.pageNum = 1
      this.getList()
      this.getCount()
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
      this.$confirm('是否确认导出所有会员注单数据数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberGameData(queryParams)
      }).then(response => {
        this.download(response.msg)
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
    }
  }
}
</script>
