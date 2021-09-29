<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="代充人id" prop="agentId">-->
<!--        <el-input-->
<!--          v-model="queryParams.agentId"-->
<!--          placeholder="请输入代充人id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="代充人账号-昵称" prop="agentId" label-width="118px">
        <el-select
          filterable
          v-model="queryParams.agentId"
          placeholder="请选择代充人账号-昵称"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="Account in accountOptions"
            :key="Account.id"
            :label="Account.nickName"
            :value="Account.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
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
          v-hasPermi="['admin:chatWelcomeConfig:add']"
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
          v-hasPermi="['admin:chatWelcomeConfig:edit']"
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
          v-hasPermi="['admin:chatWelcomeConfig:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:chatWelcomeConfig:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="chatWelcomeConfigList">
<!--      <el-table-column label="排序" align="center" prop="id" />-->
      <el-table-column label="代充人账号" align="center" prop="account" />
      <el-table-column label="代充人昵称" align="center" prop="nickName" />
      <el-table-column label="内容" align="center" min-width="400" prop="content" />
<!--      <el-table-column label="代充人id" align="center" prop="agentId" />-->
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
      <el-table-column label="创建人" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center" prop="operator" />
      <el-table-column label="操作时间" align="center" prop="operatorTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:chatWelcomeConfig:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:chatWelcomeConfig:remove']"
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

    <!-- 添加代充人欢迎语配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="代充人账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入代充人账号" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <editor v-model="form.content"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" type="number" class="no-number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改代充人欢迎语配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="代充人账号" prop="account">
          <el-input v-model="form.account" readonly placeholder="请输入代充人账号" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <editor v-model="form.content"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort" type="number" class="no-number" placeholder="请输入排序" />
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
import { listChatWelcomeConfig, getChatWelcomeConfig, delChatWelcomeConfig, addChatWelcomeConfig, updateChatWelcomeConfig, exportChatWelcomeConfig, accounts, changeStatus } from "@/api/platform-web/pay/chatWelcomeConfig";
import Editor from '@/components/WangEditor';

export default {
  name: "ChatWelcomeConfig",
  components: {
    Editor,
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
      // 代充人欢迎语配置表格数据
      chatWelcomeConfigList: [],
      accountOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      opene: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        content: null,
        agentId: null,
        operator: null,
        operatorTime: null,
        sort: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        content: [
          {required: true, message: "内容不能为空", trigger: "change"}
        ]
      }
    };
  },
  created() {
    this.getList();
    //代充账号
    accounts().then(response => {
      this.accountOptions = response.data
    })
  },
  methods: {
    //状态修改
    handleStatusChange(row) {
      let text = row.status === '1' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.nickName + '"吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 查询代充人欢迎语配置列表 */
    getList() {
      this.loading = true;
      listChatWelcomeConfig(this.queryParams).then(response => {
        this.chatWelcomeConfigList = response.rows;
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
        content: null,
        agentId: null,
        createTime: null,
        updateTime: null,
        operator: null,
        operatorTime: null,
        sort: null
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
      this.title = "添加代充人欢迎语配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChatWelcomeConfig(id).then(response => {
        this.form = response.data;
        this.opene = true;
        this.title = "修改代充人欢迎语配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChatWelcomeConfig(this.form).then(response => {
              if (response.code !== 0) {
              this.msgSuccess("修改成功");
              this.opene = false;
              this.getList();
            } else {
                this.msgError(response.code);
              }
            });
          } else {
            addChatWelcomeConfig(this.form).then(response => {
              if (response.code !== 0) {
                 this.msgSuccess("新增成功");
                 this.open = false;
                 this.getList();
              } else {
                this.$message.error(response.msg);
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除代充人欢迎语配置编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function() {
        return delChatWelcomeConfig(ids);
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
        return exportChatWelcomeConfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, '代充人欢迎语配置');
      }).catch(() => {
      })
    }
  }
};
</script>
