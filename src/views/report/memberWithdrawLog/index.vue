<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item prop="searchTime">
        <el-date-picker type="datetimerange" v-model="queryParams.searchTime" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" range-separator="至" :default-time="['00:00:00', '23:59:59']" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberWithdrawLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="审核人" align="center" prop="opName" />
      <el-table-column label="审核总提现金额" align="center" prop="money" />
      <el-table-column label="状态" align="center" prop="statusName" />
      <el-table-column label="审核次数" align="center" prop="times"  />
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
import { memberWithdrawLogCount } from "@/api/platform-web/pay/memberWithdrawLog";
import { pickerDateTimeShortcuts } from '@/utils/dateUtils'

export default {
  name: "MemberWithdrawLog",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 会员提现信息表格数据
      memberWithdrawLogList: [],
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)字典
      statusOptions: [],
      // 是否首次1是0否字典
      firstOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        withdrawMoney: null,
        bankAccount: null,
        bankUserName: null,
        searchTime: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        status: null,
        updateTime: null,
        orderNo: null,
        account: null,
        orderByColumn: 'opName',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询会员提现信息列表 */
    getList() {
      this.loading = true;

      memberWithdrawLogCount(this.queryParams).then(response => {
        this.memberWithdrawLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        memberId: null,
        withdrawMoney: null,
        bankCode: null,
        bankName: null,
        bankAccount: null,
        bankAddress: null,
        bankUserName: null,
        status: null,
        type: null,
        createTime: null,
        opName: null,
        updateTime: null,
        orderNo: null,
        remark: null,
        account: null,
        first: null,
        rechargeWithdrawRate: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>
