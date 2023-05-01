<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item :label=" $t('members.memberGameDataMin.index.div.date.dRange') " prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" :start-placeholder=" $t('members.memberGameDataMin.index.div.date.sTime') "
                        :end-placeholder=" $t('members.memberGameDataMin.index.div.date.eTime') "
                        :range-separator=" $t('members.memberGameDataMin.index.div.date.to') " clearable :default-time="['12:00:00', '11:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="queryParams.account"
          :placeholder=" $t('members.memberGameDataMin.index.div.entMemid') "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="gameId">
        <el-input
          v-model="queryParams.gameId"
          :placeholder=" $t('members.memberGameDataMin.index.div.entbNum') "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="platformId">
        <el-select v-model="queryParams.betState" :placeholder=" $t('members.memberGameDataMin.index.div.sBet') ">
          <el-option
            v-for="(item,index) in orderStateList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.memberGameDataMin.index.div.button.search') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.memberGameDataMin.index.div.button.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberGameDataMinList">
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.memId') " align="center" prop="UserName"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.proxyId') " align="center" prop="agent"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.trnsctNum') " align="center"  min-width="180px" prop="WagersID">
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.gbNum') " align="center"  min-width="180px" :show-overflow-tooltip="true" prop="WagersID">
        <template v-slot="{row}">
          <a style="color: #00afff"  @click="handleDetail(row)">{{ row.WagersID }}</a>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.bStat') " align="center" prop="Result"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.pName') " align="center" prop="platformName"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.vBets') " align="center" prop="Commissionable"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.tBets') " align="center" prop="BetAmount"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.profit') " align="center" prop="Payoff"/>
      <el-table-column :label=" $t('members.memberGameDataMin.index.div.pBets') "align="center" width="150px" prop="WagersDate"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 游戏对局日志 -->
    <el-dialog :title=" $t('members.memberGameDataMin.index.div.sportBet') " :visible.sync="detailOpen" width="800px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
<!--      <div v-loading="loading" :style="'height:'+ height">-->
      <div v-loading="loading">
        <iframe :src="detailLink" frameborder="no" style="width: 100%;height: 600px" scrolling="auto" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listMemberGameDataMin,
  gameOrderBetStateList,
  listMemberGameDataMinDetail
} from '@/api/platform-web/member/memberGameDataMin'
import {pickerDateTimeMeiDong} from "@/utils/dateUtils";


export default {
  name: 'MemberGameDataMin',
  components: {  },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeMeiDong },
      // 遮罩层
      visible: false,
      // 遮罩层
      loading: false,
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
      //显示明细
      detailOpen: false,
      //对局地址
      detailLink: null,
      betData: [],
      // 会员注单数据表格数据
      memberGameDataMinList: [],
      // 平台列表
      orderStateList: [],
      // 弹出层标题
      title: '',
      //游戏参数
      gameId: null,
      // 是否显示弹出层
      open: false,
      // 游戏局号
      WagersID: null,
      //账号
      UserName: null,
      //对局地址
      recordLink: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        gameId: null,
        platformId: 9,
        account: null,
        gameEndTime: null,
        betState: null,
        gameStartTime: null,
        selectDate: [this.parseTime(this.getMeiDongTodayStartTime()), this.parseTime(this.getMeiDongTodayEndTime())],
        orderByColumn: 'game_end_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gameId: [
          { required: true, message: this.$t('members.memberGameDataMin.index.data.gbNum') , trigger: 'blur' }
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
      let createTime = this.$route.query.createTime
      if (createTime) {
        this.queryParams.selectDate = [createTime,this.parseTime(this.getMeiDongTodayEndTime())]
      }

      this.getOrderStateList()
    },
    /** 查询会员注单数据列表 */
    getList() {
      this.loading = true
      listMemberGameDataMin(this.queryParams).then(response => {
        this.memberGameDataMinList = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /** 查询平台列表 */
    getOrderStateList() {
      gameOrderBetStateList(this.queryParams).then(response => {
          this.orderStateList = response.data
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
      if(this.queryParams.account){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.account.match(reg)
        if(!flag){
          this.msgError( this.$t('members.memberGameDataMin.index.data.entMemid') )
          return
        }
      }
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 获取游戏局号 */
    handleDetail(row){
      this.queryParams.gameId = row.WagersID
      this.queryParams.gameRound = row.WagersID
      this.queryParams.account = row.UserName
      this.loading = true
      listMemberGameDataMinDetail(this.queryParams).then(response => {
        this.detailLink = response.data.Url
        this.detailOpen = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.sonPlatformName = null;
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
