<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员编号" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现金额" prop="withdrawMoney">
        <el-input
          v-model="queryParams.withdrawMoney"
          placeholder="请输入提现金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行编码" prop="bankCode">
        <el-input
          v-model="queryParams.bankCode"
          placeholder="请输入银行编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现银行" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入提现银行"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现账号" prop="bankAccount">
        <el-input
          v-model="queryParams.bankAccount"
          placeholder="请输入提现账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开户地" prop="bankAddress">
        <el-input
          v-model="queryParams.bankAddress"
          placeholder="请输入开户地"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款人" prop="bankUserName">
        <el-input
          v-model="queryParams.bankUserName"
          placeholder="请输入收款人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="提现类型(1提现到银行卡 2代付下单)" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择提现类型(1提现到银行卡 2代付下单)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="操作人" prop="opName">
        <el-input
          v-model="queryParams.opName"
          placeholder="请输入操作人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否首次1是0否" prop="first">
        <el-input
          v-model="queryParams.first"
          placeholder="请输入是否首次1是0否"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入款出款比" prop="rechargeWithdrawRate">
        <el-input
          v-model="queryParams.rechargeWithdrawRate"
          placeholder="请输入入款出款比"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['pay:memberWithdrawLog:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['pay:memberWithdrawLog:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['pay:memberWithdrawLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:memberWithdrawLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberWithdrawLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="系统编号" align="center" prop="id" />
      <el-table-column label="会员编号" align="center" prop="memberId" />
      <el-table-column label="提现金额" align="center" prop="withdrawMoney" />
      <el-table-column label="银行编码" align="center" prop="bankCode" />
      <el-table-column label="提现银行" align="center" prop="bankName" />
      <el-table-column label="提现账号" align="center" prop="bankAccount" />
      <el-table-column label="开户地" align="center" prop="bankAddress" />
      <el-table-column label="收款人" align="center" prop="bankUserName" />
      <el-table-column label="状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)" align="center" prop="status" />
      <el-table-column label="提现类型(1提现到银行卡 2代付下单)" align="center" prop="type" />
      <el-table-column label="操作人" align="center" prop="opName" />
      <el-table-column label="订单号" align="center" prop="orderNo" />
      <el-table-column label="审核备注" align="center" prop="remark" />
      <el-table-column label="账号" align="center" prop="account" />
      <el-table-column label="是否首次1是0否" align="center" prop="first" />
      <el-table-column label="入款出款比" align="center" prop="rechargeWithdrawRate" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:memberWithdrawLog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:memberWithdrawLog:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="提现金额" prop="withdrawMoney">
          <el-input v-model="form.withdrawMoney" placeholder="请输入提现金额" />
        </el-form-item>
        <el-form-item label="银行编码" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行编码" />
        </el-form-item>
        <el-form-item label="提现银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入提现银行" />
        </el-form-item>
        <el-form-item label="提现账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="请输入提现账号" />
        </el-form-item>
        <el-form-item label="开户地" prop="bankAddress">
          <el-input v-model="form.bankAddress" placeholder="请输入开户地" />
        </el-form-item>
        <el-form-item label="收款人" prop="bankUserName">
          <el-input v-model="form.bankUserName" placeholder="请输入收款人" />
        </el-form-item>
        <el-form-item label="状态(0申请中1锁定2审核不通过3人工入款成功 4代付中5代付失败6代付成功)">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提现类型(1提现到银行卡 2代付下单)" prop="type">
          <el-select v-model="form.type" placeholder="请选择提现类型(1提现到银行卡 2代付下单)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人" prop="opName">
          <el-input v-model="form.opName" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="审核备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入审核备注" />
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="是否首次1是0否" prop="first">
          <el-input v-model="form.first" placeholder="请输入是否首次1是0否" />
        </el-form-item>
        <el-form-item label="入款出款比" prop="rechargeWithdrawRate">
          <el-input v-model="form.rechargeWithdrawRate" placeholder="请输入入款出款比" />
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
import { listMemberWithdrawLog, getMemberWithdrawLog, delMemberWithdrawLog, addMemberWithdrawLog, updateMemberWithdrawLog, exportMemberWithdrawLog } from "@/api/platform-web/pay/memberWithdrawLog/memberWithdrawLog";

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
      // 【请填写功能名称】表格数据
      memberWithdrawLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        withdrawMoney: null,
        bankCode: null,
        bankName: null,
        bankAccount: null,
        bankAddress: null,
        bankUserName: null,
        status: null,
        type: null,
        opName: null,
        orderNo: null,
        account: null,
        first: null,
        rechargeWithdrawRate: null
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
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listMemberWithdrawLog(this.queryParams).then(response => {
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
        status: 0,
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getMemberWithdrawLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMemberWithdrawLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMemberWithdrawLog(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delMemberWithdrawLog(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportMemberWithdrawLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
