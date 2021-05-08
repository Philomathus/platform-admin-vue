<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="平台名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台编码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入平台编码"
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
          v-hasPermi="['pay:payPlatformNew:add']"
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
          v-hasPermi="['pay:payPlatformNew:edit']"
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
          v-hasPermi="['pay:payPlatformNew:remove']"
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
          v-hasPermi="['pay:payPlatformNew:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" v-loading="loading" :data="payPlatformNewList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="平台名称" align="center" prop="name" width="150"/>
      <el-table-column label="平台编码" align="center" prop="code" width="130"/>
      <el-table-column label="平台下单接口地址" :show-overflow-tooltip="true" align="center" prop="platPayUrl"/>
      <el-table-column label="平台订单查询地址" :show-overflow-tooltip="true" align="center" prop="platQueryUrl"/>
      <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payPlatformNew:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payPlatformNew:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【支付平台】对话框 -->
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="770px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="135px">
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="请输入平台名称"/>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model.trim="form.code" placeholder="请输入平台编码"/>
        </el-form-item>
        <el-form-item label="商户ID" prop="merId">
          <el-input v-model.trim="form.merId" placeholder="请输入商户ID"/>
        </el-form-item>
        <el-form-item label="机构号" prop="orgId">
          <el-input v-model.trim="form.orgId" placeholder="请输入机构号"/>
        </el-form-item>
        <el-form-item label="平台下单接口地址" prop="platPayUrl">
          <el-input v-model.trim="form.platPayUrl" placeholder="请输入平台下单接口地址"/>
        </el-form-item>
        <el-form-item label="平台订单查询地址" prop="platQueryUrl">
          <el-input v-model.trim="form.platQueryUrl" placeholder="请输入平台订单查询地址"/>
        </el-form-item>
        <el-form-item label="MD5_key" prop="signMd5">
          <el-input v-model.trim="form.signMd5" placeholder="请输入MD5_key"/>
        </el-form-item>
        <el-form-item label="加密公钥" prop="signPublicKey">
          <el-input v-model.trim="form.signPublicKey" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="解密私钥" prop="signPrivateKey">
          <el-input v-model.trim="form.signPrivateKey" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="平台IP白名单" prop="platWhiteIpList">
          <el-input v-model.trim="form.platWhiteIpList" type="textarea" placeholder="请输入平台IP白名单"/>
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
  listPayPlatformNew,
  getPayPlatformNew,
  delPayPlatformNew,
  addPayPlatformNew,
  updatePayPlatformNew,
  exportPayPlatformNew
} from "@/api/platform-web/pay/payPlatformNew";

export default {
  name: "PayPlatformNew",
  components: {},
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
      // 【支付平台】表格数据
      payPlatformNewList: [],
      // 弹出层标题
      title: "支付平台",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
        code: null,
        merId: null,
        orgId: null,
        platPayUrl: null,
        platQueryUrl: null,
        signMd5: null,
        signPublicKey: null,
        signPrivateKey: null,
        platWhiteIpList: null,
        creator: null,
        updator: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: "平台名称不能为空", trigger: "blur"}
        ],
        code: [
          {required: true, message: "平台编码不能为空", trigger: "blur"}
        ],
        merId: [
          {required: true, message: "商户ID不能为空", trigger: "blur"}
        ],
        platPayUrl: [
          {required: true, message: "平台下单接口地址不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【支付平台】列表 */
    getList() {
      this.loading = true;
      listPayPlatformNew(this.queryParams).then(response => {
        this.payPlatformNewList = response.rows;
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
        name: null,
        code: null,
        merId: null,
        orgId: null,
        platPayUrl: null,
        platQueryUrl: null,
        signMd5: null,
        signPublicKey: null,
        signPrivateKey: null,
        platWhiteIpList: null,
        creator: null,
        createTime: null,
        updator: null,
        updateTime: null
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
      this.title = "添加【支付平台】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayPlatformNew(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【支付平台】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayPlatformNew(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayPlatformNew(this.form).then(response => {
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
      this.$confirm('是否确认删除【支付平台】编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delPayPlatformNew(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportPayPlatformNew(queryParams);
      }).then(response => {
        this.downloadExcel(response, '支付平台')
      }).catch(() => {
      })
    }
  }
};
</script>
