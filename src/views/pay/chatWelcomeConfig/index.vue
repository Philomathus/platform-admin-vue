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
      <el-form-item :label=" $t('pay.chatWelcomeConfig.can') " prop="agentId" label-width="118px">
        <el-select
          filterable
          v-model="queryParams.agentId"
          :placeholder=" $t('pay.chatWelcomeConfig.psc') "
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
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
        >{{ $t('global.newButton') }}</el-button>
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
        >{{ $t('global.editButton') }}</el-button>
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
        >{{ $t('global.deleteButton') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:chatWelcomeConfig:export']"
        >{{ $t('global.exportButton') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="chatWelcomeConfigList">
<!--      <el-table-column label="排序" align="center" prop="id" />-->
      <el-table-column :label=" $t('pay.chatWelcomeConfig.ca') " align="center" prop="account" />
      <el-table-column :label=" $t('pay.chatWelcomeConfig.noc') " align="center" prop="nickName" />
      <el-table-column :label=" $t('pay.chatWelcomeConfig.content') " align="center" min-width="400" prop="content" />
<!--      <el-table-column label="代充人id" align="center" prop="agentId" />-->
      <el-table-column :label=" $t('global.status') " align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('pay.chatWelcomeConfig.cb') " align="center" prop="createBy" />
      <el-table-column :label=" $t('pay.chatWelcomeConfig.ct') " align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('pay.chatWelcomeConfig.opt') " align="center" prop="operator" />
      <el-table-column :label=" $t('pay.chatWelcomeConfig.ot') " align="center" prop="operatorTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.operatorTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('pay.chatWelcomeConfig.sb') " align="center" prop="sort" />
      <el-table-column :label=" $t('pay.chatWelcomeConfig.optn') " align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:chatWelcomeConfig:edit']"
          >{{ $t('global.editButton') }}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:chatWelcomeConfig:remove']"
          >{{ $t('global.deleteButton') }}</el-button>
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label=" $t('pay.chatWelcomeConfig.ca') " prop="account">
          <el-input v-model="form.account" :placeholder=" $t('pay.chatWelcomeConfig.pean') " />
        </el-form-item>
        <el-form-item :label=" $t('pay.chatWelcomeConfig.content') " prop="content">
          <el-input v-model="form.content" type="textarea" :placeholder=" $t('pay.chatWelcomeConfig.pec') " />
        </el-form-item>
        <el-form-item :label=" $t('pay.chatWelcomeConfig.sb') " prop="sort">
          <el-input v-model="form.sort" type="number" class="no-number" :placeholder=" $t('pay.chatWelcomeConfig.pes') " />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }} </el-button>
      </div>
    </el-dialog>

    <!-- 修改代充人欢迎语配置对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label=" $t('pay.chatWelcomeConfig.ca') " prop="account">
          <el-input v-model="form.account" readonly :placeholder=" $t('pay.chatWelcomeConfig.pean') " />
        </el-form-item>
        <el-form-item :label=" $t('pay.chatWelcomeConfig.content') " prop="content">
          <el-input v-model="form.content" type="textarea" :placeholder=" $t('pay.chatWelcomeConfig.pec') " />
        </el-form-item>
        <el-form-item :label=" $t('pay.chatWelcomeConfig.sb') " prop="sort">
          <el-input v-model="form.sort" type="number" class="no-number" :placeholder=" $t('pay.chatWelcomeConfig.pes') " />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.confirmButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listChatWelcomeConfig, getChatWelcomeConfig, delChatWelcomeConfig, addChatWelcomeConfig, updateChatWelcomeConfig, exportChatWelcomeConfig, accounts, changeStatus } from "@/api/platform-web/pay/chatWelcomeConfig";

export default {
  name: "ChatWelcomeConfig",
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
        sort: null,
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        account: [
          {required: true, message: this.$t('pay.chatWelcomeConfig.tcac'), trigger: "change"}
        ],
        content: [
          {required: true, message: this.$t('pay.chatWelcomeConfig.ccbe'), trigger: "change"}
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
      let text = row.status === '1' ? this.$t('global.statusEnable') : this.$t('global.statusDisable')
      this.$confirm( this.$t('pay.chatWelcomeConfig.ctn', { text: text, nickname: row.nickname } ), this.$t('global.dialogtitle') , {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('global.successPrompt') )
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
      this.title = this.$t('pay.chatWelcomeConfig.acwm');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getChatWelcomeConfig(id).then(response => {
        this.form = response.data;
        this.opene = true;
        this.title = this.$t('pay.chatWelcomeConfig.mcwm');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateChatWelcomeConfig(this.form).then(response => {
              if (response.code !== 0) {
              this.msgSuccess( this.$t('pay.chatWelcomeConfig.mcwm') );
              this.opene = false;
              this.getList();
            } else {
                this.msgError(response.code);
              }
            });
          } else {
            addChatWelcomeConfig(this.form).then(response => {
              if (response.code !== 0) {
                 this.msgSuccess( this.$t('global.addSuccessMsg') );
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
      this.$confirm( this.$t('pay.chatWelcomeConfig.wtcd', { id: ids }) , this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delChatWelcomeConfig(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess( this.$t('global.deleteSuccessMsg') );
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( this.$t('pay.chatWelcomeConfig.cped') , this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportChatWelcomeConfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('pay.chatWelcomeConfig.gcwm') );
      }).catch(() => {
      })
    }
  }
};
</script>
