<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">投注金额 {{ this.totalData.totalCost||0 }}</el-button>
    <el-button type="success" @click="copy2">中奖金额 {{this.totalData.totalPrize||0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" style="margin-top: 20px">
      <el-form-item label="下注时间" prop="betTime">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" style="width: 360px" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item prop="puserId">
        <el-input
          v-model="queryParams.puserId"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="issue" style="width: 150px;">
        <el-input
          v-model="queryParams.issue"
          placeholder="下注期数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="status" style="width: 120px;">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="lotteryName">
        <el-input
          v-model="queryParams.lotteryName"
          placeholder="彩票名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="abnormal">
        <el-checkbox v-model="queryParams.abnormal">异常投注</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryBet0List">
      <el-table-column label="用户ID" align="center" prop="puserId"/>
      <el-table-column label="彩票名称" align="center" prop="lotteryName"/>
      <el-table-column label="下注期数" align="center" prop="issue"/>
      <el-table-column label="开奖号码" align="center" prop="code"/>
      <el-table-column label="投注筹码" align="center" prop="chip"/>
      <el-table-column label="投注金额" align="center" prop="cost"/>
      <el-table-column label="下注选择" align="center" prop="betSelect"/>
      <el-table-column label="中奖状态" align="center" prop="status">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="中奖金额" align="center" prop="prize"/>
      <!--      <el-table-column label="下注选择菜单" align="center" prop="methodId" />-->
      <!--      <el-table-column label="下注索引" align="center" prop="betIds" />-->
      <!--      <el-table-column label="下注彩种id" align="center" prop="lotteryId" />-->
      <!--      <el-table-column label="主播ID" align="center" prop="anchor" />-->
      <el-table-column label="下注时间" align="center" min-width="120px" prop="betTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.betTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listLotteryBet0, getCount } from '@/api/platform-web/lottery/lotteryBet'
import { pickerDateTimeShortcuts } from '@/utils/dateUtils'

export default {
  name: 'LotteryBet0',
  components: {},
  data() {
    return {
      //统计数据
      totalData: {
        totalCost: 0,
        totalPrize: 0,
      },
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
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
      // 用户投资行为表格数据
      lotteryBet0List: [],
      statusOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        puserId: null,
        issue: null,
        status: null,
        lotteryName: null,
        betTime: null,
        abnormal: false,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        orderByColumn: 'a.bet_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        betTime: [
          { required: true, message: '下注时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getDicts('lottery_bat_status').then(response => {
      this.statusOptions = response.data
    })
    this.getCountTotal()
  },
  methods: {
    /** 查询用户投资行为列表 */
    getList() {
      this.loading = true
      listLotteryBet0(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.lotteryBet0List = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.totalCost)
    },
    copy2() {
      this.copyCommand(this.totalData.totalPrize)
    },
    //统计按钮
    getCountTotal() {
      getCount(this.queryParams).then((res) => {
        if (res.data) {
          this.totalData = res.data
        }
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        lotteryId: null,
        puserId: null,
        issue: null,
        status: 0,
        methodId: null,
        betSelect: null,
        betIds: null,
        chip: null,
        prize: null,
        cost: null,
        lotteryName: null,
        anchor: null,
        code: null,
        betTime: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      if (this.queryParams.abnormal && !this.queryParams.puserId) {
        this.$message.error(`查询异常投注核对记录必须传入会员ID`)
        return
      }
      this.getList()
      this.getCountTotal()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
