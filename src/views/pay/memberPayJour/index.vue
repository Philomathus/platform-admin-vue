<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">交易笔数 {{ this.totalData.total || 0 }}</el-button>
    <el-button type="success" @click="copy2">总成功金额 {{ this.totalData.totalMoney || 0 }}</el-button>
    <el-button type="warning" @click="copy3">补单金额 {{ this.totalData.replenishmentTotalMoney || 0 }}</el-button>
    <el-button type="info" id="copy4" @click="copy4">成功率 {{ numberUtil.toPercent(this.totalData.failRate) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="100px">
      <el-form-item label="回调时间" prop="selectDate" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" style="width: 100px">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="platformId" style="width: 150px">
        <el-select
          filterable
          v-model="queryParams.platformId"
          placeholder="支付平台"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in payPlatformOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="会员ID/会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="searchOrderNo">
        <el-input
          v-model="queryParams.searchOrderNo"
          placeholder="上游订单号/订单号"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberPayJour:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="6" style="margin-left: 10px">
          <span style="font-size: 16px;margin-right: 10px">记录刷新</span>
          <el-select v-model="refreshSec" clearable placeholder="时间间隔" style="width: 110px">
            <el-option value="5" label="5秒"></el-option>
            <el-option value="10" label="10秒"></el-option>
            <el-option value="15" label="15秒"></el-option>
            <el-option value="20" label="20秒"></el-option>
            <el-option value="30" label="30秒"></el-option>
          </el-select>
          <div style="width: 120px;display: inline-block;text-align: center">
            <span>{{ refreshDesc }}</span>
          </div>
          <el-button :type="refreshType" :icon="refreshIcon" size="mini" @click="refreshData">{{ refreshLabel }}</el-button>

      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList">
      <el-table-column label="会员ID" min-width="120" align="center" prop="memberId"/>
      <el-table-column label="会员账号" min-width="120" align="center" prop="userName"/>
      <el-table-column label="订单号" min-width="190" align="center" prop="orderNo"/>
      <el-table-column label="支付平台" min-width="120" align="center" prop="platformName"/>
      <el-table-column label="支付通道" min-width="150" align="center" prop="channelName" :show-overflow-tooltip="true"/>
      <el-table-column label="费率" min-width="80" align="center" prop="payRateStr"/>
      <el-table-column label="成功率" min-width="80" align="center" prop="currentSuccessRate">
        <template v-slot="{row}">
          <span style="color: #5fb878">{{ row.currentSuccessRateStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求金额" min-width="80" align="center" prop="money"/>
      <el-table-column label="实际金额" min-width="80" align="center" prop="subMoney"/>
      <el-table-column label="订单状态" min-width="80" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="!scope.row.isPatchOrder" :style="{color: (status = statusOptions[parseInt(scope.row.status) + 1]).color}">
            {{ status.dictLabel }}
          </span>
          <span v-if="scope.row.isPatchOrder" :style="{color: (status = statusOptions[3]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单时间" min-width="160" align="center" prop="payTime"/>
      <el-table-column label="更新时间" min-width="160" align="center" prop="updateTimes"/>
      <el-table-column label="上游订单号" min-width="220" align="center" prop="tradeSn" :show-overflow-tooltip="true"/>
      <el-table-column label="备注" min-width="180" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column label="操作" min-width="100" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handlePatchOrder(scope.row)"
            style="color: #FF5722"
            v-if="scope.row.status == 0"
            v-hasPermi="['pay:payPlatformNew:patchOrder']"
          >人工补单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[50,100,200,500]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog v-dialogDrag :close-on-click-modal="false" title="人工补单" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="会员ID" prop="member_id">
          <el-input v-model="form.memberId" readonly/>
        </el-form-item>
        <el-form-item label="会员账号" prop="user_name">
          <el-input v-model="form.userName" readonly/>
        </el-form-item>
        <el-form-item label="订单编号" prop="order_no">
          <el-input v-model="form.orderNo" readonly/>
        </el-form-item>
        <el-form-item label="支付平台" prop="platform_name">
          <el-input v-model="form.platformName" readonly/>
        </el-form-item>
        <el-form-item label="支付渠道" prop="channel_name">
          <el-input v-model="form.channelName" readonly/>
        </el-form-item>
        <el-form-item label="订单时间" prop="pay_time">
          <el-input v-model="form.payTime" readonly/>
        </el-form-item>
        <el-form-item label="支付状态" prop="status">
          <el-input v-model="form.statusStr" readonly/>
        </el-form-item>
        <el-form-item label="请求金额" prop="money">
          <el-input v-model="form.money" readonly/>
        </el-form-item>
        <el-form-item label="实际到账金额" prop="sub_money">
          <el-input v-model="form.subMoney" type="number" placeholder="请输入实际到账金额"/>
        </el-form-item>
        <el-form-item label="google验证码" prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" type="number" placeholder="请输入google验证码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberPayJour,
  getMemberPayJour,
  exportMemberPayJour,
  listCount
} from '@/api/platform-web/pay/memberPayJour'
import { platforms } from '@/api/platform-web/pay/payChannelNew'
import { patchOrderPayPlatformNew } from '@/api/platform-web/pay/payPlatformNew'
import { pickerDateTimeShortcuts } from '@/utils/dateUtils'

export default {
  name: 'MemberPayJour',
  components: {},
  data() {
    return {
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
      //统计总的数据
      totalData: {
        total: 0,
        totalMoney: 0,
        replenishmentTotalMoney: 0,
        failRate: 0
      },
      // 遮罩层
      loading: true,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 线上充值信息表格数据
      memberPayJourList: [],
      //支付平台
      payPlatformOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态
      statusOptions: [],
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],//回调日期
        pageNum: 1,
        pageSize: 50,
        searchValue: null,
        platformId: null,
        searchOrderNo: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        subMoney: [
          { required: true, message: '实际到账金额不能为空', trigger: 'blur' }
        ],
        googleAuthCode: [
          { required: true, message: 'google验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.listCount()
    //支付平台
    platforms().then(response => {
      this.payPlatformOptions = response.data
    })
    this.getDicts('pay_jour_status').then(response => {
      this.statusOptions = response.data
    })
  },
  activated() {
    this.refreshType = 'primary'
    this.refreshIcon = 'el-icon-refresh'
    this.refreshLabel = '开始刷新'
    this.refreshDesc = ''

    this.stopRefresh()
  },
  methods: {
    //
    listCount() {
      listCount(this.queryParams).then((res) => {
        this.totalData = res
      })
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.total)
    },
    copy2() {
      this.copyCommand(this.totalData.totalMoney)
    },
    copy3() {
      this.copyCommand(this.totalData.replenishmentTotalMoney)
    },
    copy4() {
      this.copyCommand(this.numberUtil.toPercent(this.totalData.failRate))
    },
    /** 查询线上充值信息列表 */
    getList() {
      this.loading = true
      listMemberPayJour(this.queryParams).then(response => {
        this.memberPayJourList = response.rows
        this.total = response.total
        this.loading = false
      })

    },
    // 状态(1 成功0失败 -1待确认)字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        memberId: null,
        userName: null,
        orderNo: null,
        payTime: null,
        platformName: null,
        channelName: null,
        statusStr: null,
        status: null,
        money: null,
        subMoney: null,
        googleAuthCode: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      this.listCount()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          patchOrderPayPlatformNew({
            orderNo: this.form.orderNo,
            subMoney: this.form.subMoney,
            googleAuthCode: this.form.googleAuthCode
          }).then(response => {
            this.msgSuccess(response.msg)
            if (response.code == 200) {
              this.open = false
              this.getList()
            }
          })
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有线上充值信息数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberPayJour(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    },
    handlePatchOrder(row) {
      getMemberPayJour(row.id).then(response => {
        this.form = response.data
        if (this.form.status == 0) {
          this.form.statusStr = '失败'
          this.open = true
        } else {
          this.getList()
        }
      })
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
      window.refreshInterval = setInterval(function() {
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
