<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="90px">
      <el-form-item label="订单号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审核日期" prop="updateTime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 27px">
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" id="copy1" >交易笔数: {{this.data.countNumber}}</el-button>
    <el-button type="success" id="copy2" >总汇款金额: {{this.data.countMoney}}</el-button>

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

    <el-table :stripe="true" v-loading="loading" :data="payAgentRechargeAccountLogList" @selection-change="handleSelectionChange">
      <el-table-column label="复制" align="center" >
        <template slot-scope="scope">
          <el-button
            type="primary" size="mini"
            @click="handleCopy(scope.row)"
          >复制
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="订单号" :show-overflow-tooltip="true" width="180px" align="center" prop="orderNo" />
      <el-table-column label="代充人账号" align="center" prop="account" />
      <el-table-column label="代充人昵称" align="center" prop="nickName" />
      <el-table-column label="汇款银行卡ID" align="center" prop="bankId" />
      <el-table-column label="汇款金额" align="center" prop="rechargeMoney" />
      <el-table-column label="实际到账金额" align="center" prop="subMoney" />
      <el-table-column label="汇款姓名" align="center" prop="rechargeRealName" />
      <el-table-column label="汇款备注" :show-overflow-tooltip="true" align="center" prop="remark" />
      <el-table-column label="状态" align="center" prop="status"  >
        <template slot-scope="scope">
          <span
            :style="{color: (status = statusOptions[parseInt(scope.row.status)]).color}"
          >{{ status.dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width " fixed="right" width="180px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 0"
            icon="el-icon-lock"
            @click="handleLock(scope.row)"
            v-has-permi="['pay:payAgentRechargeAccountLog:lock']"
          >锁定
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 1"
            icon="el-icon-unlock"
            @click="handleUnlock(scope.row)"
            v-has-permi="['pay:payAgentRechargeAccountLog:unlock']"
          >解锁
          </el-button>
          <el-button
            size="mini"
            type="text"
            style=" color: #5FB878"
            v-if="scope.row.status == 1"
            icon="el-icon-circle-check"
            @click="handleWithdraw(scope.row)"
            v-has-permi="['pay:payAgentRechargeAccountLog:artificial']"
          >存入
          </el-button>
          <el-button
            size="mini"
            type="text"
            style=" color: #FF5722"
            v-if="scope.row.status < 2 || scope.row.status == 4"
            icon="el-icon-circle-close"
            @click="handleRefused(scope.row)"
            v-has-permi="['pay:payAgentRechargeAccountLog:refused']"
          >拒绝
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

    <!-- 添加或修改代充人入款对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules"  label-width="120px">
        <el-form-item label="订单号"  prop="account">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" readonly />
        </el-form-item>
        <el-form-item label="代充人账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充人账号"  readonly/>
        </el-form-item>
        <el-form-item label="代充人昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入代充人昵称" readonly />
        </el-form-item>
        <el-form-item label="汇款银行卡ID" prop="bankId">
          <el-input v-model="form.bankId" placeholder="请输入汇款银行卡ID" readonly />
        </el-form-item>
        <el-form-item label="汇款金额" prop="rechargeMoney">
          <el-input v-model="form.rechargeMoney" placeholder="请输入汇款金额" readonly />
        </el-form-item>
        <el-form-item label="实际到账金额" prop="subMoney">
          <el-input v-model="form.subMoney" placeholder="请输入实际到账金额" readonly/>
        </el-form-item>
        <el-form-item label="汇款姓名" prop="rechargeRealName">
          <el-input v-model="form.rechargeRealName" placeholder="请输入汇款姓名" readonly />
        </el-form-item>
        <el-form-item label="汇款备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入汇款备注"  readonly/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="success"
          plain size="mini"
          @click="handleArtificialWithdraw"
          v-has-permi="['pay:payAgentRechargeAccountLog:artificial']"
        >存入
        </el-button>
        <el-button
          type="danger"
          plain
          size="mini"
          @click="handleDialogRefused"
          v-has-permi="['pay:payAgentRechargeAccountLog:refused']"
        >拒 绝
        </el-button>
        <el-button
          type="info"
          plain
          size="mini"
          @click="cancel"
        >取 消
        </el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPayAgentRechargeAccountLog, getPayAgentRechargeAccountLog, delPayAgentRechargeAccountLog, addPayAgentRechargeAccountLog, agentStatistic,updatePayAgentRechargeAccountLog, exportPayAgentRechargeAccountLog ,lockPayAgentRechargeAccountLog,unlockPayAgentRechargeAccountLog,artificialPayAgentRechargeAccountLog,refusedPayAgentRechargeAccountLog} from "@/api/platform-web/pay/payAgentRechargeAccountLog";




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
      // 日期范围
      dateRange: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      data: {},
      // 代充人入款表格数据
      payAgentRechargeAccountLogList: [],
      // 弹出层标题
      title: "代充人入款",
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderNo: null,
        account: null,
        nickName: null,
        status: null,
        updateTime: null,
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
          { required: true, message: "状态不能为空", trigger: "change" }
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
    this.statistic();
    this.getDicts("recharge_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询代充人入款列表 */
    getList() {
      this.loading = true;
      listPayAgentRechargeAccountLog(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.payAgentRechargeAccountLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    statistic() {
      this.loading = true;
      agentStatistic(this.queryParams).then(response => {
        this.data= response.data;
        this.loading = false;
      });
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
        status: null,
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
      this.statistic();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
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
      this.title = "添加代充人入款";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const orderNo = row.orderNo || this.ids
      getPayAgentRechargeAccountLog(orderNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代充人入款";
      });
    },
    /** 复制按钮 */
    handleCopy(row){
      var status=this.statusOptions[parseInt(row.status)];
      var textarea = document.createElement("textarea");
      let html = '<table><tr>'
      html += '<td>' + row.orderNo + '</td>'
      html += '<td>' + row.account + '</td>'
      html += '<td>' + row.nickName + '</td>'
      html += '<td>' + row.bankId + '</td>'
      html += '<td>' + row.rechargeMoney + '</td>'
      html += '<td>' + row.subMoney + '</td>'
      html += '<td>' + row.rechargeRealName + '</td>'
      html += '<td>' + row.remark + '</td>'
      html += '<td>' + status.dictLabel + '</td>'
      html += '<td>' + row.createTime + '</td>'
      html += '<td>' + row.updateTime  + '</td>'
      html += '</tr></table>'
      textarea.value = html;
      console.info(html)
      this.copyData = html
      this.copy(this.copyData)
    },
    copy(data){
      let url = data;
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      });
      oInput.remove()
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
      this.$confirm('是否确认删除代充人入款编号为"' + orderNos + '"的数据项?', "警告", {
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
      this.$confirm('是否确认导出所有代充人入款数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportPayAgentRechargeAccountLog(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    },
    handleWithdraw(row) {
      this.reset()
      const orderNo = row.orderNo
      getPayAgentRechargeAccountLog(orderNo).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "存入明细";
      })
    },



    handleArtificialWithdraw() {
      artificialPayAgentRechargeAccountLog({
        orderNo: this.form.orderNo
      }).then(response => {
        this.msgSuccess(response.msg)
        if (response.code == 200) {
          this.open = false
          this.getList()
        }
      })
    },
    promptRefused(orderNo) {
      this.$prompt(null, '请输入拒绝原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        refusedPayAgentRechargeAccountLog({
          orderNo: orderNo,
          remark: value
        }).then(response => {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        })
      }).catch(() => {
      })
    },
    handleRefused(row) {
      this.promptRefused(row.orderNo)
    },
    handleDialogRefused() {
      this.promptRefused(this.form.orderNo)
    },
    handleLock(row) {
      lockPayAgentRechargeAccountLog({
        orderNo: row.orderNo
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },
    handleUnlock(row) {
      unlockPayAgentRechargeAccountLog({
        orderNo: row.orderNo
      }).then(response => {
        this.msgSuccess(response.msg)
        this.getList()
      })
    },
  }
};
</script>
