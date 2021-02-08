<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="40px">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
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
          v-hasPermi="['pay:payType:add']"
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
          v-hasPermi="['pay:payType:edit']"
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
          v-hasPermi="['pay:payType:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:payType:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe :stripe="true" v-loading="loading" :data="payTypeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="编号" align="center" prop="id" />-->
<!--      <el-table-column label="编号" align="center" prop="code" />-->
      <el-table-column label="排序" align="center" prop="indexes" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="图标" align="center" prop="iconUrl">
      <template slot-scope="scope">
        <el-image
          style="width: auto; height: 100%"
          :src="scope.row.iconUrl"
        >
        </el-image>
      </template>
      </el-table-column>
<!--      <el-table-column label="编码" align="center" prop="code" />-->
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

      <el-table-column label="推荐" align="center" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isRecommend"
            active-value="1"
            inactive-value="0"
            @change="isRecommendChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!--      <el-table-column label="是否线上(1是0否)" align="center" prop="isOnline" />-->
      <el-table-column label="支付类型" align="center" prop="type" :formatter="successFormat" />
      <el-table-column label="创建人" align="center" prop="creator" />
      <el-table-column label="修改人" align="center" prop="updator" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:payType:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:payType:remove']"
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

    <!-- 添加或修改【支付类型】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="图标" >
          <imageUpload v-model="form.iconUrl" path="PayType"/>
        </el-form-item>
        <el-form-item label="排序" prop="indexes">
          <el-input v-model="form.indexes" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="存入类型" prop="type">
          <el-select
            filterable
            v-model="form.type"
            placeholder="请选择存入类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in paytypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
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
import { listPayType, getPayType, delPayType, addPayType, updatePayType, exportPayType,changePayTypeStatus,changeRecommendStatus } from "@/api/platform-web/pay/payType";
import Editor from "@/components/Editor/index";
import ImageUpload from "@/components/ImageUpload";


export default {
  name: "PayType",
  components: {
    Editor,
    ImageUpload,
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
      // 【支付类型】表格数据
      payTypeList: [],
      //支付类型
      paytypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        code: null,
        iconUrl: null,
        indexes: null,
        isRecommend: null,
        status: null,
        isOnline: null,
        type: null,
        creator: null,
        updator: null,
        orderByColumn: 'indexes',
        isAsc: 'desc',
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "编码不能为空", trigger: "blur" }
        ],
        indexes: [
          { required: true, message: "排序不能为空", trigger: "blur" }
        ],
        isRecommend: [
          { required: true, message: "是否推荐(1是0否)不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态(1启用0停用)不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("pay_type").then(response => {
      this.paytypeOptions = response.data;
    });
  },
  methods: {
    /** 查询【支付类型】列表 */
    getList() {
      this.loading = true;
      listPayType(this.queryParams).then(response => {
        this.payTypeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
     //支付类型状态修改
    handleStatusChange(row) {
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return changePayTypeStatus(row.id, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
      });
    },
    //支付类型是否推荐修改
    isRecommendChange(row) {
      let text = row.isRecommend === "1" ? "推荐" : "不推荐";
      this.$confirm('确认要"' + text + '""' + row.name + '"吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return changeRecommendStatus(row.id, row.isRecommend);
      }).then(() => {
        this.msgSuccess(  "操作成功");
      }).catch(function() {
        row.isRecommend = row.isRecommend === "0" ? "1" : "0";
      });
    },
    // 支付类型
    successFormat(row, column) {
      return this.selectDictLabel(this.paytypeOptions, row.type);
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
        iconUrl: null,
        indexes: null,
        isRecommend: null,
        status: 0,
        isOnline: null,
        type: null,
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加支付类型";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayType(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改支付类型";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayType(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayType(this.form).then(response => {
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
      this.$confirm('是否确认删除支付类型编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPayType(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有支付类型数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPayType(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
