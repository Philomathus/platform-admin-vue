<template>
  <div class="app-container">
    <div v-loading="totalLoading">
    <el-button type="primary" @click="copy1">{{ $t('pay.memberPayList.tnoc') }} {{ this.totalData.totalcount || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('pay.memberPayList.tsa') }} {{ this.totalData.subMoney || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('pay.memberPayList.thf') }} {{ this.totalData.handlingfeeTotal || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('pay.memberPayList.tset') }} {{ (this.totalData.subMoney - this.totalData.handlingfeeTotal || 0 ).toFixed(2)}}</el-button>
    <!--    <el-button type="info" id="copy4" @click="copy4">成功率 {{ numberUtil.toPercent(this.totalData.failRate) }}</el-button>-->
    <el-button type="primary" icon="el-icon-search" size="mini" @click="listCounts()" style="margin-left: 20px">
      {{ $t('members.memberInfo.index.button.statQ') }}
    </el-button>
    </div>

    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="100px">
      <el-form-item :label=" $t('pay.memberPayList.ut') " prop="updateTime" label-width="70px">
        <el-date-picker clearable size="small"
                        v-model="queryParams.updateTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder=" $t('global.selectDate') "
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="platformId" style="width: 150px">
        <el-select
          filterable
          v-model="queryParams.platformId"
          :placeholder=" $t('pay.memberPayList.pp') "
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
      <el-form-item prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          :placeholder=" $t('pay.memberPayList.pc') "
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['pay:memberPayList:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList" :highlight-current-row="true">
      <el-table-column :label=" $t('pay.memberPayList.pp') " min-width="120" align="center" prop="platformName"/>
      <el-table-column :label=" $t('pay.memberPayList.pc') " min-width="150" align="center" prop="channelName" :show-overflow-tooltip="true"/>
      <el-table-column :label=" $t('pay.memberPayList.ar') " min-width="80" align="center" prop="money"/>
      <el-table-column :label=" $t('pay.memberPayList.aa') " min-width="80" align="center" prop="subMoney"/>
      <el-table-column :label=" $t('pay.memberPayList.rate') " min-width="80" align="center" prop="channelPayRate"/>
      <el-table-column :label=" $t('pay.memberPayList.hf') " min-width="80" align="center" prop="handlingfee"/>
      <el-table-column :label=" $t('pay.memberPayList.sa') " min-width="80" align="center" prop="remaining"/>
      <el-table-column :label=" $t('pay.memberPayList.ut') " min-width="160" align="center" prop="updateTime"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100,200,500]"
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
  exportMemberPayJour} from '@/api/platform-web/pay/memberPayList'
import { platforms } from '@/api/platform-web/pay/payChannelNew'
import { patchOrderPayPlatformNew } from '@/api/platform-web/pay/payPlatformNew'
import { toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'MemberPayList',
  components: {},
  data() {
    return {
      totalLoading: false,
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: this.$t('pay.memberPayList.sr') ,
      refreshDesc: '',
      pickerOptions: {shortcuts: toyesDayshortcuts},
      //统计总的数据

      totalsettleTotal: 0,
      totalData: {},
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
        pageSize: 20,
        platformId: null,
        channelName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        subMoney: [
          { required: true, message: this.$t('pay.memberPayList.tac'), trigger: 'blur' }
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
  },
  activated() {
    this.refreshType = 'primary'
    this.refreshIcon = 'el-icon-refresh'
    this.refreshLabel = this.$t('pay.memberPayList.sr')
    this.refreshDesc = ''

    this.stopRefresh()
  },
  methods: {
    //复制
    copy1() {
      this.copyCommand(this.totalData.totalcount)
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
        /*if(this.memberPayJourList.length != 0) {
          this.memberPayJourList.forEach(value => {
            value.subMoney = (parseFloat(value.subMoney)).toFixed(2)
            this.totalsettleTotalList.push(value.subMoney)
          })
          for (var i = 0; i < this.totalsettleTotalList.length; i++) {
            this.totalsettleTotal += parseFloat(this.totalsettleTotalList[i]);
          }
          this.totalsettleTotal = parseFloat(this.totalsettleTotal).toFixed(2)
        }*/
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
        channelName: null,
        platformId: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.totalsettleTotalList = []
      this.totalsettleTotal = 0
      this.queryParams.pageNum = 1
      this.getList()
    },
    listCounts() {
      listCounts(this.queryParams).then((res) => {
        this.totalData = res
      })
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
      this.$confirm( this.$t('pay.memberPayList.cpe'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportMemberPayJour(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('pay.memberPayList.ocr'))
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
          this.form.statusStr = this.$t('pay.memberPayList.fail')
          this.open = true
        } else if (this.form.status == -1) {
          this.form.statusStr = this.$t('pay.memberPayList.tbc')
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
        this.refreshLabel = this.$t('pay.memberPayList.stor')
        this.refreshDesc = ''

        this.stopRefresh()
        this.getList()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = this.$t('pay.memberPayList.sr')
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
        thet.refreshDesc = secs + this.$t('pay.memberPayList.rsas')
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    }
  }
}
</script>
