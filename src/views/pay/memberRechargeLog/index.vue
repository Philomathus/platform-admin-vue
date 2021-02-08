<template>
  <div class="app-container">
    <el-button type="success" @click="copy1">交易笔数 {{ this.totalData.total }}</el-button>
    <el-button type="warning" @click="copy2">总成功金额 {{ this.totalData.successMoney || 0 }}</el-button>
    <el-button type="info" id="copy3" @click="copy3">成功率 {{ numberUtil.toPercent(this.totalData.successRate) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="82px">
      <el-form-item label="审核时间" prop="selectDate" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="全部状态"
          clearable
          size="small"
          style="width: 130px"
        >
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="orderNo" style="width: 210px;">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="userName" style="width: 160px;">
        <el-input
          v-model="queryParams.userName"
          placeholder="会员ID/会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="bankUserName" style="width: 120px;">
        <el-input
          v-model="queryParams.bankUserName"
          placeholder="收款人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="rechargeUserName" style="width: 120px;">
        <el-input
          v-model="queryParams.rechargeUserName"
          placeholder="充值人"
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
          v-hasPermi="['pay:memberRechargeLog:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberRechargeLogList">
      <el-table-column label="会员ID" :show-overflow-tooltip="true" align="center" prop="memberId" min-width="120"/>
      <el-table-column label="会员账号" align="center" prop="userName" min-width="90"/>
      <el-table-column label="充值人姓名" :show-overflow-tooltip="true" align="center" prop="rechargeUserName" min-width="90"/>
      <el-table-column label="充值金额" align="center" prop="rechargeMoney" min-width="90"/>
      <el-table-column label="收款人" :show-overflow-tooltip="true" align="center" prop="bankUserName" min-width="90"/>
      <el-table-column label="银行名称" :show-overflow-tooltip="true" align="center" prop="bankName" min-width="120"/>
      <el-table-column label="订单号" :show-overflow-tooltip="true" align="center" prop="orderNo" min-width="220"/>
      <el-table-column label="状态" align="center" prop="status" min-width="120">
        <template slot-scope="scope">
          <span :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}">{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否首次" align="center" prop="first" :formatter="firstStatusFormat" min-width="75"/>
      <el-table-column label="操作人" align="center" prop="opName" min-width="120"/>
      <el-table-column label="用户下单时间" align="center" prop="createTime" width="160"/>
      <el-table-column label="最后修改时间" align="center" prop="updateTime" width="160"/>
      <el-table-column label="备注" :show-overflow-tooltip="true" align="center" prop="remark" width="160"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-unlock"
            v-if="scope.row.status == 0"
            @click="handleFirstAudit(scope.row)"
            v-hasPermi="['pay:memberRechargeLog:firstAudit']"
          >初审
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-check"
            style="color: #5FB878"
            v-if="scope.row.status == 1"
            @click="handleFinalAudit(scope.row)"
            v-hasPermi="['pay:memberRechargeLog:finalAudit']"
          >终审通过
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-close"
            style="color: #FF5722"
            v-if="scope.row.status == 0 || scope.row.status == 1"
            @click="handleRefusedAudit(scope.row)"
            v-hasPermi="['pay:memberRechargeLog:refusedAudit']"
          >审核不通过
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-refresh-right"
            style="color: #FFB800"
            v-if="scope.row.status == 2 || scope.row.status == 4"
            @click="handleRecoverAudit(scope.row)"
            v-hasPermi="['pay:memberRechargeLog:recoverAudit']"
          >恢复
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

    <!-- 添加或修改公司入款信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="审核不通过原因" :visible.sync="open" width="260px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules">
        <el-select
          v-model="form.refusedAuditReason"
          placeholder="请选择不通过原因"
          clearable
          size="small"
        >
          <el-option
            v-for="dict in refusedAuditReasonOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRefusedAudit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listMemberRechargeLog,
  listCount,
  getMemberRechargeLog,
  exportMemberRechargeLog,
  firstAuditMemberRechargeLog,
  finalAuditMemberRechargeLog,
  refusedAuditMemberRechargeLog,
  recoverAuditMemberRechargeLog
} from '@/api/platform-web/pay/memberRechargeLog'
import { pickerDateTimeShortcuts } from '@/utils/dateUtils'

export default {
  name: 'MemberRechargeLog',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
      totalData: {},
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
      // 公司入款信息表格数据
      memberRechargeLogList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 状态字典
      firstStatusOptions: [],
      // 审核不通过原因字典
      refusedAuditReasonOptions: [],
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        pageNum: 1,
        pageSize: 50,
        orderByColumn: 'create_time',
        isAsc: 'desc',
        status: null,
        rechargeUserName: null,
        bankUserName: null,
        searchValue: null,
        orderNo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        refusedAuditReason: [
          { required: true, message: '审核不通过原因不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.listCount()
    this.getDicts('recharge_log_status').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('first').then(response => {
      this.firstStatusOptions = response.data
    })
  },
  methods: {
    listCount() {
      listCount(this.queryParams).then((res) => {
        this.totalData = res
      })
    },
    /** 查询公司入款信息列表 */
    getList() {
      this.loading = true
      listMemberRechargeLog(this.queryParams).then(response => {
        this.memberRechargeLogList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.total)
    },
    copy2() {
      this.copyCommand(this.totalData.successMoney)
    },
    copy3() {
      this.copyCommand(this.numberUtil.toPercent(this.totalData.successRate))
    },
    // 状态字典翻译
    firstStatusFormat(row, column) {
      return this.selectDictLabel(this.firstStatusOptions, row.first)
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
        userName: null,
        rechargeMoney: null,
        bankName: null,
        bankAccount: null,
        status: null,
        remark: null,
        opName: null,
        createTime: null,
        updateTime: null,
        bankAddress: null,
        type: null,
        rechargeUserName: null,
        bankUserName: null,
        orderNo: null,
        discountBill: null,
        first: null
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id
      getMemberRechargeLog(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改公司入款信息'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有公司入款信息数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberRechargeLog(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    },
    handleFirstAudit(row) {
      firstAuditMemberRechargeLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    handleFinalAudit(row) {
      finalAuditMemberRechargeLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    handleRefusedAudit(row) {
      this.getDicts('memberRechargeLog_refusedAudit_reason').then(response => {
        this.refusedAuditReasonOptions = response.data
        this.form.id = row.id
        this.open = true
      })
    },
    submitRefusedAudit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          refusedAuditMemberRechargeLog({
            id: this.form.id,
            remark: this.form.refusedAuditReason
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
    handleRecoverAudit(row) {
      recoverAuditMemberRechargeLog({
        id: row.id
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    }
  }
}
</script>
