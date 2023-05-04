<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.postcatIdLabel')" prop="poscatId">
        <el-input
          v-model="queryParams.poscatId"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.poscatIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.groupLabel')" prop="group">
        <el-input
          v-model="queryParams.group"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.groupPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.userIdLabel')" prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.userIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.typeLabel')" prop="type">
        <el-select v-model="queryParams.type" :placeholder="$t('liveWeb.liveVideoChat.queryForm.typePlaceholder')" clearable size="small">
          <el-option :label="$t('liveWeb.liveVideoChat.queryForm.typeValuePlaceholder')" value=""/>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.poscatNickNameLabel')" prop="poscatNickName">
        <el-input
          v-model="queryParams.poscatNickName"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.poscatNickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.userNickNameLabel')" prop="userNickName">
        <el-input
          v-model="queryParams.userNickName"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.userNickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveVideoChat.queryForm.fromPlatformLabel')" prop="fromPlatform">
        <el-input
          v-model="queryParams.fromPlatform"
          :placeholder="$t('liveWeb.liveVideoChat.queryForm.fromPlatformPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveVideoChat.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveVideoChat.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveVideoChat:add']"
        >{{$t('liveWeb.liveVideoChat.actions.add')}}
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
          v-hasPermi="['admin:liveVideoChat:edit']"
        >{{$t('liveWeb.liveVideoChat.actions.edit')}}
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
          v-hasPermi="['admin:liveVideoChat:remove']"
        >{{$t('liveWeb.liveVideoChat.actions.delete')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveVideoChat:export']"
        >{{$t('liveWeb.liveVideoChat.actions.export')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveVideoChatList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.id')" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.poscatId')" align="center" prop="poscatId"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.group')" align="center" prop="group"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.userId')" align="center" prop="userId"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.msg')" align="center" prop="msg"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.type')" align="center" prop="type"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.poscatNickName')" align="center" prop="poscatNickName"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.userNickName')" align="center" prop="userNickName"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.fromPlatform')" align="center" prop="fromPlatform"/>
      <el-table-column :label="$t('liveWeb.liveVideoChat.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >{{$t('liveWeb.liveVideoChat.table.editButton')}}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveVideoChat:remove']"
          >{{$t('liveWeb.liveVideoChat.table.deleteButton')}}
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

    <!-- 添加或修改会员发言对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.poscatIdLabel')" prop="poscatId">
          <el-input v-model="form.poscatId" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.poscatIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.groupLabel')" prop="group">
          <el-input v-model="form.group" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.groupPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.userIdLabel')" prop="userId">
          <el-input v-model="form.userId" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.userIdPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.msgLabel')" prop="msg">
          <el-input v-model="form.msg" type="textarea" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.msgPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.typeLabel')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.typePlaceholder')">
            <el-option :label="$t('liveWeb.liveVideoChat.addEditDialog.typeValuePlaceholder')" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.poscatNickNameLabel')" prop="poscatNickName">
          <el-input v-model="form.poscatNickName" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.poscatNickNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.userNickNameLabel')" prop="userNickName">
          <el-input v-model="form.userNickName" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.userNickNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.liveVideoChat.addEditDialog.fromPlatformLabel')" prop="fromPlatform">
          <el-input v-model="form.fromPlatform" :placeholder="$t('liveWeb.liveVideoChat.addEditDialog.fromPlatformPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveVideoChat.addEditDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveVideoChat.addEditDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLiveVideoChat,
  getLiveVideoChat,
  delLiveVideoChat,
  addLiveVideoChat,
  updateLiveVideoChat,
  exportLiveVideoChat
} from "@/api/live-web/liveVideoChat";

export default {
  name: "LiveVideoChat",
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
      // 会员发言表格数据
      liveVideoChatList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        poscatId: null,
        group: null,
        userId: null,
        msg: null,
        type: null,
        poscatNickName: null,
        userNickName: null,
        fromPlatform: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        poscatId: [
          {required: true, message: this.$t('liveWeb.liveVideoChat.addEditDialog.validations.poscatId'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询会员发言列表 */
    getList() {
      this.loading = true;
      listLiveVideoChat(this.queryParams).then(response => {
        this.liveVideoChatList = response.rows;
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
        poscatId: null,
        group: null,
        userId: null,
        msg: null,
        createTime: null,
        type: null,
        poscatNickName: null,
        userNickName: null,
        fromPlatform: null
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
      this.title = this.$t('liveWeb.liveVideoChat.addEditDialog.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveVideoChat(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('liveWeb.liveVideoChat.addEditDialog.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideoChat(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveVideoChat.messageBox.updateLiveVideoChatSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveVideoChat(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveVideoChat.messageBox.addLiveVideoChatSuccess'));
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

      this.$confirm(this.$t('liveWeb.liveVideoChat.confirmDeleteDialog.message', {ids: ids}), this.$t('liveWeb.liveVideoChat.confirmDeleteDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoChat.confirmDeleteDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoChat.confirmDeleteDialog.cancelButton'),
        type: "warning"
      }).then(function () {
        return delLiveVideoChat(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('liveWeb.liveVideoChat.messageBox.deleteSuccess'));
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm(this.$t('liveWeb.liveVideoChat.confirmExportDialog.message'), this.$t('liveWeb.liveVideoChat.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoChat.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoChat.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportLiveVideoChat(queryParams);
      }).then(response => {
        this.downloadExcel(response, '会员发言')
      }).catch(() => {
      })
    }
  }
};
</script>
