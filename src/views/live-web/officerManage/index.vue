<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主播ID" prop="hostId">
        <el-input
          v-model="queryParams.hostId"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="puserId">
        <el-input
          v-model="queryParams.puserId"
          placeholder="请输入用户ID"
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
          v-hasPermi="['admin:liveOfficer:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['admin:liveOfficer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveOfficer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveOfficerList" @selection-change="handleSelectionChange" class="el-table--border">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="主播ID" align="center" prop="hostId" />
      <el-table-column label="主播昵称" align="center" prop="hostName" />
      <el-table-column label="用户ID" align="center" prop="puserId" />
      <el-table-column label="用户昵称" align="center" prop="puserName" />
      <el-table-column label="创建时间" align="center" prop="ctime" min-width="120" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveOfficer:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加房屋管理对话框  Add live officer management dialog -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主播ID" prop="hostId">
          <el-input v-model="form.hostId" placeholder="请输入主播ID" />
        </el-form-item>
        <el-form-item label="用户ID" prop="puserId">
          <el-input v-model="form.puserId" placeholder="请输入用户ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listLiveOfficer,
  delLiveOfficer,
  addLiveOfficer,
  exportLiveOfficer,
} from "@/api/live-web/liveOfficer/liveOfficer";

export default {
  name: "LiveOfficer",
  components: {
  },
  data() {
    return {

      // 遮罩层
      loading: true,
      // 选中数组 selected array
      ids: [],
      /**  非单个禁用 Not single disabled */
      single: true,
      /** 非多个禁用 Not multiple disabled */
      multiple: true,
      /** 显示搜索条件 Show search criteria */
      showSearch: true,
      // 总条数
      total: 0,
      /** 房管管理表格数据 live officer management form data */
      liveOfficerList: [],
      /** 弹出层标题  title  */
      title: "",
      /** 是否显示弹出层 Whether to show the popup layer */
      open: false,
      /** 查询参数 query params */
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: '',
        hostId: null,
        pUserId: null,
        upAdmin: null,
        ctime: null,
        status: null
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
    /** 查询房管管理列表 Query housing management list */
    getList() {
      this.loading = true;
      listLiveOfficer(this.queryParams).then(response => {
        this.liveOfficerList = response.rows;
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
        type: null,
        hostId: null,
        pUserId: null,
        upAdmin: null,
        ctime: null,
        status: 0
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作  Search button action*/
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 Reset button action */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 多选框选中数据 Multi-select box data */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 Add button action */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加房管管理";
    },

    /** 提交按钮  submit button*/
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            addLiveOfficer(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
        }
      });
    },
    /** 删除按钮操作 delete button action*/
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除房管管理编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveOfficer(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },
    /** 导出按钮操作 Export button action */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return exportLiveOfficer(queryParams);
      }).then(response => {
        this.downloadExcel(response, '房管管理');
      }).catch(() => {
      })
    },
  }
};
</script>
