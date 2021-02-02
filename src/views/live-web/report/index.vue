<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">

      <el-form-item label="主播排行榜">
        <el-select v-model="queryParams.type" placeholder="请选择榜类型">
          <el-option label="日榜" value="0" ></el-option>
          <el-option label="周榜" value="1"></el-option>
          <el-option label="月榜" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="更新日期">
        <el-date-picker clearable size="small"
                        v-model="queryParams.reptime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择更新日期">
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:reportAnchorhotDay:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="reportAnchorhotDayList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
<!--      <el-table-column label="id" align="center" prop="repId"/>-->
      <el-table-column label="主播ID" align="center" prop="anchorid"/>
      <el-table-column label="主播昵称" align="center" prop="nickname"/>
      <el-table-column label="每日热度" align="center" prop="dayTicket"/>
      <el-table-column label="热度排名" align="center" prop="sort"/>
      <el-table-column label="距离上一次差值" align="center" prop="dayTicketUpdiff"/>
      <el-table-column label="日榜" align="center" prop="repdate"/>
      <el-table-column label="榜单" align="center" prop="num"/>
      <el-table-column label="更新日期" align="center" prop="reptime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reptime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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

    <!-- 添加或修改贡献榜对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
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
import {
  listReportAnchorhotDay,
  getReportAnchorhotDay,
  delReportAnchorhotDay,
  addReportAnchorhotDay,
  updateReportAnchorhotDay,
  exportReportAnchorhotDay
} from "@/api/live-web/report/reportAnchorhotDay";

export default {
  name: "ReportAnchorhotDay",
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
      // 贡献榜表格数据
      reportAnchorhotDayList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        type: "0",
        reptime: new Date(),
        pageNum: 1,
        pageSize: 10
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询贡献榜列表 */
    getList() {
      this.loading = true;
      listReportAnchorhotDay(this.queryParams).then(response => {
        this.reportAnchorhotDayList = response.rows;
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
        repId: null,
        anchorid: null,
        nickname: null,
        dayTicket: null,
        sort: null,
        dayTicketUpdiff: null,
        repdate: null,
        num: null,
        reptime: new Date(),
        headImage: null
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
      this.ids = selection.map(item => item.repId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加贡献榜";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const repId = row.repId || this.ids
      getReportAnchorhotDay(repId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改贡献榜";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.repId != null) {
            updateReportAnchorhotDay(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReportAnchorhotDay(this.form).then(response => {
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
      const repIds = row.repId || this.ids;
      this.$confirm('是否确认删除贡献榜编号为"' + repIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delReportAnchorhotDay(repIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有贡献榜数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportReportAnchorhotDay(queryParams);
      }).then(response => {
        this.download(response.msg);
      })
    }
  }
};
</script>
