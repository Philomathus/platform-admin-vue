<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
      <el-form-item label="提现订单号" prop="withdrawOrderNo">
        <el-input
          v-model="queryParams.withdrawOrderNo"
          placeholder="请输入提现订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代付订单号" prop="payAgentOrderNo">
        <el-input
          v-model="queryParams.payAgentOrderNo"
          placeholder="请输入代付订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代付平台" prop="payAgentPlatId">
        <el-select
          filterable
          v-model="queryParams.payAgentPlatId"
          placeholder="代付平台"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in payAgentsOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="会员账号" prop="memberAccount">
        <el-input
          v-model="queryParams.memberAccount"
          placeholder="请输入会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回调日期" prop="callbackTime">
        <span class="demonstration"></span>
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          unlink-panels
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="callbackStatus">
        <el-select v-model="queryParams.callbackStatus" placeholder="请选择回调状态" clearable size="small">
          <el-option
            v-for="dict in callbackStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['pay:payAgentLog:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payAgentLogList">
      <el-table-column label="提现订单号" align="center" prop="withdrawOrderNo"/>
      <el-table-column label="代付订单号" align="center" prop="payAgentOrderNo"/>
      <el-table-column label="代付平台ID" align="center" prop="payAgentPlatId"/>
      <el-table-column label="会员ID" align="center" prop="memberId"/>
      <el-table-column label="会员账号" align="center" prop="memberAccount"/>
      <el-table-column label="提现金额" align="center" prop="withdrawMoney"/>
      <el-table-column label="回调时间" align="center" prop="callbackTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.callbackTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回调状态" align="center" prop="callbackStatus" :formatter="callbackStatusFormat"/>
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
import {
  listPayAgentLog,
  exportPayAgentLog
} from '@/api/platform-web/pay/payAgentLog'
import { effectListPayAgentPlatform } from '@/api/platform-web/pay/payAgentPlatform'

export default {
  name: 'PayAgentLog',
  components: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            //start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
            text: '昨日',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24 );
              picker.$emit('pick', [start, end]);
            }
          },{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 代付下单日志表格数据
      payAgentLogList: [],
      //代付平台
      payAgentsOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 回调状态字典
      callbackStatusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        withdrawOrderNo: null,
        payAgentOrderNo: null,
        payAgentPlatId: null,
        memberAccount: null,
        createTime: null,
        callbackTime: null,
        callbackStatus: null
      },
    }
  },
  created() {
    this.getList()
    //代付平台
    effectListPayAgentPlatform().then(response => {
      this.payAgentsOptions = response.data
    })
    this.getDicts('callback_status').then(response => {
      this.callbackStatusOptions = response.data
    })
  },
  methods: {
    /** 查询代付下单日志列表 */
    getList() {
      this.loading = true
      listPayAgentLog(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.payAgentLogList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 回调状态字典翻译
    callbackStatusFormat(row, column) {
      return this.selectDictLabel(this.callbackStatusOptions, row.callbackStatus)
    },
    // 表单重置
    reset() {
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有代付下单日志数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportPayAgentLog(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
