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
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入手机号"
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
          v-hasPermi="['pay:payAgentRechargeAccount:add']"
        >新增
        </el-button>
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
        >修改
        </el-button>
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
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentRechargeAccount:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payAgentRechargeAccountList"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="代充账号" align="center" prop="account" width="130"/>
      <el-table-column label="代充昵称" align="center" prop="nickName" :show-overflow-tooltip="true" width="120"/>
      <el-table-column label="当前余额额度" align="center" prop="balanceAmount" width="100"/>
      <el-table-column label="代充次数" align="center" prop="rechargeNum"/>
      <el-table-column label="QQ号" align="center" prop="qqAccount" width="100"/>
      <el-table-column label="微信号" align="center" prop="wechatAccount" width="120"/>
      <el-table-column label="支付宝账号" align="center" prop="alipayAccount" :show-overflow-tooltip="true" width="160"/>
      <el-table-column label="手机号" align="center" prop="mobile" width="110"/>
      <el-table-column label="开店时间" align="center" prop="businessBeginTime" width="110">
        <!--        <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.businessBeginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>-->
      </el-table-column>
      <el-table-column label="关店时间" align="center" prop="businessEndTime" width="110">
        <!--        <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.businessEndTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </template>-->
      </el-table-column>
      <el-table-column label="充值优惠比例" align="center" prop="rechargeDiscountRate" width="100"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="显示状态" align="center" prop="showStatus">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            active-value="1"
            inactive-value="0"
            @change="handleShowStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录时间" align="center" prop="beforeLoginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.beforeLoginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本次登录时间" align="center" prop="loginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="220px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccount:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-refresh-right"
            @click="updateGoogleAuth(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccount:reset']"
          >重置秘钥
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentRechargeAccount:remove']"
          >删除
          </el-button>
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

    <!-- 未绑定谷歌验证码弹框 -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="重置谷歌验证码"
      :visible.sync="dialogVisible"
      width="15%"
      @keyup.enter.native="getGoogleAuth"
    >
      <img :src="pic" width="100%" alt="绑定谷歌验证码"/>
      <!--      <el-input v-model="userName" v-show="false"/>-->
      <el-input v-model="secretKey" v-show="false"/>
      <el-input
        placeholder="请输入谷歌验证码"
        v-model="googleAuthCode"
        style="width: 70%"
      />
      <el-button type="primary" @click="bind">绑定</el-button>
    </el-dialog>

    <!-- 添加或修改代充人管理对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="代充账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充账号" v-if="form.id == null"/>
          <el-input v-model="form.account" placeholder="请输入代充账号" v-if="form.id != null" readonly/>
        </el-form-item>
        <el-form-item label="代充昵称" prop="nickName" v-if="form.id != null">
          <el-input v-model="form.nickName" placeholder="请输入代充昵称"/>
        </el-form-item>
        <el-form-item label="QQ号" prop="qqAccount">
          <el-input v-model="form.qqAccount" placeholder="请输入QQ号"/>
        </el-form-item>
        <el-form-item label="微信号" prop="wechatAccount">
          <el-input v-model="form.wechatAccount" placeholder="请输入微信号或微信注册手机号"/>
        </el-form-item>
        <el-form-item label="支付宝账号" prop="alipayAccount">
          <el-input v-model="form.alipayAccount" placeholder="请输入支付宝账号或支付宝注册手机号"/>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="开店时间" prop="businessBeginTime">
          <el-time-picker
            arrow-control
            v-model="form.businessBeginTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="关店时间" prop="businessEndTime">
          <el-time-picker
            arrow-control
            v-model="form.businessEndTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="充值优惠比例" prop="rechargeDiscountRate">
          <el-input v-model="form.rechargeDiscountRate" placeholder="请输入充值优惠比例"/>
        </el-form-item>
        <el-form-item label="状态" prop="status" v-if="form.id == null">
          <el-radio-group v-model="form.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">拉黑</el-radio>
          </el-radio-group>
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
  listPayAgentRechargeAccount, getPayAgentRechargeAccount,
  delPayAgentRechargeAccount, addPayAgentRechargeAccount, updatePayAgentRechargeAccount,
  exportPayAgentRechargeAccount, changeStatus, changeShowStatus
} from "@/api/platform-web/pay/payAgentRechargeAccount";
import {bindGoogleAuth2, getGoogleAuth2, updateGoogleAuth} from "@/api/platform-web/system/user";


export default {
  name: "PayAgentRechargeAccount",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      //显示弹窗
      dialogVisible: false,
      //秘钥
      secretKey: null,
      //谷歌验证码
      googleAuthCode: null,
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
      // 代充人管理表格数据
      payAgentRechargeAccountList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      //图片
      pic: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        account: null,
        nickName: null,
        mobile: null,
        orderByColumn: 'create_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [
          {required: true, message: "代充账号不能为空", trigger: "blur"}
        ],
        balanceAmount: [
          {required: true, message: "当前余额额度不能为空", trigger: "blur"}
        ],
        rechargeNum: [
          {required: true, message: "代充次数不能为空", trigger: "blur"}
        ],
        mobile: [
          {required: true, message: "手机号不能为空", trigger: "blur"}
        ],
        businessBeginTime: [
          {required: true, message: "开店时间不能为空", trigger: "blur"}
        ],
        businessEndTime: [
          {required: true, message: "关店时间不能为空", trigger: "blur"}
        ],
        rechargeDiscountRate: [
          {required: true, message: "充值优惠比例不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "change"}
        ],
        createTime: [
          {required: true, message: "注册时间不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("recharge_account_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    updateGoogleAuth(row) {
      this.$prompt('请输入谷歌验证码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '谷歌验证码必须为6位数字'
      }).then(({value}) => {
        updateGoogleAuth(row.id, value).then(response => {
          if(response.data.code == 0 ){
            this.msgError(response.data.msg)
          }else {
            this.$notify.success("重置成功")
          }
        })
      })
    },
    //获取谷歌验证码二维码
    showOrder(row) {
      this.userName = row.id
      this.dialogVisible = true
      const name = row.id
      getGoogleAuth2(name).then(response => {
        this.pic = 'data:image/png;base64,' + response.data.qrBarcodeBase
        this.secretKey = response.data.secretKey
      })
    },
    /** 谷歌验证码绑定按钮 */
    bind() {
      bindGoogleAuth2(this.userName, this.secretKey, this.googleAuthCode).then(response => {
        if (response.code === 200) {
          this.msgSuccess('绑定成功')
          this.dialogVisible = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      })
    },

    /** 查询代充人管理列表 */
    getList() {
      this.loading = true;
      listPayAgentRechargeAccount(this.queryParams).then(response => {
        this.payAgentRechargeAccountList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.account + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return changeStatus(row.id, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    //显示状态修改
    handleShowStatusChange(row) {
      let text = row.showStatus === "1" ? "显示" : "隐藏";
      this.$confirm('确认要"' + text + '""' + row.account + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return changeShowStatus(row.id, row.showStatus);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function () {
        row.showStatus = row.showStatus === "0" ? "1" : "0";
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
        businessBeginTime: '00:00:00',
        businessEndTime: '23:59:59',
        rechargeDiscountRate: null,
        status: '1',
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加代充人管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayAgentRechargeAccount(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代充人管理";
      });
    },
    /** 修改按钮操作 */
    resetGooglePassword(row) {
      this.reset();
      const id = row.id || this.ids
      getPayAgentRechargeAccount(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代充人管理";
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
      this.$confirm('是否确认删除代充人管理编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayAgentRechargeAccount(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有代充人管理数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportPayAgentRechargeAccount(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
