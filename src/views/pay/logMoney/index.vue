<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员编号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入会员编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入款备注" prop="type">
        <el-select v-model="queryParams.mark" placeholder="请选择入款备注" clearable size="small">
          <el-option
            v-for="dict in configMoneyOptions"
            :key="dict.val"
            :label="dict.val"
            :value="dict.val"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.createTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择创建时间">
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
          v-hasPermi="['pay:logMoney:add']"
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
          v-hasPermi="['pay:logMoney:edit']"
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
          v-hasPermi="['pay:logMoney:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:logMoney:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="logMoneyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="会员ID" align="center" prop="userId" />
      <el-table-column label="账号" align="center" prop="userName" />
      <el-table-column label="行为类型" align="center" prop="des"  />
      <el-table-column label="备注" :show-overflow-tooltip="true" align="center" prop="mark" />
      <el-table-column label="订单号备注" :show-overflow-tooltip="true" align="center" prop="markorder" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收入" align="center" prop="income" />
      <el-table-column label="支出" align="center" prop="pay" />
      <el-table-column label="余额" align="center" prop="total" />
      <el-table-column label="变化前余额" align="center" prop="totalBefore" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改 会员资金信息对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员编号" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入会员编号" />
        </el-form-item>
        <el-form-item label="账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="变化类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择变化类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="des">
          <el-input v-model="form.des" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input v-model="form.income" placeholder="请输入收入" />
        </el-form-item>
        <el-form-item label="支出" prop="pay">
          <el-input v-model="form.pay" placeholder="请输入支出" />
        </el-form-item>
        <el-form-item label="余额" prop="total">
          <el-input v-model="form.total" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="余额" prop="agent">
          <el-input v-model="form.agent" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="变化前余额" prop="totalBefore">
          <el-input v-model="form.totalBefore" placeholder="请输入变化前余额" />
        </el-form-item>
        <el-form-item label="备注信息" prop="mark">
          <el-input v-model="form.mark" placeholder="请输入备注信息" />
        </el-form-item>
        <el-form-item label="备注订单号" prop="markorder">
          <el-input v-model="form.markorder" placeholder="请输入备注订单号" />
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
import { listLogMoney, getLogMoney, delLogMoney, addLogMoney, updateLogMoney, exportLogMoney ,configMoneydes} from "@/api/platform-web/pay/logMoney/logMoney";


export default {
  name: "LogMoney",
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
      //  会员资金信息表格数据
      logMoneyList: [],
      configMoneyOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 变化类型字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userName: null,
        type: null,
        createTime: null,
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
    configMoneydes().then(response => {
      this.configMoneyOptions = response.data
    })
    this.getDicts("sys_user_sex").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询 会员资金信息列表 */
    getList() {
      this.loading = true;
      listLogMoney(this.queryParams).then(response => {
        this.logMoneyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 变化类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
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
        userId: null,
        userName: null,
        type: null,
        des: null,
        income: null,
        pay: null,
        total: null,
        agent: null,
        createTime: null,
        totalBefore: null,
        mark: null,
        markorder: null
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
      this.title = "添加 会员资金信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLogMoney(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 会员资金信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLogMoney(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLogMoney(this.form).then(response => {
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
      this.$confirm('是否确认删除 会员资金信息编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLogMoney(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有 会员资金信息数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportLogMoney(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
