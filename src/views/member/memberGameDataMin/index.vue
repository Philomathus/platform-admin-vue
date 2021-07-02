<template>
  <div class="app-container">

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
        <el-select v-model="queryParams.betState" placeholder="请选择平台">
          <el-option
            v-for="(item,index) in orderStateList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberGameDataMinList">
      <el-table-column label="会员ID" align="center" prop="UserName"/>
      <el-table-column label="子平台ID" align="center" prop="agent"/>
      <el-table-column label="游戏局号" align="center"  min-width="180px" :show-overflow-tooltip="true" prop="WagersID">
        <template v-slot="{row}">
          <a style="color: #00afff"  @click="handleDetail(row)">{{ row.WagersID }}</a>
        </template>
      </el-table-column>
      <el-table-column label="下注状态" align="center" prop="Result"/>
      <el-table-column label="平台名称" align="center" prop="platformName"/>
      <el-table-column label="有效下注" align="center" prop="Commissionable"/>
      <el-table-column label="总下注" align="center" prop="BetAmount"/>
      <el-table-column label="盈利" align="center" prop="Payoff"/>
      <el-table-column label="下注时间" align="center" width="150px" prop="WagersDate"/>
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
    <el-dialog title="体育投注明细" :visible.sync="detailOpen" width="800px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
      <div v-loading="loading" :style="'height:'+ height">
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
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";


export default {
  name: 'MemberGameDataMin',
  components: {  },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
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
      let createTime = this.$route.query.createTime
      if (createTime) {
        this.queryParams.selectDate = [createTime,this.parseTime(this.getTodayEndTime())]
      }

      this.getOrderStateList()
    },
    /** 查询会员注单数据列表 */
    getList() {
      this.loading = true
      listMemberGameDataMin(this.queryParams).then(response => {
        this.memberGameDataMinList = response.data
        this.total = response.total
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
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 获取游戏局号 */
    handleDetail(row){
      this.queryParams.gameId = row.WagersID
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
