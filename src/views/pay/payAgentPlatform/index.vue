<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代付平台" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入代付平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="下单地址" prop="payOrderAddr">
        <el-input
          v-model="queryParams.payOrderAddr"
          placeholder="请输入代付下单地址"
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
          v-hasPermi="['pay:payAgentPlatform:add']"
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
          v-hasPermi="['pay:payAgentPlatform:edit']"
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
          v-hasPermi="['pay:payAgentPlatform:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payAgentPlatform:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payAgentPlatformList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" width="55" />
      <el-table-column label="编码" align="center" prop="code" width="90" />
      <el-table-column label="代付平台名称" align="center" prop="name" />
      <el-table-column label="商户ID" align="center" prop="merId"  width="150"/>
      <el-table-column label="代付下单地址" :show-overflow-tooltip="true" align="center" prop="payOrderAddr" />
      <el-table-column label="代付查询地址" :show-overflow-tooltip="true"  align="center" prop="payOrderQueryAddr" />
      <el-table-column label="状态" align="center" prop="status" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payAgentPlatform:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payAgentPlatform:remove']"
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

    <!-- 添加或修改代付平台列表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="770px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入自定义编码" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入代付平台名称" />
        </el-form-item>
        <el-form-item label="商户ID" prop="merId">
          <el-input v-model.trim="form.merId" placeholder="请输入商户ID" />
        </el-form-item>
        <el-form-item label="代付下单地址" prop="payOrderAddr">
          <el-input v-model.trim="form.payOrderAddr"  placeholder="请输入代付下单地址" />
        </el-form-item>
        <el-form-item label="代付查询地址" prop="payOrderQueryAddr">
          <el-input v-model.trim="form.payOrderQueryAddr" placeholder="请输入代付查询地址" />
        </el-form-item>
        <el-form-item label="header_key" prop="headerKey">
          <el-input v-model.trim="form.headerKey" placeholder="请输入header_key" />
        </el-form-item>
        <el-form-item label="MD5_key" prop="signMd5">
          <el-input v-model.trim="form.signMd5" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="加密公钥" prop="signPublicKey">
          <el-input v-model.trim="form.signPublicKey" type="textarea"  placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="解密私钥" prop="signPrivateKey">
          <el-input v-model.trim="form.signPrivateKey" type="textarea"  placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="平台IP白名单" prop="platWhiteIpList">
          <el-input v-model.trim="form.platWhiteIpList" type="textarea" placeholder="多个IP使用英文逗号','分割" />
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
import { listPayAgentPlatform, getPayAgentPlatform, delPayAgentPlatform, addPayAgentPlatform, updatePayAgentPlatform, exportPayAgentPlatform,changePayAgentStatus } from "@/api/platform-web/pay/payAgentPlatform";


export default {
  name: "PayAgentPlatform",
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
      // 代付平台列表表格数据
      payAgentPlatformList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null,
        payOrderAddr: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          { required: true, message: "自定义编码不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "代付平台名称不能为空", trigger: "blur" }
        ],
        merId: [
          { required: true, message: "商户ID不能为空", trigger: "blur" }
        ],
        payOrderAddr: [
          { required: true, message: "代付下单地址不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("game_type_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询代付平台列表列表 */
    getList() {
      this.loading = true;
      listPayAgentPlatform(this.queryParams).then(response => {
        this.payAgentPlatformList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return changePayAgentStatus(row.id, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
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
        code: null,
        name: null,
        merId: null,
        payOrderAddr: null,
        payOrderQueryAddr: null,
        headerKey: null,
        signMd5: null,
        signPublicKey: null,
        signPrivateKey: null,
        platWhiteIpList: null,
        status: null
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
      this.title = "添加代付平台列表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayAgentPlatform(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改代付平台列表";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayAgentPlatform(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayAgentPlatform(this.form).then(response => {
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
      this.$confirm('是否确认删除代付平台列表编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delPayAgentPlatform(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有代付平台列表数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportPayAgentPlatform(queryParams);
      }).then(response => {
        this.downloadExcel(response, '代付平台')
      }).catch(() => {
      })
    }
  }
};
</script>
