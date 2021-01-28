<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代充账号" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入代充账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代充昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入代充昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前余额额度" prop="balanceAmount">
        <el-input
          v-model="queryParams.balanceAmount"
          placeholder="请输入当前余额额度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代充次数" prop="rechargeNum">
        <el-input
          v-model="queryParams.rechargeNum"
          placeholder="请输入代充次数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="QQ号" prop="qqAccount">
        <el-input
          v-model="queryParams.qqAccount"
          placeholder="请输入QQ号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信号或微信注册手机号" prop="wechatAccount">
        <el-input
          v-model="queryParams.wechatAccount"
          placeholder="请输入微信号或微信注册手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付宝账号或支付宝注册手机号" prop="alipayAccount">
        <el-input
          v-model="queryParams.alipayAccount"
          placeholder="请输入支付宝账号或支付宝注册手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开店时间" prop="businessBeginTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.businessBeginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开店时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关店时间" prop="businessEndTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.businessEndTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择关店时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="充值优惠比例" prop="rechargeDiscountRate">
        <el-input
          v-model="queryParams.rechargeDiscountRate"
          placeholder="请输入充值优惠比例"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态 1正常 0拉黑" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态 1正常 0拉黑" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="上次登录时间" prop="beforeLoginTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.beforeLoginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择上次登录时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="本次登录时间" prop="loginTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.loginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择本次登录时间">
        </el-date-picker>
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
          v-hasPermi="['pay:payAgentRechargeAccount:add']"
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
          v-hasPermi="['pay:payAgentRechargeAccount:edit']"
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
          v-hasPermi="['pay:payAgentRechargeAccount:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentRechargeAccount:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payAgentRechargeAccountList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="代充账号" align="center" prop="account" />
      <el-table-column label="代充昵称" align="center" prop="nickName" />
      <el-table-column label="当前余额额度" align="center" prop="balanceAmount" />
      <el-table-column label="代充次数" align="center" prop="rechargeNum" />
      <el-table-column label="QQ号" align="center" prop="qqAccount" />
      <el-table-column label="微信号或微信注册手机号" align="center" prop="wechatAccount" />
      <el-table-column label="支付宝账号或支付宝注册手机号" align="center" prop="alipayAccount" />
      <el-table-column label="手机号" align="center" prop="mobile" />
      <el-table-column label="开店时间" align="center" prop="businessBeginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessBeginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关店时间" align="center" prop="businessEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.businessEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值优惠比例" align="center" prop="rechargeDiscountRate" />
      <el-table-column label="状态 1正常 0拉黑" align="center" prop="status" />
      <el-table-column label="上次登录时间" align="center" prop="beforeLoginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beforeLoginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本次登录时间" align="center" prop="loginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccount:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccount:remove']"
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
        <el-form-item label="代充账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充账号" />
        </el-form-item>
        <el-form-item label="代充昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入代充昵称" />
        </el-form-item>
        <el-form-item label="当前余额额度" prop="balanceAmount">
          <el-input v-model="form.balanceAmount" placeholder="请输入当前余额额度" />
        </el-form-item>
        <el-form-item label="代充次数" prop="rechargeNum">
          <el-input v-model="form.rechargeNum" placeholder="请输入代充次数" />
        </el-form-item>
        <el-form-item label="QQ号" prop="qqAccount">
          <el-input v-model="form.qqAccount" placeholder="请输入QQ号" />
        </el-form-item>
        <el-form-item label="微信号或微信注册手机号" prop="wechatAccount">
          <el-input v-model="form.wechatAccount" placeholder="请输入微信号或微信注册手机号" />
        </el-form-item>
        <el-form-item label="支付宝账号或支付宝注册手机号" prop="alipayAccount">
          <el-input v-model="form.alipayAccount" placeholder="请输入支付宝账号或支付宝注册手机号" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="开店时间" prop="businessBeginTime">
          <el-date-picker clearable size="small"
            v-model="form.businessBeginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开店时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="关店时间" prop="businessEndTime">
          <el-date-picker clearable size="small"
            v-model="form.businessEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择关店时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="充值优惠比例" prop="rechargeDiscountRate">
          <el-input v-model="form.rechargeDiscountRate" placeholder="请输入充值优惠比例" />
        </el-form-item>
        <el-form-item label="状态 1正常 0拉黑">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上次登录时间" prop="beforeLoginTime">
          <el-date-picker clearable size="small"
            v-model="form.beforeLoginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择上次登录时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="本次登录时间" prop="loginTime">
          <el-date-picker clearable size="small"
            v-model="form.loginTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择本次登录时间">
          </el-date-picker>
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
import { listPayAgentRechargeAccount, getPayAgentRechargeAccount, delPayAgentRechargeAccount, addPayAgentRechargeAccount, updatePayAgentRechargeAccount, exportPayAgentRechargeAccount } from "@/api/platform-web/pay/payAgentRechargeAccount/payAgentRechargeAccount";

export default {
  name: "PayAgentRechargeAccount",
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
      payAgentRechargeAccountList: [],
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
        balanceAmount: null,
        rechargeNum: null,
        qqAccount: null,
        wechatAccount: null,
        alipayAccount: null,
        mobile: null,
        businessBeginTime: null,
        businessEndTime: null,
        rechargeDiscountRate: null,
        status: null,
        beforeLoginTime: null,
        loginTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [
          { required: true, message: "代充账号不能为空", trigger: "blur" }
        ],
        balanceAmount: [
          { required: true, message: "当前余额额度不能为空", trigger: "blur" }
        ],
        rechargeNum: [
          { required: true, message: "代充次数不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        rechargeDiscountRate: [
          { required: true, message: "充值优惠比例不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态 1正常 0拉黑不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "注册时间不能为空", trigger: "blur" }
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
      listPayAgentRechargeAccount(this.queryParams).then(response => {
        this.payAgentRechargeAccountList = response.rows;
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
        account: null,
        nickName: null,
        balanceAmount: null,
        rechargeNum: null,
        qqAccount: null,
        wechatAccount: null,
        alipayAccount: null,
        mobile: null,
        businessBeginTime: null,
        businessEndTime: null,
        rechargeDiscountRate: null,
        status: 0,
        createTime: null,
        beforeLoginTime: null,
        loginTime: null
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
      getPayAgentRechargeAccount(id).then(response => {
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
            updatePayAgentRechargeAccount(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentRechargeAccount(this.form).then(response => {
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
          return delPayAgentRechargeAccount(ids);
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
          return exportPayAgentRechargeAccount(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
