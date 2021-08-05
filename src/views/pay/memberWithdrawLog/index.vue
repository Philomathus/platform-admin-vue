<template>
  <div class="app-container">
    <div v-loading="totalLoading">
      <el-button type="success" @click="copy1">成功出款笔数 {{ this.totalData.total || 0 }}</el-button>
      <el-button type="warning" @click="copy2">总出款金额 {{ this.totalData.successTotal || 0 }}</el-button>
      <el-button type="info" @click="copy3">成功率 {{ numberUtil.toPercent(this.totalData.successRate) }}</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="getCountTotal()" style="margin-left: 20px">
        统计查询
      </el-button>
    </div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px"
             style="margin-top: 20px"
    >
      <el-form-item prop="searchTime">
        <el-date-picker type="datetimerange" v-model="queryParams.searchTime" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" style="width: 130px">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option value="-1" label="首次提现会员"/>
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="会员ID/会员账号/收款人/订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现金额" prop="withdrawMoney" label-width="70px">
        <el-input
          v-model="queryParams.priceMin"
          placeholder="￥"
          clearable
          autocomplete="on"
          min="0"
          size="small"
          style="width: 86px"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
        -
        <el-input
          v-model="queryParams.priceMax"
          placeholder="￥"
          clearable
          autocomplete="on"
          min="0"
          size="small"
          style="width: 86px"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="opName" style="width: 120px;">
        <el-input
          v-model="queryParams.opName"
          placeholder="操作人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="remark" style="width: 100px;">
        <el-input
          v-model="queryParams.remark"
          placeholder="备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="SearchCardBlack" style="width: 155px;">
        <template>
          <el-select v-model="queryParams.SearchCardBlack" placeholder="银行归属地黑名单" size="small" clearable>
            <el-option
              v-for="item in CardBlackOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
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
          :disabled="disabled"
          @click="openExport"
          v-hasPermi="['pay:memberWithdrawLog:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :disabled="disabled"
          @click="handleShunWeiExport"
          v-hasPermi="['pay:memberWithdrawLog:export']"
        >顺为代付格式导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-circle-close"
          size="mini"
          @click="handleBatchRefused"
          v-hasPermi="['pay:memberWithdrawLog:refused']"
        >批量拒绝
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-lock"
          size="mini"
          @click="handleBatchLock"
          v-has-permi="['pay:memberWithdrawLog:lock']"
        >批量锁定
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-finished"
          size="mini"
          @click="handleBatchPayAgent"
          v-has-permi="['pay:payAgentPlatform:order']"
        >批量代付
        </el-button>
      </el-col>

      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-document-copy"
          size="mini"
          @click="handleBatchCopy"
        >批量复制
        </el-button>
      </el-col>
      <el-col :span="10" style="margin-left: 10px">
        <span style="font-size: 16px;margin-right: 10px">记录刷新</span>
        <el-select v-model="refreshSec" placeholder="时间间隔" style="width: 110px">
          <el-option value="5" label="5秒"></el-option>
          <el-option value="10" label="10秒"></el-option>
          <el-option value="15" label="15秒"></el-option>
          <el-option value="20" label="20秒"></el-option>
          <el-option value="30" label="30秒"></el-option>
        </el-select>
        <div style="width: 120px;display: inline-block;text-align: center">
          <span>{{ refreshDesc }}</span>
        </div>
        <el-button :type="refreshType" :icon="refreshIcon" size="mini" @click="refreshData">{{ refreshLabel }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberWithdrawLogList"
              :highlight-current-row="true" @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="复制" align="center" width="100px">
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
          <el-button
            type="text" size="mini"
            icon="el-icon-copy-document"
            @click="handleCopy2(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="会员ID" min-width="150" align="center" prop="memberId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="funds(row.memberId)"
             v-if="row.memberStatus === 0 || row.memberStatus === 1">{{ row.memberId }}</a>
          <a style="color: #ff0000" @click="funds(row.memberId)" v-if="row.memberStatus === 4">{{ row.memberId }}</a>
          <a style="color: #ee00ff" @click="funds(row.memberId)"
             v-if="row.memberStatus === 2 || row.memberStatus === 3 || row.memberStatus === 5">{{ row.memberId }}</a>
        </template>
      </el-table-column>
<!--      <el-table-column label="会员账号" min-width="120" align="center" prop="account"/>-->
      <el-table-column label="入款姓名" min-width="120" align="center" prop="rechargeUserName"/>
      <el-table-column label="今日入款成功数" min-width="130" align="center" prop="bankCharge">
      <template v-slot="{row}">
        <span style="color: #f10a0a" v-if="row.bankCharge > 4">{{ row.bankCharge }}</span>
        <span v-else>{{ row.bankCharge }}</span>
      </template>
      </el-table-column>
      <el-table-column label="出入款比" min-width="100" align="center" prop="rechargeWithdrawRate">
        <template v-slot="{row}">
          <span style="color: #FF5722" v-if="row.rechargeWithdrawRate > 10">{{ row.rechargeWithdrawRate }}</span>
          <span v-else>{{ row.rechargeWithdrawRate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="投注打码比" min-width="100" align="center" prop="rechargeCodeRatio">
      <template v-slot="{row}">
        <span style="color: #f10a0a" v-if="row.rechargeCodeRatio === 1.5 || row.rechargeCodeRatio > 1.5">{{ row.rechargeCodeRatio }}</span>
        <span v-else>{{ row.rechargeCodeRatio }}</span>
      </template>
      </el-table-column>
      <el-table-column label="提现金额" min-width="100" align="center" prop="withdrawMoney">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.withdrawMoney)">{{ row.withdrawMoney }}</a>
        </template>
      </el-table-column>
      <el-table-column label="收款人" min-width="100" align="center" prop="bankUserName">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankUserName)">{{ row.bankUserName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="银行账号" min-width="180" align="center" prop="bankAccount">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankAccount)">{{ row.bankAccount }}</a>
        </template>
      </el-table-column>
      <el-table-column label="银行" min-width="120" align="center" prop="bankName">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="copyColumn(row.bankName)">{{ row.bankName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120" align="center" prop="status">
        <template slot-scope="scope">
          <span
            :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}"
          >{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行归属地" align="center" min-width="110" prop="cardBlack">
        <template v-slot="{row}">
          <span style="color: #ff0026" v-if="row.cardBlack == 1">{{ row.realBankAddress }}</span>
          <span v-if="row.cardBlack == 0">{{ row.realBankAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否首次" min-width="90" align="center" prop="first" :formatter="firstFormat"/>
      <el-table-column label="操作人" min-width="120" align="center" prop="opName"/>
      <el-table-column label="审核备注" min-width="200" align="center" prop="remark"/>
      <el-table-column label="下单时间" min-width="150" align="center" prop="createTime"/>
      <el-table-column label="最后修改时间" min-width="150" align="center" prop="updateTime"/>
      <el-table-column label="订单号" min-width="200" align="center" prop="orderNo"/>
      <el-table-column label="操作" min-width="285" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="info"
            plain
            v-show="scope.row.status === 4"
            icon="el-icon-refresh-right"
            @click="handleBack(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:back']"
          >回退
          </el-button>
          <el-button
            size="small"
            type="info"
            plain
            v-show="scope.row.status === 5"
            icon="el-icon-refresh-right"
            @click="handleFailBack(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:back']"
          >回退
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.status === 4 || scope.row.status === 5"
            icon="el-icon-search"
            @click="handleQueryStatus(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:queryStatus']"
          >查询状态
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-show="scope.row.status === 0"
            icon="el-icon-lock"
            @click="handleLock(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:lock']"
          >锁定
          </el-button>
          <el-button
            size="small"
            type="primary"
            plain
            v-show="scope.row.status === 1"
            icon="el-icon-unlock"
            @click="handleUnlock(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:unlock']"
          >解锁
          </el-button>
          <el-button
            size="small"
            type="success"
            plain
            v-show="scope.row.status == 1 || scope.row.status == 7 || scope.row.status == 8"
            icon="el-icon-circle-check"
            @click="handleWithdraw(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:artificial']"
          >出款
          </el-button>
          <el-button
            size="small"
            type="danger"
            plain
            v-show="scope.row.status < 2 || scope.row.status == 5 || scope.row.status == 7 || scope.row.status == 8"
            icon="el-icon-circle-close"
            @click="handleRefused(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:refused']"
          >拒绝
          </el-button>
          <el-button
            size="small"
            type="warning"
            plain
            v-show="scope.row.status == 5"
            icon="el-icon-s-custom"
            @click="handleArtificialWithdraw2(scope.row)"
            v-has-permi="['pay:memberWithdrawLog:artificial']"
          >人工出款
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[10,30,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改会员提现信息对话框 -->
    <el-dialog title="资金明细" :visible.sync="fundsOpen" width="450px" style="max-height:600px;overflow-y: scroll;"
               append-to-body
    >
      <el-table :stripe="true" v-loading="loading" :data="fundsData" :row-class-name="tableRowClassName">
        <el-table-column label="项目名称" align="center" width="140" prop="class_twoname"/>
        <el-table-column label="项目值" align="center" prop="t_value"/>
      </el-table>
    </el-dialog>

    <!-- 添加或修改会员提现信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="出款明细" :visible.sync="open" width="500px"
               append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" readonly/>
        </el-form-item>
        <el-form-item label="会员账号" prop="account">
          <el-input v-model="form.account" readonly/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="bankUserName">
          <el-input v-model="form.bankUserName" readonly/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" readonly/>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" readonly/>
        </el-form-item>
        <el-form-item label="申请出款" prop="withdrawMoney">
          <el-input v-model="form.withdrawMoney" readonly/>
        </el-form-item>
        <el-form-item label="提现订单号" prop="orderNo">
          <el-input v-model="form.orderNo" readonly/>
        </el-form-item>
        <el-form-item label="Google验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" placeholder="代付需输入Google验证码"/>
        </el-form-item>
        <el-form-item label="代付平台" prop="payAgentPlatId">
          <el-select v-model="form.payAgentPlatId" placeholder="代付需选择代付平台" clearable size="small">
            <el-option v-for="plat in payAgentPlatformOptions" :key="plat.id" :label="plat.name" :value="plat.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          size="small"
          @click="handlePayAgent"
          :disabled="payDisabled"
          v-has-permi="['pay:payAgentPlatform:order']"
        >代 付
        </el-button>
        <el-button
          plain
          size="small"
          @click="handleManualWithdrawal"
          v-show="form.status !== 7 && form.status !== 8"
          v-has-permi="['pay:memberWithdrawLog:manualWithdrawal']"
        >人工代付
        </el-button>
        <el-button
          type="success"
          plain
          size="small"
          @click="handleArtificialWithdraw"
          v-has-permi="['pay:memberWithdrawLog:artificial']"
        >出 款
        </el-button>
        <el-button
          type="warning"
          plain
          size="small"
          @click="handleAbnormalWithdrawal"
          v-show="form.status !== 7 && form.status !== 8"
          v-has-permi="['pay:memberWithdrawLog:abnormalWithdrawal']"
        >出款异常
        </el-button>
        <el-button
          type="danger"
          plain
          size="small"
          @click="handleDialogRefused"
          v-has-permi="['pay:memberWithdrawLog:refused']"
        >拒 绝
        </el-button>
        <el-button
          type="info"
          plain
          size="small"
          @click="cancel"
        >取 消
        </el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="批量代付" :visible.sync="batchPayAgentOpen" width="500px"
               append-to-body
    >
      <el-form ref="batchForm" :model="batchPayAgentForm" :rules="rules" label-width="120px">
        <el-form-item label="Google验证码" prop="googleAuthCode">
          <el-input v-model="batchPayAgentForm.googleAuthCode" placeholder="代付需输入Google验证码"/>
        </el-form-item>
        <el-form-item label="代付平台" prop="payAgentPlatId">
          <el-select v-model="batchPayAgentForm.payAgentPlatId" placeholder="代付需选择代付平台" clearable size="small">
            <el-option v-for="plat in payAgentPlatformOptions" :key="plat.id" :label="plat.name" :value="plat.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          size="small"
          @click="handleBatchPayAgentOk"
          v-has-permi="['pay:payAgentPlatform:order']"
        >代 付
        </el-button>
        <el-button
          type="info"
          plain
          size="small"
          @click="cancel"
        >取 消
        </el-button>
      </div>
    </el-dialog>
    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleExport"></ExcelPrompt>
    <TableShow ref="tableShow"></TableShow>
  </div>
</template>
<style>
/**站内信长单词强制换行 */
.message_box_alert {
  word-break: break-all !important;
}
</style>
<script>
import {
  listMemberWithdrawLog,
  getMemberWithdrawLog,
  addMemberWithdrawLog,
  updateMemberWithdrawLog,
  exportMemberWithdrawLog,
  exportShunWeiMemberWithdrawLog,
  refusedMemberWithdrawLog,
  refusedsMemberWithdrawLog,
  backWithdrawLog,
  failBackWithdrawLog,
  lockMemberWithdrawLog,
  locksMemberWithdrawLog,
  unlockMemberWithdrawLog,
  artificialMemberWithdrawLog,
  abnormalWithdrawal,
  manualWithdrawal,
  getMemberWithdrawReport,
  queryStatusWithdrawLog,
  getCountTotal
} from '@/api/platform-web/pay/memberWithdrawLog'
import {
  effectListPayAgentPlatform,
  payAgentOrder,
  payAgentOrders
} from '@/api/platform-web/pay/payAgentPlatform'
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'
import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';
import TableShow from '@/views/pay/memberWithdrawLog/tableShow.vue';

export default {
  name: 'MemberWithdrawLog',
  components: {ExcelPrompt, TableShow},
  data() {
    return {
      //银行卡黑名单下拉框
      CardBlackOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      // 选中数组
      ids: [],
      //代付
      payDisabled: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 头部数据
      totalData: {},
      totalLoading: false,
      //点击导出后不可点击
      disabled: false,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 会员提现信息表格数据
      memberWithdrawLogList: [],
      // 弹出层标题
      title: '',
      //资金明细
      fundsOpen: false,
      rechargeCodeRatio: null,
      rechargeWithdrawRate: null,
      bankCharge: null,
      //资金明细数据
      fundsData: [],
      batchPayAgentOpen: false,
      // 是否显示弹出层
      open: false,
      // 状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)字典
      statusOptions: [],
      // 是否首次1是0否字典
      firstOptions: [],
      // 代付平台
      payAgentPlatformOptions: [],
      //银行归属地
      realBankAddress: null,
      //会员状态是否为套利号
      memberStatus: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        searchValue: null,
        status: null,
        searchTime: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        priceMin: null,
        priceMax: null,
        remark: null,
        //银行卡黑名单
        SearchCardBlack: null,
        cardBlack: null,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      batchPayAgentForm: {},
      // 表单校验
      rules: {
        googleAuthCode: [
          {required: true, message: 'google验证码不能为空', trigger: 'blur'}
        ],
        payAgentPlatId: [
          {required: true, message: '请选择代付平台', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getDicts('withdraw_log_status').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('first').then(response => {
      this.firstOptions = response.data
    })
    this.getList()
  },
  activated() {
    this.refreshType = 'primary'
    this.refreshIcon = 'el-icon-refresh'
    this.refreshLabel = '开始刷新'
    this.refreshDesc = ''

    this.stopRefresh()
  },
  methods: {
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    tableRowClassName({row, rowIndex}) {
      if (row.class_twoname === '彩票异常投注次数') {
        return 'danger-row'
      }
      return ''
    },
    funds(userId) {
      getMemberWithdrawReport(userId).then((res) => {
        this.fundsData = res.data
        this.$refs.tableShow.show(res.data);
        // this.fundsOpen = true
      })
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.total)
    },
    copy2() {
      this.copyCommand(this.totalData.successTotal)
    },
    copy3() {
      this.copyCommand(this.numberUtil.toPercent(this.totalData.successRate))
    },
    copyColumn(value) {
      this.copyCommand(value)
    },
    getCountTotal() {
      this.totalLoading = true
      getCountTotal(this.queryParams).then((res) => {
        this.totalData = res.data
      }).finally(() => {
        this.totalLoading = false
      })
    },
    /** 查询会员提现信息列表 */
    getList() {
      this.loading = true
      listMemberWithdrawLog(this.queryParams).then(response => {
        this.memberWithdrawLogList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否首次1是0否字典翻译
    firstFormat(row, column) {
      return this.selectDictLabel(this.firstOptions, row.first)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.batchPayAgentOpen = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        searchValue: null,
        withdrawMoney: null,
        status: null,
        updateTime: []
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      // this.getCountTotal()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 复制按钮 */
    handleCopy(row) {
      var status = this.statusOptions[parseInt(row.status)]
      var textarea = document.createElement('textarea')
      let html = '<table><tr>'
      html += '<td>' + row.memberId + '</td>'
      html += '<td>' + row.account + '</td>'
      //html += '<td>' + row.rechargeWithdrawRate + '</td>'
      html += '<td>' + row.withdrawMoney + '</td>'
      html += '<td>' + row.bankUserName + '</td>'
      html += '<td>' + '\'' + row.bankAccount + '\'' + '</td>'
      html += '<td>' + row.bankName + '</td>'
      html += '<td>' + status.dictLabel + '</td>'
      //html += '<td>' + row.first + '</td>'
      html += '<td>' + row.opName + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '<td>' + row.updateTime + '</td>'
      html += '</tr></table>'
      textarea.value = html
      this.copyData = html
      this.copy(this.copyData)
    },
    /** 复制按钮 */
    handleCopy2(row) {
      var status = this.statusOptions[parseInt(row.status)]
      var textarea = document.createElement('textarea')
      let html = row.memberId
        + '\r\n' + row.account
        + '\r\n' + row.withdrawMoney
        + '\r\n' + row.bankUserName
        + '\r\n' + row.bankAccount
        + '\r\n' + row.bankName
        + '\r\n' + status.dictLabel
        + '\r\n' + row.opName
        + '\r\n' + row.createTime
        + '\r\n' + row.updateTime
        + '\r\n' + row.orderNo
      textarea.value = html
      this.copyData = html
      this.copy(this.copyData)
    },
    copy(data) {
      let url = data
      let oInput = document.createElement('textarea')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberWithdrawLog(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMemberWithdrawLog(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    openExport() {
      this.$refs.excelPrompt.open = true;
    },
    /** 导出按钮操作 */
    handleExport(date) {
      this.disabled = true
      const queryParams = this.queryParams
      // queryParams.selectDate = []
      queryParams.downLoadDate = date
      queryParams.searchTime = []
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportMemberWithdrawLog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员提现')
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    /** 顺为代付格式导出按钮操作 */
    handleShunWeiExport() {
      if (this.ids.length <= 0) {
        this.msgError('请勾选需要导出的记录,不勾选无法导出')
        return
      }
      const that = this
      this.disabled = true
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportShunWeiMemberWithdrawLog(that.ids)
      }).then(response => {
        this.downloadExcel(response, '顺为代付提现')
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    handleLock(row) {
      lockMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },
    handleBack(row) {
      const id = row.id;
      this.$confirm('请核对订单是否成功提交,如提交成功不必回退.确认回退？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return backWithdrawLog(id);
      }).then(response => {
        this.getList()
        this.msgSuccess("回退成功")
      })
    },
    handleFailBack(row) {
      const id = row.id;
      this.$confirm('请核对订单是否确认已失败,确认回退？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return failBackWithdrawLog(id);
      }).then(response => {
        this.getList()
        this.msgSuccess("回退成功")
      })
    },
    handleQueryStatus(row) {
      this.loading = true
      queryStatusWithdrawLog({
        orderNo: row.orderNo
      }).then(response => {
        this.$alert(response.msg, '查询结果', {
          confirmButtonText: '知道了',
          customClass: 'message_box_alert',
        })
      }).finally(() => {
        this.loading = false
      })
    },
    handleUnlock(row) {
      unlockMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },
    handleWithdraw(row) {
      this.reset()
      const id = row.id
      getMemberWithdrawLog(id)
        .then(response => {
          this.form = response.data
          this.open = true
        })
        .then(() => {
          //代付平台
          effectListPayAgentPlatform().then(response => {
            this.payAgentPlatformOptions = response.data
          })
        })
    },
    handleArtificialWithdraw2(row) {
      artificialMemberWithdrawLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    handleArtificialWithdraw() {

      artificialMemberWithdrawLog({
        id: this.form.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    handleAbnormalWithdrawal() {
      this.$prompt(null, '请输入出款异常原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        abnormalWithdrawal({
          id: this.form.id,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          if (response.code == 200) {
            this.open = false
            this.getList()
          }
        })
      }).catch(() => {
      })
    },
    handleManualWithdrawal() {
      manualWithdrawal({
        id: this.form.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    promptRefused(id) {
      this.$prompt(null, '请输入拒绝出款原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '拒绝原因不可为空'
      }).then(({value}) => {
        refusedMemberWithdrawLog({
          id: id,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        })
      }).catch(() => {
      })
    },
    handleRefused(row) {
      this.promptRefused(row.id)
    },
    handleDialogRefused() {
      this.promptRefused(this.form.id)
    },
    handleBatchRefused() {
      if (this.ids.length <= 0) {
        this.msgWarning('请选择需要拒绝出款选项')
        return
      }
      this.$prompt(null, '请输入拒绝出款原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        refusedsMemberWithdrawLog({
          ids: this.ids,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        })
      }).catch(() => {
      })
    },
    handleBatchLock() {
      if (this.ids.length <= 0) {
        this.msgWarning('请选择需要锁定出款选项')
        return
      }
      locksMemberWithdrawLog({
        ids: this.ids
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },
    handlePayAgent() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.payDisabled = true
          payAgentOrder({
            payAgentPlatId: this.form.payAgentPlatId,
            withdrawOrderNo: this.form.orderNo,
            googleAuthCode: this.form.googleAuthCode
          }).then(response => {
            this.msgSuccess(response.msg)
            if (response.code == 200) {
              this.open = false
            }
          }).catch(() => {
            this.$notify.error('网络异常')
          }).finally(() => {
            this.getList()
            this.payDisabled = false
          })
        } else {
          this.$message.error("表单验证不通过")
        }
      })
    },
    handleBatchPayAgent() {
      if (this.ids.length <= 0) {
        this.msgWarning('请选择需要代付出款选项')
        return
      }
      this.batchPayAgentOpen = true
      //代付平台
      effectListPayAgentPlatform().then(response => {
        this.payAgentPlatformOptions = response.data
      })
    },
    handleBatchPayAgentOk() {
      this.$refs['batchForm'].validate(valid => {
        if (valid) {
          let orderNos = []
          for (const row of this.memberWithdrawLogList) {
            for (const id of this.ids) {
              if (id == row.id) {
                orderNos.push(row.orderNo)
              }
            }
          }
          payAgentOrders({
            payAgentPlatId: this.batchPayAgentForm.payAgentPlatId,
            withdrawOrderNos: orderNos,
            googleAuthCode: this.batchPayAgentForm.googleAuthCode
          }).then(response => {
            this.msgSuccess(response.msg)
            if (response.code == 200) {
              this.batchPayAgentOpen = false
              this.getList()
              var successNum = response.data.sucess
              var failData = response.data.fail
              var failTxt = '成功数量: ' + successNum + ';<br/> 失败原因: <br/>'
              for (let failDataKey in failData) {
                failTxt += failDataKey + '  ' + failData[failDataKey] + ' ;<br/> '
              }
              this.$alert(failTxt, '批量代付信息', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true
              })
            }
          })
        } else {
          this.$message.error("表单验证不通过")
        }
      })
    },
    handleBatchCopy() {
      if (this.ids.length <= 0) {
        this.msgWarning('请选择需要批量复制选项')
        return
      }
      var textarea = document.createElement('textarea')
      let html = ''
      for (const row of this.memberWithdrawLogList) {
        for (const id of this.ids) {
          if (id == row.id) {
            var status = this.statusOptions[parseInt(row.status)]
            html += '<table><tr>'
            html += '<td>' + row.memberId + '</td>'
            html += '<td>' + row.account + '</td>'
            html += '<td>' + row.withdrawMoney + '</td>'
            html += '<td>' + row.bankUserName + '</td>'
            html += '<td>' + '\'' + row.bankAccount + '\'' + '</td>'
            html += '<td>' + row.bankName + '</td>'
            html += '<td>' + status.dictLabel + '</td>'
            html += '<td>' + row.opName + '</td>'
            html += '<td>' + row.createTime + '</td>'
            html += '<td>' + row.updateTime + '</td>'
            html += '</tr></table>'
          }
        }
      }
      textarea.value = html
      this.copyData = html
      this.copy(this.copyData)
    },
    refreshData() {
      if (this.refreshType === 'primary') {
        this.refreshType = 'danger'
        this.refreshIcon = 'el-icon-circle-close'
        this.refreshLabel = '停止刷新'
        this.refreshDesc = ''

        this.stopRefresh()
        this.getList()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = '开始刷新'
        this.refreshDesc = ''

        this.stopRefresh()
      }
    },
    startRefresh() {
      const thet = this
      let secs = thet.refreshSec
      window.refreshInterval = setInterval(function () {
        if (secs === 0) {
          thet.getList()
          secs = thet.refreshSec
        }
        thet.refreshDesc = secs + '秒后开始刷新'
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    }
  }
}
</script>
