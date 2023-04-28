<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveBlack.queryForm.hostIdLabel')" prop="hostId">
        <el-input
          v-model="queryParams.hostId"
          :placeholder="$t('liveWeb.liveBlack.queryForm.hostIdPlaceholder')"
          clearable
          size="small"
          type="number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveBlack.queryForm.blackUserIdLabel')" prop="blackUserId">
        <el-input
          v-model="queryParams.blackUserId"
          :placeholder="$t('liveWeb.liveBlack.queryForm.blackUserIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveBlack.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveBlack.queryForm.resetButton')}}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveBlackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.blackUserId')" align="center" prop="blackUserId"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.nickName')" align="center" prop="nickName"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.hostId')" align="center" prop="hostId"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.hostName')" align="center" prop="hostName"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.remark')" align="center" prop="remark"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.createTime')" align="center" width="170"  prop="createTime"/>
      <el-table-column :label="$t('liveWeb.liveBlack.table.operation')" min-width="60" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveBlack:remove']"
          >{{$t('liveWeb.liveBlack.table.removeButton')}}</el-button>
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
        pageNum: 1,
        pageSize: 50,
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
        this.liveBlackList = response.rows;
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
        createTime: null,
        hostId: null,
        blackUserId: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.blackUserId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.blackUserId.match(reg)
        if(!flag){
          this.msgError(this.$t('liveWeb.liveBlack.messageBox.memberIdFormatError'))
          return
        }
      }
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
      this.$t('liveWeb.liveBlack.confirmRemoveDialog.title')
      this.$confirm(this.$t('liveWeb.liveBlack.confirmRemoveDialog.message', {ids: ids}), this.$t('liveWeb.liveBlack.confirmRemoveDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveBlack.confirmRemoveDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveBlack.confirmRemoveDialog.cancelButton'),
        type: "warning"
      }).then(function() {
        return delLiveBlack(row);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('liveWeb.liveBlack.messageBox.removeSuccess'));
      }).catch(() => {
      })
    },


  }
};
</script>
