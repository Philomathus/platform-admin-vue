<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.h5.queryForm.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('liveWeb.h5.queryForm.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.h5.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.h5.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:h5Plugin:add']"
        >{{$t('liveWeb.h5.actions.add')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['admin:h5Plugin:edit']"
        >{{$t('liveWeb.h5.actions.edit')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['admin:h5Plugin:remove']"
        >{{$t('liveWeb.h5.actions.remove')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="h5PluginList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('liveWeb.h5.table.id')" align="center" prop="id" />
      <el-table-column :label="$t('liveWeb.h5.table.name')" align="center" prop="name" />
      <el-table-column :label="$t('liveWeb.h5.table.status')" align="center" key="status" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.h5.table.conUrl')" width="305px" align="center" prop="conUrl" />
      <el-table-column :label="$t('liveWeb.h5.table.iconUrl')" align="center" prop="iconUrl">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.iconUrl"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.h5.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:h5Plugin:edit']"
          >{{$t('liveWeb.h5.table.editButton')}}</el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:h5Plugin:remove']"
          >{{$t('liveWeb.h5.table.removeButton')}}</el-button>
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

    <!-- 添加h5插件对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="opene" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.h5.addDialog.idLabel')" prop="id">
          <el-input v-model="form.id" :placeholder="$t('liveWeb.h5.addDialog.idPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.h5.addDialog.nameLabel')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('liveWeb.h5.addDialog.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.h5.addDialog.conUrlLabel')" prop="conUrl">
          <el-input v-model="form.conUrl" :placeholder="$t('liveWeb.h5.addDialog.conUrlPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.h5.addDialog.iconUrlLabel')" prop="iconUrl">
          <imageUpload v-model="form.iconUrl" path="give"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormAdd">{{$t('liveWeb.h5.addDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.h5.addDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>

    <!-- 修改h5插件对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.h5.editDialog.nameLabel')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('liveWeb.h5.editDialog.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.h5.editDialog.conUrlLabel')" prop="conUrl">
          <el-input v-model="form.conUrl" :placeholder="$t('liveWeb.h5.editDialog.conUrlPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('liveWeb.h5.editDialog.iconUrlLabel')" prop="iconUrl">
          <imageUpload v-model="form.iconUrl" path="give"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.h5.editDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.h5.editDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listH5Plugin, getH5Plugin, delH5Plugin, addH5Plugin, updateH5Plugin, exportH5Plugin } from "@/api/live-web/h5/h5Plugin";
import ImageUpload from '@/components/ImageUpload';
export default {
  name: "H5Plugin",
  components: {
    ImageUpload
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
      // h5插件表格数据
      h5PluginList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      opene: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        status: null,
        conUrl: null,
        iconUrl: null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true}
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: this.$t('liveWeb.h5.validations.name'), trigger: "blur" }
        ],
        id: [
          { required: true, message: this.$t('liveWeb.h5.validations.id'), trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询h5插件列表 */
    getList() {
      this.loading = true;
      listH5Plugin(this.queryParams).then(response => {
        this.h5PluginList = response.rows;
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
        name: null,
        status: 0,
        conUrl: null,
        iconUrl: null
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
      this.opene = true;
      this.title = this.$t('liveWeb.h5.addDialog.title');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getH5Plugin(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('liveWeb.h5.editDialog.title');
      });
    },
    /** 新增页面提交按钮 */
    submitFormAdd() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            addH5Plugin(this.form).then(response => {
              if(response.code === 0){
                this.$message.error(response.msg)
              } else {
              this.msgSuccess(this.$t('liveWeb.h5.messageBox.addSuccess'));
              this.opene = false;
              this.getList();
              }
          });
        }
      });
    },
    /** 修改页面提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
            updateH5Plugin(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.h5.messageBox.editSuccess'));
              this.open = false;
              this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;

      this.$confirm(this.$t('liveWeb.h5.confirmRemoveDialog.message', {ids: ids}), this.$t('liveWeb.h5.confirmRemoveDialog.title'), {
          confirmButtonText: this.$t('liveWeb.h5.confirmRemoveDialog.confirmButton'),
          cancelButtonText: this.$t('liveWeb.h5.confirmRemoveDialog.cancelButton'),
          type: "warning"
        }).then(function() {
          return delH5Plugin(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess(this.$t('liveWeb.h5.messageBox.removeSuccess'));
        })
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.status === '0' ? this.$t('liveWeb.h5.table.status0') : this.$t('liveWeb.h5.table.status1')

      this.$confirm(this.$t('liveWeb.h5.confirmStatusChangeDialog.message', {text: text, name: row.name}), this.$t('liveWeb.h5.confirmStatusChangeDialog.title'), {
        confirmButtonText: this.$t('liveWeb.h5.confirmStatusChangeDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.h5.confirmStatusChangeDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        var data={};
        data.id=row.id;
        data.status=row.status;
        return updateH5Plugin(data)
      }).then(() => {
        this.msgSuccess(this.$t('liveWeb.h5.messageBox.statusChangeSuccess', {text: text}))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm(this.$t('liveWeb.h5.confirmExportDialog.message'), this.$t('liveWeb.h5.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.h5.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.h5.confirmExportDialog.cancelButton'),
        type: 'warning'
        }).then(function() {
          return exportH5Plugin(queryParams);
        }).then(response => {
           this.downloadExcel(response, 'h5插件')
        }).catch(() => {
      })
    }
  }
};
</script>
