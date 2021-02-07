<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">交易笔数 {{ this.totalData.total || 0 }}</el-button>
    <el-button type="success" @click="copy2">总成功金额 {{ this.totalData.totalMoney || 0 }}</el-button>
    <el-button type="warning" @click="copy3">补单金额 {{ this.totalData.replenishmentTotalMoney || 0 }}</el-button>
    <el-button type="info" id="copy4" @click="copy4">成功率 {{ numberUtil.toPercent(this.totalData.failRate) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-top: 10px" v-show="showSearch" label-width="82px">
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="memberPayJourList">
      <el-table-column label="会员ID" min-width="120" align="center" prop="member_id"/>
      <el-table-column label="会员账号" min-width="120" align="center" prop="user_name"/>
      <el-table-column label="订单号" min-width="190" align="center" prop="order_no"/>
      <el-table-column label="支付平台" min-width="120" align="center" prop="platform_name"/>
      <el-table-column label="支付通道" min-width="150" align="center" prop="channel_name"/>
      <el-table-column label="费率" min-width="80" align="center" prop="pay_rate_str"/>
      <el-table-column label="成功率" min-width="80" align="center" prop="current_success_rate_str"/>
      <el-table-column label="请求金额" min-width="80" align="center" prop="money"/>
      <el-table-column label="实际金额" min-width="80" align="center" prop="sub_money"/>
      <el-table-column label="订单状态" min-width="80" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="!scope.row.is_patch_order" :style="{color: (status = statusOptions[parseInt(scope.row.status) + 1]).color}">
            {{ status.dictLabel }}
          </span>
          <span v-if="scope.row.is_patch_order" :style="{color: (status = statusOptions[3]).color}">
            {{ status.dictLabel }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="订单时间" min-width="160" align="center" prop="pay_time"/>
      <el-table-column label="更新时间" min-width="160" align="center" prop="update_time"/>
      <el-table-column label="上游订单号" min-width="220" align="center" prop="trade_sn"/>
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
          <el-input v-model="form.member_id" readonly/>
        </el-form-item>
        <el-form-item label="会员账号" prop="user_name">
          <el-input v-model="form.user_name" readonly/>
        </el-form-item>
        <el-form-item label="订单编号" prop="order_no">
          <el-input v-model="form.order_no" readonly/>
        </el-form-item>
        <el-form-item label="支付平台" prop="platform_name">
          <el-input v-model="form.platform_name" readonly/>
        </el-form-item>
        <el-form-item label="支付渠道" prop="channel_name">
          <el-input v-model="form.channel_name" readonly/>
        </el-form-item>
        <el-form-item label="订单时间" prop="pay_time">
          <el-input v-model="form.pay_time" readonly/>
        </el-form-item>
        <el-form-item label="支付状态" prop="status">
          <el-input v-model="form.statusStr" readonly/>
        </el-form-item>
        <el-form-item label="请求金额" prop="money">
          <el-input v-model="form.money" readonly/>
        </el-form-item>
        <el-form-item label="实际到账金额" prop="sub_money">
          <el-input v-model="form.sub_money" type="number" placeholder="请输入实际到账金额"/>
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
        orderByColumn: 'update_time',
        isAsc: 'desc',
        searchValue: null,
        platformId: null,
        searchOrderNo: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        sub_money: [
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
        member_id: null,
        user_name: null,
        order_no: null,
        pay_time: null,
        platform_name: null,
        channel_name: null,
        statusStr: null,
        status: null,
        money: null,
        sub_money: null,
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
            orderNo: this.form.order_no,
            subMoney: this.form.sub_money,
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

    }
  }
}
</script>
