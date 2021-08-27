<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主播ID" prop="hostId">
        <el-input
          v-model="queryParams.hostId"
          placeholder="请输入主播ID"
          clearable
          size="small"
          type="number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="会员ID" prop="blackUserId">
        <el-input
          v-model="queryParams.blackUserId"
          placeholder="请输入被设置的用户ID"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveBlackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="会员ID" align="center" prop="blackUserId"/>
      <el-table-column label="会员昵称" align="center" prop="nickName"/>
      <el-table-column label="主播ID" align="center" prop="hostId"/>
      <el-table-column label="主播昵称" align="center" prop="hostName"/>
      <el-table-column label="封停备注" align="center" prop="remark"/>
      <el-table-column label="封停时间" align="center" width="170"  prop="createTime"/>
      <el-table-column label="操作" min-width="60" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveBlack:remove']"
          >移除黑名单禁言</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { listLiveBlack, delLiveBlack } from "@/api/live-web/liveBlack/liveBlack";

export default {
  name: "LiveBlack",
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
      // 拉黑表格数据
      liveBlackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        hostId: null,
        blackUserId: null,
      },
      // 表单参数
      form: {},

    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询拉黑列表 */
    getList() {
      this.loading = true;
      listLiveBlack(this.queryParams).then(response => {
        debugger;
        this.liveBlackList = response;
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
        createTime: null,
        hostId: null,
        blackUserId: null,
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
      this.title = "添加拉黑";
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除拉黑编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delLiveBlack(row);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },


  }
};
</script>
