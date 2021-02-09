<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主播ID" prop="poscatId">
        <el-input
          v-model="queryParams.poscatId"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="消息所在聊天组" prop="group">
        <el-input
          v-model="queryParams.group"
          placeholder="请输入消息所在聊天组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送者id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入发送者id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="消息类型 0 普通消息 1 弹幕消息" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择消息类型 0 普通消息 1 弹幕消息" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="主播昵称" prop="poscatNickName">
        <el-input
          v-model="queryParams.poscatNickName"
          placeholder="请输入主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送者昵称" prop="userNickName">
        <el-input
          v-model="queryParams.userNickName"
          placeholder="请输入发送者昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台会员ID" prop="fromPlatform">
        <el-input
          v-model="queryParams.fromPlatform"
          placeholder="请输入平台会员ID"
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
          v-hasPermi="['admin:liveVideoChat:add']"
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
          v-hasPermi="['admin:liveVideoChat:edit']"
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
          v-hasPermi="['admin:liveVideoChat:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:liveVideoChat:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveVideoChatList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="平台会员ID" align="center" prop="id" />
      <el-table-column label="主播ID" align="center" prop="poscatId" />
      <el-table-column label="消息所在聊天组" align="center" prop="group" />
      <el-table-column label="发送者id" align="center" prop="userId" />
      <el-table-column label="消息内容" align="center" prop="msg" />
      <el-table-column label="消息类型" align="center" prop="type" />
      <el-table-column label="主播昵称" align="center" prop="poscatNickName" />
      <el-table-column label="发送者昵称" align="center" prop="userNickName" />
      <el-table-column label="平台会员ID" align="center" prop="fromPlatform" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveVideoChat:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveVideoChat:remove']"
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

    <!-- 添加或修改会员发言对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主播ID" prop="poscatId">
          <el-input v-model="form.poscatId" placeholder="请输入主播ID" />
        </el-form-item>
        <el-form-item label="消息所在聊天组" prop="group">
          <el-input v-model="form.group" placeholder="请输入消息所在聊天组" />
        </el-form-item>
        <el-form-item label="发送者id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入发送者id" />
        </el-form-item>
        <el-form-item label="消息内容" prop="msg">
          <el-input v-model="form.msg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="消息类型 0 普通消息 1 弹幕消息" prop="type">
          <el-select v-model="form.type" placeholder="请选择消息类型 0 普通消息 1 弹幕消息">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="主播昵称" prop="poscatNickName">
          <el-input v-model="form.poscatNickName" placeholder="请输入主播昵称" />
        </el-form-item>
        <el-form-item label="发送者昵称" prop="userNickName">
          <el-input v-model="form.userNickName" placeholder="请输入发送者昵称" />
        </el-form-item>
        <el-form-item label="平台会员ID" prop="fromPlatform">
          <el-input v-model="form.fromPlatform" placeholder="请输入平台会员ID" />
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
import { listLiveVideoChat, getLiveVideoChat, delLiveVideoChat, addLiveVideoChat, updateLiveVideoChat, exportLiveVideoChat } from "@/api/live-web/liveVideoChat";

export default {
  name: "LiveVideoChat",
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
          { required: true, message: "主播ID不能为空", trigger: "blur" }
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加会员发言";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveVideoChat(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "封停会员";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideoChat(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLiveVideoChat(this.form).then(response => {
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
      this.$confirm('是否确认删除会员发言编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLiveVideoChat(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有会员发言数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportLiveVideoChat(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
