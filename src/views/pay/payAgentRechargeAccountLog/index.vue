<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代充人账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入代充人账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代充人昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入代充人昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇款银行卡ID" prop="bankId">
        <el-input
          v-model="queryParams.bankId"
          placeholder="请输入汇款银行卡ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇款金额" prop="rechargeMoney">
        <el-input
          v-model="queryParams.rechargeMoney"
          placeholder="请输入汇款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际到账金额" prop="subMoney">
        <el-input
          v-model="queryParams.subMoney"
          placeholder="请输入实际到账金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇款姓名" prop="rechargeRealName">
        <el-input
          v-model="queryParams.rechargeRealName"
          placeholder="请输入汇款姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态(0已提交1锁定2已拒绝3已存入4存入失败)" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态(0已提交1锁定2已拒绝3已存入4存入失败)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="审核人" prop="opName">
        <el-input
          v-model="queryParams.opName"
          placeholder="请输入审核人"
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
          v-hasPermi="['pay:payAgentRechargeAccountLog:add']"
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
          v-hasPermi="['pay:payAgentRechargeAccountLog:edit']"
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
          v-hasPermi="['pay:payAgentRechargeAccountLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentRechargeAccountLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payAgentRechargeAccountLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单号主键" align="center" prop="orderNo" />
      <el-table-column label="代充人账号" align="center" prop="account" />
      <el-table-column label="代充人昵称" align="center" prop="nickName" />
      <el-table-column label="汇款银行卡ID" align="center" prop="bankId" />
      <el-table-column label="汇款金额" align="center" prop="rechargeMoney" />
      <el-table-column label="实际到账金额" align="center" prop="subMoney" />
      <el-table-column label="汇款姓名" align="center" prop="rechargeRealName" />
      <el-table-column label="汇款备注" align="center" prop="remark" />
      <el-table-column label="状态(0已提交1锁定2已拒绝3已存入4存入失败)" align="center" prop="status" />
      <el-table-column label="审核人" align="center" prop="opName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccountLog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccountLog:remove']"
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
        <el-form-item label="代充人账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充人账号" />
        </el-form-item>
        <el-form-item label="代充人昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入代充人昵称" />
        </el-form-item>
        <el-form-item label="汇款银行卡ID" prop="bankId">
          <el-input v-model="form.bankId" placeholder="请输入汇款银行卡ID" />
        </el-form-item>
        <el-form-item label="汇款金额" prop="rechargeMoney">
          <el-input v-model="form.rechargeMoney" placeholder="请输入汇款金额" />
        </el-form-item>
        <el-form-item label="实际到账金额" prop="subMoney">
          <el-input v-model="form.subMoney" placeholder="请输入实际到账金额" />
        </el-form-item>
        <el-form-item label="汇款姓名" prop="rechargeRealName">
          <el-input v-model="form.rechargeRealName" placeholder="请输入汇款姓名" />
        </el-form-item>
        <el-form-item label="汇款备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入汇款备注" />
        </el-form-item>
        <el-form-item label="状态(0已提交1锁定2已拒绝3已存入4存入失败)">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核人" prop="opName">
          <el-input v-model="form.opName" placeholder="请输入审核人" />
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
import { listPayAgentRechargeAccountLog, getPayAgentRechargeAccountLog, delPayAgentRechargeAccountLog, addPayAgentRechargeAccountLog, updatePayAgentRechargeAccountLog, exportPayAgentRechargeAccountLog } from "@/api/platform-web/pay/payAgentRechargeAccountLog/payAgentRechargeAccountLog";

export default {
  name: "PayAgentRechargeAccountLog",
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
      payAgentRechargeAccountLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        account: null,
        nickName: null,
        bankId: null,
        rechargeMoney: null,
        subMoney: null,
        rechargeRealName: null,
        status: null,
        opName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [
          { required: true, message: "代充人账号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "代充人昵称不能为空", trigger: "blur" }
        ],
        bankId: [
          { required: true, message: "汇款银行卡ID不能为空", trigger: "blur" }
        ],
        rechargeMoney: [
          { required: true, message: "汇款金额不能为空", trigger: "blur" }
        ],
        subMoney: [
          { required: true, message: "实际到账金额不能为空", trigger: "blur" }
        ],
        rechargeRealName: [
          { required: true, message: "汇款姓名不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态(0已提交1锁定2已拒绝3已存入4存入失败)不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "提交时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "审核时间不能为空", trigger: "blur" }
        ],
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
      listPayAgentRechargeAccountLog(this.queryParams).then(response => {
        this.payAgentRechargeAccountLogList = response.rows;
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
        orderNo: null,
        account: null,
        nickName: null,
        bankId: null,
        rechargeMoney: null,
        subMoney: null,
        rechargeRealName: null,
        remark: null,
        status: 0,
        createTime: null,
        updateTime: null,
        opName: null
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
      this.ids = selection.map(item => item.orderNo)
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
      const orderNo = row.orderNo || this.ids
      getPayAgentRechargeAccountLog(orderNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.orderNo != null) {
            updatePayAgentRechargeAccountLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentRechargeAccountLog(this.form).then(response => {
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
      const orderNos = row.orderNo || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + orderNos + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPayAgentRechargeAccountLog(orderNos);
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
          return exportPayAgentRechargeAccountLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
