<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('activity.configWaiter.tableDialog.name')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('activity.configWaiter.tableDialog.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{
            $t('global.searchButton')
          }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['admin:configWaiter:add']"
        >{{ $t('global.addButton') }}
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
          v-hasPermi="['admin:configWaiter:edit']"
        >{{ $t('global.editButton') }}
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
          v-hasPermi="['admin:configWaiter:remove']"
        >{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:configWaiter:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="configWaiterList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.type')" align="center" prop="type" :formatter="formatterType"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.code')" align="center" prop="code"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.name')" align="center" prop="name"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.icon')" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.icon"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.status')" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.remark')" align="center" prop="remark"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.updateBy')" align="center" prop="updateBy"/>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.updateTime')" align="center" prop="updateTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.configWaiter.tableDialog.index')" align="center" prop="indexs"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:configWaiter:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:configWaiter:remove']"
          >{{
              $t('global.deleteButton')
            }}
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

    <!-- 添加或修改客服管理对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('activity.configWaiter.tableDialog.type')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('activity.configWaiter.tableDialog.typePlaceholder')">
            <el-option
              v-for="dict in qqwechatType"
              :key="dict.dictValue"
              ::label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('activity.configWaiter.tableDialog.code')" prop="code">
          <el-input v-model="form.code" :placeholder="$t('activity.configWaiter.tableDialog.codePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.configWaiter.tableDialog.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('activity.configWaiter.tableDialog.namePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.configWaiter.tableDialog.icon')" prop="icon">
          <imageUpload v-model="form.icon" path="configWaiter"/>
        </el-form-item>
        <el-form-item :label="$t('activity.configWaiter.tableDialog.index')" prop="indexs">
          <el-input v-model="form.indexs" :placeholder="$t('activity.configWaiter.tableDialog.indexPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.configWaiter.tableDialog.remark')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('activity.configWaiter.tableDialog.remarkPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('global.submitButton') }}</el-button>
        <el-button @click="cancel">{{ $t('global.cancelButton') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listConfigWaiter,
  getConfigWaiter,
  delConfigWaiter,
  addConfigWaiter,
  updateConfigWaiter,
  exportConfigWaiter,
  changeStatus
} from "@/api/activity/configWaiter";
import ImageUpload from "@/components/ImageUpload";

export default {
  name: "ConfigWaiter",
  components: {
    ImageUpload,
  },
  data() {
    return {
      // 1=qq,2=微信
      formatterType(row) {
        if (row.type == 1) {
          return this.$t('activity.qq')
        } else if (row.type == 2) {
          return this.$t('activity.wechat')
        } else {
          return ''
        }
      },
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
      // 客服管理表格数据
      configWaiterList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //类型字典
      type: [],
      qqwechatType: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        code: null,
        name: null,
        icon: null,
        status: null,
        indexs: null,
        orderByColumn: 'indexs',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getDicts('waiter_qqwechatType').then(response => {
      this.qqwechatType = response.data
    })
  },
  methods: {
    /** 查询客服管理列表 */
    getList() {
      this.loading = true;
      listConfigWaiter(this.queryParams).then(response => {
        this.configWaiterList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === '1'
        ? this.$t('global.statusEnable')
        : this.$t('global.statusDisable')
      this.$confirm(this.$t('global.statusEditSuccess')
        + text
        + '""'
        + this.title
        + this.$t('global.statusConfirmQuestion'),
        this.$t('global.statusConfirmTitle'), {
          confirmButtonText: this.$t('global.confirmButton'),
          cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return changeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('global.statusEditSuccess'))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
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
        code: null,
        name: null,
        icon: null,
        status: 0,
        updateBy: null,
        updateTime: null,
        indexs: null,
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加客服管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfigWaiter(id).then(response => {
        this.form = response.data;
        this.form.type = this.form.type + ''
        this.open = true;
        this.title = "修改客服管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigWaiter(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addConfigWaiter(this.form).then(response => {
              this.msgSuccess(this.$t('global.addSuccessMsg'));
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
      this.$confirm(this.$t('global.deleteConfirm') + row.title + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delConfigWaiter(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportConfigWaiter(queryParams);
      }).then(response => {
        (response.msg);
      }).catch(() => {
      })
    }
  }
};
</script>
