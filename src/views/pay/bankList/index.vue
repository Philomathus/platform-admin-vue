<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="银行名称" prop="bankName">
        <el-input
          v-model="queryParams.bankName"
          placeholder="请输入银行名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行编码" prop="bankCode">
        <el-input
          v-model="queryParams.bankCode"
          placeholder="请输入银行编码"
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
          v-hasPermi="['admin:bankList:add']"
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
          v-hasPermi="['admin:bankList:edit']"
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
          v-hasPermi="['admin:bankList:remove']"
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
          v-hasPermi="['admin:bankList:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="bankListList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键" align="center" prop="id"/>
      <el-table-column label="银行名称" align="center" prop="bankName"/>
      <el-table-column label="银行编码" align="center" prop="bankCode"/>
      <el-table-column label="图标" align="center" prop="bankIcon">
        <template slot-scope="scope">
          <el-image
            style="height: 50px"
            :src="scope.row.bankIcon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
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
      <el-table-column label="排序 从小到大顺序" align="center" prop="sort"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:bankList:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:bankList:remove']"
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

    <!-- 添加出款银行列表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="600px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称"/>
        </el-form-item>
        <el-form-item label="银行编码" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行英文编码"/>
        </el-form-item>
        <el-form-item label="图标" prop="bankIcon">
          <imageUpload v-model="form.bankIcon" path="bankList"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"/>
        </el-form-item>
        <el-form-item label="银行官网地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入银行官网地址"/>
        </el-form-item>
        <el-form-item label="开始颜色" prop="colorStart">
          <el-color-picker v-model="form.colorStart" size="medium" :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="结束颜色" prop="colorEnd">
          <el-color-picker v-model="form.colorEnd" size="medium" :predefine="predefineColors"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addsubmitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改出款银行列表对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入ID" readonly disabled/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入银行名称"/>
        </el-form-item>
        <el-form-item label="银行编码" prop="bankCode">
          <el-input v-model="form.bankCode" placeholder="请输入银行英文编码"/>
        </el-form-item>
        <el-form-item label="图标" prop="bankIcon">
          <imageUpload v-model="form.bankIcon" path="bankList"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" placeholder="请输入排序"/>
        </el-form-item>
        <el-form-item label="银行官网地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入银行官网地址"/>
        </el-form-item>
        <el-form-item label="开始颜色" prop="colorStart">
          <el-color-picker v-model="form.colorStart" size="medium" :predefine="predefineColors"/>
        </el-form-item>
        <el-form-item label="结束颜色" prop="colorEnd">
          <el-color-picker v-model="form.colorEnd" size="medium" :predefine="predefineColors"/>
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
  listBankList,
  getBankList,
  delBankList,
  addBankList,
  updateBankList,
  exportBankList,
  changeConfigBankStatus
} from "@/api/platform-web/pay/bankList";
import ImageUpload from '@/components/ImageUpload'

export default {
  name: "BankList",
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
      // 出款银行列表表格数据
      bankListList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      opene: false,
      predefineColors: [
        '#5FB878',
        '#FF5722',
        '#0000FF',
        '#FFB800',
        '#C0C0C0',
        '#525252'
      ],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        bankName: null,
        bankCode: null,
        orderByColumn: 'sort',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        id: [
          {required: true, message: "ID不能为空", trigger: "blur"}
        ],
        bankName: [
          {required: true, message: "银行名称不能为空", trigger: "blur"}
        ],
        bankCode: [
          {required: true, message: "银行英文编码不能为空", trigger: "blur"}
        ],
        bankIcon: [
          {required: true, message: "银行图标不能为空", trigger: "blur"}
        ],
        sort: [
          {required: true, message: "排序不能为空", trigger: "blur"}
        ],
        url: [
          {required: true, message: "银行官网地址不能为空", trigger: "blur"}
        ],
        colorStart: [
          {required: true, message: "开始颜色不能为空", trigger: "blur"}
        ],
        colorEnd: [
          {required: true, message: "结束颜色不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询出款银行列表列表 */
    getList() {
      this.loading = true;
      listBankList(this.queryParams).then(response => {
        this.bankListList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.opene = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        bankName: null,
        bankCode: null,
        bankIcon: null,
        status: null,
        sort: null,
        colorEnd:null,
        colorStart:null
      };
      this.resetForm("form");
    },
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.bankName + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeConfigBankStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
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
      this.opene = true;
      this.title = "添加出款银行列表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBankList(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改出款银行列表";
      });
    },
    /** 新增提交按钮 */
    addsubmitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addBankList(this.form).then(response => {
            this.msgSuccess("新增成功");
            this.opene = false;
            this.getList();
          });
        }
      });
    },
    /** 修改提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateBankList(this.form).then(response => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除出款银行列表编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delBankList(ids);
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
      }).then(function () {
        return exportBankList(queryParams);
      }).then(response => {
        this.downloadExcel(response, '出款银行列表');
      }).catch(() => {
      })
    }
  }
};
</script>
