<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付平台" prop="platformId">
        <el-select
          filterable
          v-model="queryParams.platformId"
          placeholder="支付平台"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in payPlatformOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="success">
        <el-select v-model="queryParams.success" clearable placeholder="请选择状态">
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期" prop="selectDate">
        <el-date-picker
          v-model="queryParams.selectDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期" :picker-options="pickerOptions"
        ></el-date-picker>
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
          v-hasPermi="['pay:payLog:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payLogList" @selection-change="handleSelectionChange">
      <el-table-column label="会员ID" align="center" prop="memberId" min-width="120"/>
      <el-table-column label="会员账号" align="center" prop="memberAccount" min-width="120"/>
      <el-table-column label="支付平台名称" align="center" prop="platformName" min-width="120"/>
      <el-table-column label="支付通道名称" align="center" prop="channelName" min-width="150"/>
      <el-table-column label="下单金额" align="center" prop="money" min-width="100"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单状态" align="center" prop="success" min-width="100">
        <template slot-scope="scope">
          <span
            :style="{color: (success = successOptions[parseInt(scope.row.success)]).color}"
          >{{ success.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="失败原因" :show-overflow-tooltip="true" min-width="220" align="center" prop="failReason"/>

    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100,200]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listPayLog, getPayLog, delPayLog, addPayLog, updatePayLog, exportPayLog } from '@/api/platform-web/pay/payLog'
import { platforms } from '@/api/platform-web/pay/payChannelNew'
import { get7beforeDay, pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'PayLog',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      //支付平台
      payPlatformOptions: [],
      //支付通道
      //payChannelOptions: [],
      // 总条数
      total: 0,
      // 支付信息日志表格数据
      payLogList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否下单成功 1成功 0 失败字典
      successOptions: [],
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
        pageNum: 1,
        pageSize: 20,
        memberId: null,
        platformId: null,
        channelId: null,
        success: null,
        createTime: null,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberId: [
          { required: true, message: '会员ID不能为空', trigger: 'blur' }
        ],
        memberAccount: [
          { required: true, message: '会员账号不能为空', trigger: 'blur' }
        ],
        platformId: [
          { required: true, message: '支付平台编号不能为空', trigger: 'change' }
        ],
        platformName: [
          { required: true, message: '支付平台名称不能为空', trigger: 'blur' }
        ],
        channelId: [
          { required: true, message: '支付通道编号不能为空', trigger: 'change' }
        ],
        channelName: [
          { required: true, message: '支付通道名称不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '下单金额不能为空', trigger: 'blur' }
        ],
        success: [
          { required: true, message: '是否下单成功 1成功 0 失败不能为空', trigger: 'change' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    //支付平台
    platforms().then(response => {
      this.payPlatformOptions = response.data
    })
    //支付通道
    /*paychannels().then(response => {
      this.payChannelOptions = response.data
    })*/
    this.getDicts('success_pay_log').then(response => {
      this.successOptions = response.data
    })
  },
  methods: {
    /** 查询支付信息日志列表 */
    getList() {
      this.loading = true
      listPayLog(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.payLogList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否下单成功 1成功 0 失败字典翻译
    successFormat(row, column) {
      return this.selectDictLabel(this.successOptions, row.success)
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
        memberId: null,
        memberAccount: null,
        platformId: null,
        platformName: null,
        channelId: null,
        channelName: null,
        money: null,
        success: null,
        failReason: null,
        createTime: null
      }
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加支付信息日志'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPayLog(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改支付信息日志'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayLog(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addPayLog(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除支付信息日志编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPayLog(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportPayLog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '支付信息日志')
      })
    }
  }
}
</script>
