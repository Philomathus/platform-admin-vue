<template>
  <div class="app-container">
    <div v-loading="totalLoading">
    <el-button type="primary" @click="copy1">{{ $t('pay.memberPayJour.not') }} {{ this.totalData.total || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('pay.memberPayJour.tsa') }} {{ this.totalData.totalMoney || 0 }}</el-button>
    <el-button type="warning" @click="copy3">{{ $t('pay.memberPayJour.roa') }} {{ this.totalData.replenishmentTotalMoney || 0 }}</el-button>
    <el-button type="info" id="copy4" @click="copy4">{{ $t('pay.memberPayJour.sr') }} {{ numberUtil.toPercent(this.totalData.failRate || 0 ) }}</el-button>
    <el-button  type="primary" icon="el-icon-search" size="mini" @click="listCount()" style="margin-left: 20px">{{ $t('pay.memberPayJour.sq') }}</el-button>
    </div>
    <el-form :model="queryParams" ref="queryForm" class="mt10" :inline="true"  v-show="showSearch" label-width="100px">
      <el-form-item :label=" $t('pay.memberPayJour.ct') " prop="selectDate" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" :start-placeholder=" $t('global.dateTimePickerStartTimePlaceholder') "
                        :end-placeholder=" $t('global.dateTimePickerEndTimePlaceholder') " :range-separator=" $t('global.dateTimePickerRangeSeparator') " :default-time="['00:00:00', '23:59:59']" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status" class="col-w100">
        <el-select v-model="queryParams.status" :placeholder=" $t('pay.memberPayJour.as') " clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="platformId" class="col-w150">
        <el-select
          filterable
          v-model="queryParams.platformId"
          :placeholder=" $t('pay.memberPayJour.pp') "
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
          :placeholder=" $t('pay.memberPayJour.pc') "
          clearable
          size="small"
          style="width: 160px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          :placeholder=" $t('pay.memberPayJour.miman') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="searchOrderNo">
        <el-input
          v-model="queryParams.searchOrderNo"
          :placeholder=" $t('pay.memberPayJour.uon') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item prop="money" label-width="70px">
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
          @click="openExport"
          v-hasPermi="['pay:memberPayJour:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <el-col :span="10" style="margin-left: 10px">
        <span style="font-size: 16px;margin-right: 10px">{{ $t('pay.memberPayJour.rr') }}</span>
        <el-select v-model="refreshSec" :placeholder=" $t('pay.memberPayJour.ti') " style="width: 110px">
          <el-option value="5"  :label=" $t('pay.memberPayJour.fs') "></el-option>
          <el-option value="10" :label=" $t('pay.memberPayJour.ts') "></el-option>
          <el-option value="15" :label=" $t('pay.memberPayJour.fts') "></el-option>
          <el-option value="20" :label=" $t('pay.memberPayJour.tws') "></el-option>
          <el-option value="30" :label=" $t('pay.memberPayJour.ths') "></el-option>
        </el-select>
        <div style="width: 120px;display: inline-block;text-align: center">
          <span>{{ refreshDesc }}</span>
        </div>
        <el-button :type="refreshType" :icon="refreshIcon" size="mini" @click="refreshData">{{ refreshLabel }}</el-button>

      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList" :highlight-current-row="true" :default-sort = "{prop: 'updateTime', order: 'descending'}">
      <el-table-column :label=" $t('pay.memberPayJour.mid') " min-width="120" align="center" prop="memberId"/>
      <el-table-column :label=" $t('pay.memberPayJour.ma') " min-width="120" align="center" prop="userName"/>
      <el-table-column :label=" $t('pay.memberPayJour.on') " min-width="190" align="center" prop="orderNo"/>
      <el-table-column :label=" $t('pay.memberPayJour.pp') " min-width="120" align="center" prop="platformName"/>
      <el-table-column :label=" $t('pay.memberPayJour.pc') " min-width="150" align="center" prop="channelName" :show-overflow-tooltip="true"/>
      <el-table-column :label=" $t('pay.memberPayJour.rates') " min-width="80" align="center" prop="payRateStr"/>
      <el-table-column :label=" $t('pay.memberPayJour.ar') " min-width="80" align="center" prop="money"/>
      <el-table-column :label=" $t('pay.memberPayJour.aa') " min-width="80" align="center" prop="subMoney"/>
      <el-table-column :label=" $t('pay.memberPayJour.os') " min-width="80" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="!scope.row.isPatchOrder" :style="{color: (status = statusOptions[parseInt(scope.row.status) + 1]).color}">
            {{ status.dictLabel }}
          </span>
          <span v-if="scope.row.isPatchOrder" :style="{color: (status = statusOptions[3]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('pay.memberPayJour.ot') " min-width="160" align="center" prop="payTime" sortable/>
      <el-table-column :label=" $t('pay.memberPayJour.ut') " min-width="160" align="center" prop="updateTime" sortable/>
      <el-table-column :label=" $t('pay.memberPayJour.upon') " min-width="220" align="center" prop="tradeSn" :show-overflow-tooltip="true"/>
      <el-table-column :label=" $t('pay.memberPayJour.rem') " min-width="180" align="center" prop="remark" :show-overflow-tooltip="true"/>
      <el-table-column :label=" $t('pay.memberPayJour.opt') " min-width="120" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="danger"
            plain
            icon="el-icon-edit"
            size="small"
            @click="handlePatchOrder(scope.row)"
            v-show="scope.row.status == 0 || scope.row.status == -1"
            v-hasPermi="['pay:payPlatformNew:patchOrder']"
          >{{ $t('pay.memberPayJour.mor') }}
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

    <el-dialog v-dialogDrag :close-on-click-modal="false" :title=" $t('pay.memberPayJour.mor') " :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label=" $t('pay.memberPayJour.mid') " prop="member_id">
          <el-input v-model="form.memberId" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.ma') " prop="user_name">
          <el-input v-model="form.userName" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.on') " prop="order_no">
          <el-input v-model="form.orderNo" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.pp') " prop="platform_name">
          <el-input v-model="form.platformName" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.pc') " prop="channel_name">
          <el-input v-model="form.channelName" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.ot') " prop="pay_time">
          <el-input v-model="form.payTime" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.ps') " prop="status">
          <el-input v-model="form.statusStr" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.ar') " prop="money">
          <el-input v-model="form.money" readonly/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.aaa') " prop="subMoney">
          <el-input v-model="form.subMoney" type="number" :placeholder=" $t('pay.memberPayJour.peta') "/>
        </el-form-item>
        <el-form-item :label=" $t('pay.memberPayJour.gc') " prop="googleAuthCode">
          <el-input v-model="form.googleAuthCode" type="number" :placeholder=" $t('pay.memberPayJour.pegvc') "/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
    <ExcelPrompt ref="excelPrompt" @downLoadExcel="handleExport"></ExcelPrompt>
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
import ExcelPrompt from '@/layout/components/prompt/excelPrompt.vue';
export default {
  name: 'MemberPayJour',
  components: {ExcelPrompt},
  data() {
    return {
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: this.$t('pay.memberPayJour.sref') ,
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
      //点击导出后不可点击
      disabled: false,
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
      //统计状态
      totalLoading: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],//回调日期
        pageNum: 1,
        pageSize: 50,
        searchValue: null,
        platformId: null,
        searchOrderNo: null,
        channelName: null,
        status: null,
        downLoadDate: [],
        priceMin: null,
        priceMax: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        subMoney: [
          { required: true, message: this.$t('pay.memberPayJour.tac'), trigger: 'blur' }
        ],
        googleAuthCode: [
          { required: true, message: this.$t('pay.memberPayJour.gce'), trigger: 'blur' }
        ]
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
    this.refreshLabel = this.$t('pay.memberPayJour.sref')
    this.refreshDesc = ''

    this.stopRefresh()
  },
  methods: {
    //
    listCount() {
      this.totalLoading=true
      listCount(this.queryParams).then((res) => {
        this.totalData = res
        this.totalLoading=false
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
      if(this.queryParams.searchValue){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.searchValue.match(reg)
        if(!flag){
          this.msgError( this.$t('pay.memberPayJour.onu') )
          return
        }
      }
      this.queryParams.pageNum = 1
      this.getList()
      // this.listCount()
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
    openExport() {
      this.$refs.excelPrompt.open=true;
    },
    /** 导出按钮操作 */
    handleExport(date) {
      this.disabled = true
      const queryParams = this.queryParams
      queryParams.downLoadDate = date
      queryParams.selectDate = []
      this.$confirm( this.$t('pay.memberPayJour.cpe') , this.$t(''), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportMemberPayJour(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('pay.memberPayJour.otu') )
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
          this.form.statusStr = this.$t('pay.memberPayJour.fail')
          this.open = true
        } else if (this.form.status == -1) {
          this.form.statusStr = this.$t('pay.memberPayJour.tbc')
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
        this.refreshLabel = this.$t('pay.memberPayJour.stor')
        this.refreshDesc = ''

        this.stopRefresh()
        this.getList()
        this.startRefresh()
      } else {
        this.refreshType = 'primary'
        this.refreshIcon = 'el-icon-refresh'
        this.refreshLabel = this.$t('pay.memberPayJour.stor')
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
        thet.refreshDesc = secs + this.$t('pay.memberPayJour.rsas')
        secs--
      }, 1000)
    },
    stopRefresh() {
      clearInterval(window.refreshInterval)
    }
  }
}
</script>
