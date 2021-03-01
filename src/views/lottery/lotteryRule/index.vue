<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="彩票类型id" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入彩票类型id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="彩票类型名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入彩票类型名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属彩种类型" prop="kind">
        <el-select v-model="queryParams.kind" placeholder="请选择所属彩种类型" clearable size="small">
          <el-option
            v-for="item in kind"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
          v-hasPermi="['admin:lotteryRule:add']"
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
          v-hasPermi="['admin:lotteryRule:edit']"
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
          v-hasPermi="['admin:lotteryRule:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryRule:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryRuleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="彩票类型名称" align="center" prop="name" />
      <el-table-column label="所属彩种类型" align="center" prop="kind" :formatter="formatterKind"/>
      <el-table-column label="排序号" align="center" prop="ind" />
      <el-table-column label="开奖说明" align="center" min-width="900px" prop="des" />
      <el-table-column label="操作" align="center" min-width="100px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryRule:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:lotteryRule:remove']"
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

    <!-- 添加或修改开奖规则说明对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="彩票类型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入彩票类型名称" />
        </el-form-item>
        <el-form-item label="所属彩种类型" prop="kind">
          <el-select v-model="queryParams.kind" placeholder="请选择所属彩种类型" clearable size="small">
            <el-option
              v-for="item in kind"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="ind">
          <el-input v-model="form.ind" placeholder="请输入排序号" />
        </el-form-item>
        <el-form-item label="开奖说明" prop="des">
          <el-input v-model="form.des" type="textarea" placeholder="请输入开奖说明" />
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
import { listLotteryRule, getLotteryRule, delLotteryRule, addLotteryRule, updateLotteryRule, exportLotteryRule } from "@/api/platform-web/lottery/lotteryRule";

export default {
  name: "LotteryRule",
  components: {
  },
  data() {
    return {
      //所属彩种类型下拉框
      kind: [{
        value: '0',
        label: '时时彩'
      }, {
        value: '1',
        label: '11选5'
      }, {
        value: '2',
        label: '快三'
      }, {
        value: '3',
        label: '赛车'
      }, {
        value: '4',
        label: '六合彩'
      }],
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
      // 开奖规则说明表格数据
      lotteryRuleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        des: null
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
  },
  methods: {
    /** 查询开奖规则说明列表 */
    getList() {
      this.loading = true;
      listLotteryRule(this.queryParams).then(response => {
        this.lotteryRuleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0=时时彩,1=11选5,2=快三3=赛车4=六合彩
    formatterKind(row) {
      if (row.kind == 0) {
        return '时时彩'
      } else if (row.kind == 1) {
        return '11选5'
      } else if (row.kind == 2) {
        return '快三'
      } else if (row.kind == 3) {
        return '赛车'
      } else if (row.kind == 4) {
        return '六合彩'
      } else {
        return ''
      }
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
        des: null
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
      this.title = "添加开奖规则说明";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryRule(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改开奖规则说明";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryRule(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryRule(this.form).then(response => {
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
      this.$confirm('是否确认删除开奖规则说明编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLotteryRule(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有开奖规则说明数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportLotteryRule(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(() => {
      })
    }
  }
};
</script>
