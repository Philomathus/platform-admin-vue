<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="渠道名称" prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          placeholder="请输入渠道名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="链名称" prop="chainName">
        <el-input
          v-model="queryParams.chainName"
          placeholder="请输入链名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="充值地址" prop="rechargeAddress">
        <el-input
          v-model="queryParams.rechargeAddress"
          placeholder="请输入充值地址"
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
          v-hasPermi="['admin:configUsdtRecharge:add']"
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
          v-hasPermi="['admin:configUsdtRecharge:edit']"
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
          v-hasPermi="['admin:configUsdtRecharge:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:configUsdtRecharge:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="configUsdtRechargeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="排序" align="center" width="200" prop="indexs" />
      <el-table-column label="钱包二维码" align="center" width="200" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height: 50px;"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="200" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="渠道名称" align="center" width="260" prop="channelName" />
      <el-table-column label="链名称" align="center" width="260" prop="chainName" />
      <el-table-column label="充值地址" align="center" min-width="300" prop="rechargeAddress" />
      <el-table-column label="优惠比例" align="center" width="200" prop="discountBill" />
      <el-table-column label="usdt汇率" align="center" width="200" prop="exchangeRate" />
      <el-table-column label="操作" align="center" width="260" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:configUsdtRecharge:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:configUsdtRecharge:remove']"
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input v-model="form.channelName" placeholder="请输入渠道名称" />
        </el-form-item>
        <el-form-item label="链名称" prop="chainName">
          <el-input v-model="form.chainName" placeholder="请输入链名称" />
        </el-form-item>
        <el-form-item label="充值地址" prop="rechargeAddress">
          <el-input v-model="form.rechargeAddress" placeholder="请输入充值地址" />
        </el-form-item>
        <el-form-item label="优惠比例" prop="discountBill">
          <el-input v-model="form.discountBill" placeholder="请输入优惠比例" />
        </el-form-item>
        <el-form-item label="usdt汇率" prop="exchangeRate">
          <el-input v-model="form.exchangeRate" placeholder="请输入usdt汇率" />
        </el-form-item>
        <el-form-item label="排序" prop="indexs">
          <el-input v-model="form.indexs" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="钱包二维码">
          <imageUpload v-model="form.icon" path="ConfigUsdtRecharge"/>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注信息" />
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
import { listConfigUsdtRecharge, getConfigUsdtRecharge, delConfigUsdtRecharge, addConfigUsdtRecharge, updateConfigUsdtRecharge, exportConfigUsdtRecharge } from "@/api/platform-web/config/configUsdtRecharge"
import ImageUpload from '@/components/ImageUpload'

export default {
  name: "ConfigUsdtRecharge",
  components: {
    ImageUpload
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
      configUsdtRechargeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        channelName: null,
        chainName: null,
        rechargeAddress: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        channelName: [
          {required: true, message: '渠道名称不能为空', trigger: 'blur'}
        ],
        chainName: [
          {required: true, message: '链名称不能为空', trigger: 'blur'}
        ],
        rechargeAddress: [
          {required: true, message: '充值地址不能为空', trigger: 'blur'}
        ],
        discountBill: [
          {required: true, message: '优惠比例不能为空', trigger: 'blur'}
        ],
        exchangeRate: [
          {required: true, message: 'usdt汇率不能为空', trigger: 'blur'}
        ],
        indexs: [
          {required: true, message: '排序不能为空', trigger: 'blur'}
        ],
        icon: [
          {required: true, message: '钱包二维码不能为空', trigger: 'blur'}
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
      listConfigUsdtRecharge(this.queryParams).then(response => {
        this.configUsdtRechargeList = response.rows;
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
        channelName: null,
        chainName: null,
        rechargeAddress: null,
        discountBill: null,
        exchangeRate: null,
        indexs: null,
        icon: null,
        status: 0,
        openLevel: null,
        openLevelMax: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      getConfigUsdtRecharge(id).then(response => {
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
            updateConfigUsdtRecharge(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConfigUsdtRecharge(this.form).then(response => {
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
        return delConfigUsdtRecharge(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportConfigUsdtRecharge(queryParams);
      }).then(response => {
        this.downloadExcel(response, '【请填写功能名称】');
      }).catch(() => {
      })
    }
  }
};
</script>
