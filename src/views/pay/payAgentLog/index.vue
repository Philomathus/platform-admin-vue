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
      <el-form-item label="提交时间" prop="createTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.createTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择提交时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="回调时间" prop="callbackTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.callbackTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择回调时间">
        </el-date-picker>
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['pay:payAgentLog:add']"
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
          v-hasPermi="['pay:payAgentLog:edit']"
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
          v-hasPermi="['pay:payAgentLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payAgentLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="提现订单号" align="center" prop="withdrawOrderNo" />
      <el-table-column label="代付订单号" align="center" prop="payAgentOrderNo" />
      <el-table-column label="代付平台ID" align="center" prop="payAgentPlatId" />
      <el-table-column label="会员ID" align="center" prop="memberId" />
      <el-table-column label="会员账号" align="center" prop="memberAccount" />
      <el-table-column label="提现金额" align="center" prop="withdrawMoney" />
      <el-table-column label="回调时间" align="center" prop="callbackTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.callbackTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回调状态" align="center" prop="callbackStatus" :formatter="callbackStatusFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentLog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentLog:remove']"
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

    <!-- 添加或修改代付下单日志对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPayAgentLog, getPayAgentLog, delPayAgentLog, addPayAgentLog, updatePayAgentLog, exportPayAgentLog ,agents} from "@/api/platform-web/pay/payAgentLog/payAgentLog";


export default {
  name: "PayAgentLog",
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
      // 代付下单日志表格数据
      payAgentLogList: [],
      //代付平台
      payAgentsOptions: [],
      // 弹出层标题
      title: "",
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
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        withdrawOrderNo: [
          { required: true, message: "提现订单号不能为空", trigger: "blur" }
        ],
        payAgentPlatId: [
          { required: true, message: "代付平台ID不能为空", trigger: "change" }
        ],
        payAgentPlatName: [
          { required: true, message: "代付平台名称不能为空", trigger: "blur" }
        ],
        memberId: [
          { required: true, message: "会员ID不能为空", trigger: "blur" }
        ],
        memberAccount: [
          { required: true, message: "会员账号不能为空", trigger: "blur" }
        ],
        withdrawMoney: [
          { required: true, message: "提现金额不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "提交时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    //代付平台
    agents().then(response => {
      this.payAgentsOptions = response.data
    })
    this.getDicts("callback_status").then(response => {
      this.callbackStatusOptions = response.data;
    });
  },
  methods: {
    /** 查询代付下单日志列表 */
    getList() {
      this.loading = true;
      listPayAgentLog(this.queryParams).then(response => {
        this.payAgentLogList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 回调状态字典翻译
    callbackStatusFormat(row, column) {
      return this.selectDictLabel(this.callbackStatusOptions, row.callbackStatus);
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
        withdrawOrderNo: null,
        payAgentOrderNo: null,
        payAgentPlatId: null,
        payAgentPlatName: null,
        memberId: null,
        memberAccount: null,
        withdrawMoney: null,
        createTime: null,
        callbackTime: null,
        callbackStatus: null
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
      this.title = "添加代付下单日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayAgentLog(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代付下单日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayAgentLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentLog(this.form).then(response => {
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
      this.$confirm('是否确认删除代付下单日志编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delPayAgentLog(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有代付下单日志数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportPayAgentLog(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
