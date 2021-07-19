<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="70px">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="inviterCode" style="width: 110px;">
        <el-input
          v-model="queryParams.inviterCode"
          placeholder="邀请码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="channelcode" style="width: 110px;">
        <el-select v-model="queryParams.channelcode" placeholder="全部类型" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item prop="status" style="width: 110px;">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small">
          &lt;!&ndash;          <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"/>&ndash;&gt;
          <el-option
            v-for="dict in typeList"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="parseInt(dict.dictValue)"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item prop="email" style="width: 160px;">
        <el-input
          v-model="queryParams.email"
          placeholder="登录备注"
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
          :disabled="disabled"
          @click="handleExport"
          v-hasPermi="['report-member:memberChannel:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList" :highlight-current-row="true">
      <el-table-column label="数量" :show-overflow-tooltip="true" align="center" prop="number" min-width="50"/>
      <el-table-column label="网易异常备注" :show-overflow-tooltip="true" align="center" prop="email" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.email == null || scope.row.email =='' " :style="{'color': '#5FB878'}">正常</span>
          <span v-else :style="{'color': '#746560'}">{{scope.row.email }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="状态" min-width="120" align="center" prop="status" :formatter="statusFormat" ></el-table-column>-->
      <el-table-column label="邀请码" align="center" prop="inviterCode" min-width="80"/>
      <el-table-column label="用户类型" align="center" prop="channelcode" min-width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.channelcode == null" :style="{'color': '#5f91b8'}">会员(老接口)</span>
          <span v-else :style="{color: (channelcode = statusOptions[parseInt(scope.row.channelcode)]).color}">{{ channelcode.dictLabel }}</span>
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
  </div>
</template>

<script>
import {
  listReport,
  exportReportMonwyInfo} from '@/api/platform-web/report/memberStatistics'

import { pickerDateTimeShortcuts} from '@/utils/dateUtils'


export default {
  name: 'memberChannel',
  components: {},
  data() {
    return {
      refreshSec: '5',
      refreshType: 'primary',
      refreshIcon: 'el-icon-refresh',
      refreshLabel: '开始刷新',
      refreshDesc: '',
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      //统计总的数据
      totalData: {},
      totalsettleTotal: 0,
      // 状态列表0= 禁用 1=正常 2=测试号3=超管号
      typeList: [],
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
        pageNum: 1,
        pageSize: 50,
        email:'',
        //status: '',
        inviterCode: '',
        channelcode: '',
        downLoadDate:[],
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {

      }
    }
  },
  created() {
    this.getList()
    this.getDicts('member_type').then(response => {
      this.typeList = response.data
      console.info(this.typeList)
    })
    this.getDicts('device_type').then(response => {
      this.statusOptions = response.data
    })
  },

  methods: {
    /** 查询线上充值信息列表 */
    getList() {
      this.loading = true
     /* if (
        this.queryParams.email===''  &&
        this.queryParams.inviterCode===''  &&
        this.queryParams.channelcode==='' ) {
        this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      }else {
        this.queryParams.params = []
      }*/
      this.queryParams = this.addDateRange(this.queryParams, this.dateRange);
      console.info(this.queryParams)
      listReport(this.queryParams).then(response => {
        this.memberPayJourList = response.rows
        this.total = response.total
        this.loading = false
      })

    },
    // 菜单状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.typeList, row.status)
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
        return exportReportMonwyInfo(queryParams)
      }).then(response => {
        this.downloadExcel(response, '网易异常统计')
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
