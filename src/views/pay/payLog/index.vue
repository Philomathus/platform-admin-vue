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
      <el-form-item label="会员账号" prop="memberAccount">
        <el-input
          v-model="queryParams.memberAccount"
          placeholder="请输入会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付平台编号" prop="platformId">
        <el-input
          v-model="queryParams.platformId"
          placeholder="请输入支付平台编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付平台名称" prop="platformName">
        <el-input
          v-model="queryParams.platformName"
          placeholder="请输入支付平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付通道编号" prop="channelId">
        <el-input
          v-model="queryParams.channelId"
          placeholder="请输入支付通道编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付通道名称" prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入支付通道名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下单金额" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入下单金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="是否下单成功 1成功 0 失败" prop="success">
        <el-input
          v-model="queryParams.success"
          v-model="queryParams.success"
          placeholder="请输入是否下单成功 1成功 0 失败"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="失败原因" prop="failReason">
        <el-input
          v-model="queryParams.failReason"
          placeholder="请输入失败原因"
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
          v-hasPermi="['pay:payLog:add']"
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
          v-hasPermi="['pay:payLog:edit']"
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
          v-hasPermi="['pay:payLog:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payLog:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="会员编号" align="center" prop="memberId" />
      <el-table-column label="会员账号" align="center" prop="memberAccount" />
      <el-table-column label="支付平台编号" align="center" prop="platformId" />
      <el-table-column label="支付平台名称" align="center" prop="platformName" />
      <el-table-column label="支付通道编号" align="center" prop="channelId" />
      <el-table-column label="支付通道名称" align="center" prop="channelName" />
      <el-table-column label="下单金额" align="center" prop="money" />
      <el-table-column label="是否下单成功 1成功 0 失败" align="center" prop="success" />
      <el-table-column label="失败原因" align="center" prop="failReason" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payLog:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payLog:remove']"
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
        <el-form-item label="会员账号" prop="memberAccount">
          <el-input v-model="form.memberAccount" placeholder="请输入会员账号" />
        </el-form-item>
        <el-form-item label="支付平台编号" prop="platformId">
          <el-input v-model="form.platformId" placeholder="请输入支付平台编号" />
        </el-form-item>
        <el-form-item label="支付平台名称" prop="platformName">
          <el-input v-model="form.platformName" placeholder="请输入支付平台名称" />
        </el-form-item>
        <el-form-item label="支付通道编号" prop="channelId">
          <el-input v-model="form.channelId" placeholder="请输入支付通道编号" />
        </el-form-item>
        <el-form-item label="支付通道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入支付通道名称" />
        </el-form-item>
        <el-form-item label="下单金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入下单金额" />
        </el-form-item>
        <el-form-item label="是否下单成功 1成功 0 失败" prop="success">
          <el-input v-model="form.success" placeholder="请输入是否下单成功 1成功 0 失败" />
        </el-form-item>
        <el-form-item label="失败原因" prop="failReason">
          <el-input v-model="form.failReason" placeholder="请输入失败原因" />
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
import { listPayLog, getPayLog, delPayLog, addPayLog, updatePayLog, exportPayLog } from "@/api/platform-web/pay/payLog/payLog";

export default {
  name: "PayLog",
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
      payLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        memberId: null,
        memberAccount: null,
        platformId: null,
        platformName: null,
        channelId: null,
        channelName: null,
        money: null,
        success: null,
        failReason: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        memberId: [
          { required: true, message: "会员编号不能为空", trigger: "blur" }
        ],
        memberAccount: [
          { required: true, message: "会员账号不能为空", trigger: "blur" }
        ],
        platformId: [
          { required: true, message: "支付平台编号不能为空", trigger: "blur" }
        ],
        platformName: [
          { required: true, message: "支付平台名称不能为空", trigger: "blur" }
        ],
        channelId: [
          { required: true, message: "支付通道编号不能为空", trigger: "blur" }
        ],
        channelName: [
          { required: true, message: "支付通道名称不能为空", trigger: "blur" }
        ],
        money: [
          { required: true, message: "下单金额不能为空", trigger: "blur" }
        ],
        success: [
          { required: true, message: "是否下单成功 1成功 0 失败不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
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
      listPayLog(this.queryParams).then(response => {
        this.payLogList = response.rows;
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
        memberAccount: null,
        platformId: null,
        platformName: null,
        channelId: null,
        channelName: null,
        money: null,
        success: null,
        failReason: null,
        createTime: null
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
      getPayLog(id).then(response => {
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
            updatePayLog(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayLog(this.form).then(response => {
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
          return delPayLog(ids);
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
          return exportPayLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
