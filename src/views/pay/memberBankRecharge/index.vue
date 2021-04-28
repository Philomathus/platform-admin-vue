<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">交易比数 {{ this.totalData.totalcount || 0 }}</el-button>
    <el-button type="success" @click="copy2">总成功金额 {{ this.totalData.rechargeMoney || 0 }}</el-button>
    <!--    <el-button type="info" id="copy4" @click="copy4">成功率 {{ numberUtil.toPercent(this.totalData.failRate) }}</el-button>-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="100px">
      <el-form-item label="更新时间" prop="updateTime" label-width="70px">
        <el-date-picker clearable size="small"
                        v-model="queryParams.updateTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item prop="bankUserName">
        <el-input
          v-model="queryParams.bankUserName"
          placeholder="收款人"
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值金额" prop="withdrawMoney">
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
          @click="handleExport"
          v-hasPermi="['pay:memberBankRecharge:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList" :highlight-current-row="true">
      <el-table-column label="收款人" :show-overflow-tooltip="true" align="center" prop="bankUserName" min-width="90"/>
      <el-table-column label="银行名称" :show-overflow-tooltip="true" align="center" prop="bankName" min-width="120"/>
      <el-table-column label="银行账号" :show-overflow-tooltip="true" align="center" prop="bankAccount" min-width="200"/>
      <el-table-column label="充值金额" align="center" prop="rechargeMoney" min-width="90"/>
      <el-table-column label="次数" align="center" prop="time" min-width="90"/>
      <el-table-column label="更新时间" min-width="160" align="center" prop="updateTime"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[50,100,200,500]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listMemberPayJour,
  listCounts,
  exportMemberPayJour} from '@/api/platform-web/pay/memberBankRecharge'
import { platforms } from '@/api/platform-web/pay/payChannelNew'
import { patchOrderPayPlatformNew } from '@/api/platform-web/pay/payPlatformNew'
import { toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'memberBankRecharge',
  components: {},
  data() {
    return {
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      pickerOptions: {shortcuts: toyesDayshortcuts},
      //统计总的数据
      totalData: {},
      totalsettleTotal: 0,
      // 遮罩层
      loading: true,
      //点击导出后不可点击
      disabled: false,
      // 显示搜索条件
      showSearch: true,
      totalsettleTotalList: [],
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
        updateTime: this.parseTime(new Date(), '{y}-{m}-{d}'),
        pageNum: 1,
        pageSize: 100,
        priceMin: null,
        priceMax: null,
        bankUserName:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        subMoney: [
          { required: true, message: '实际到账金额不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    //支付平台
    platforms().then(response => {
      this.payPlatformOptions = response.data
    })
    this.getDicts('pay_jour_status').then(response => {
      this.statusOptions = response.data
    })
    this.getList()
    this.listCounts()
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
    listCounts() {
      listCounts(this.queryParams).then((res) => {
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
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        updateTime: null,
        priceMin: null,
        priceMax: null,
        bankUserName:null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.totalsettleTotalList = []
      this.totalsettleTotal = 0
      this.queryParams.pageNum = 1
      this.getList()
      this.listCounts()
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
      this.disabled = true
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberPayJour(queryParams)
      }).then(response => {
        this.downloadExcel(response, '线下充值报表')
        loading.close()
        this.disabled = false
      }).catch(() => {
        this.disabled = false
      })
    },
    handlePatchOrder(row) {
      getMemberPayJour(row.id).then(response => {
        this.form = response.data
        if (this.form.status == 0) {
          this.form.statusStr = '失败'
          this.open = true
        } else if (this.form.status == -1) {
          this.form.statusStr = '待确认'
          this.open = true
        }else {
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
