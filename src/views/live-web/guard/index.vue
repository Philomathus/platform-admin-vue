<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.guard.queryForm.specificationsLabel')" prop="specifications">
        <el-input
          v-model="queryParams.specifications"
          :placeholder="$t('liveWeb.guard.queryForm.specificationsPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.guard.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.guard.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveGuardConfig:add']"
        >{{$t('liveWeb.guard.actions.add')}}
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
          v-hasPermi="['admin:liveGuardConfig:edit']"
        >{{$t('liveWeb.guard.actions.update')}}
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
          v-hasPermi="['admin:liveGuardConfig:remove']"
        >{{$t('liveWeb.guard.actions.remove')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveGuardConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.guard.table.specifications')" align="center" prop="specifications"/>
      <el-table-column :label="$t('liveWeb.guard.table.month')" align="center" prop="month"/>
      <el-table-column :label="$t('liveWeb.guard.table.price')" align="center" prop="price"/>
      <el-table-column :label="$t('liveWeb.guard.table.type')" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column :label="$t('liveWeb.guard.table.propId')" align="center" prop="propId"/>
      <el-table-column :label="$t('liveWeb.guard.table.discountPrice')" align="center" prop="discountPrice"/>
      <el-table-column :label="$t('liveWeb.guard.table.giveday')" align="center" prop="giveday"/>
      <el-table-column :label="$t('liveWeb.guard.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveGuardConfig:edit']"
          >{{$t('liveWeb.guard.table.editButton')}}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveGuardConfig:remove']"
          >{{$t('liveWeb.guard.table.removeButton')}}
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

    <!-- 添加或修改对话框 Add or modify dialogs-->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="550px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.specificationsLabel')" prop="specifications">
          <el-input v-model="form.specifications" :placeholder="$t('liveWeb.guard.addUpdateDialog.specificationsPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.monthLabel')" prop="month">
          <el-input v-model="form.month" :placeholder="$t('liveWeb.guard.addUpdateDialog.monthPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.priceLabel')" prop="price">
          <el-input v-model="form.price" :placeholder="$t('liveWeb.guard.addUpdateDialog.pricePlaceholder')"/>
        </el-form-item>
        <div class="el-row">
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.typeLabel')">
              <el-select v-model="form.type" :placeholder="$t('liveWeb.guard.addUpdateDialog.typePlaceholder')">
                <el-option
                  v-for="dict in guardOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="el-col-lg-12">
            <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.propIdLabel')">
              <el-select v-model="form.propId" :placeholder="$t('liveWeb.guard.addUpdateDialog.propIdPlaceholder')">
                <el-option
                  v-for="dict in propIdOptions"
                  :key="dict.id"
                  :label="dict.name"
                  :value="dict.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.discountPriceLabel')" prop="discountPrice">
          <el-input v-model="form.discountPrice" :placeholder="$t('liveWeb.guard.addUpdateDialog.discountPricePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('liveWeb.guard.addUpdateDialog.givedayLabel')" prop="giveday">
          <el-input v-model="form.giveday" :placeholder="$t('liveWeb.guard.addUpdateDialog.givedayPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.guard.addUpdateDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.guard.addUpdateDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProp,
  listLiveGuardConfig,
  getLiveGuardConfig,
  delLiveGuardConfig,
  addLiveGuardConfig,
  updateLiveGuardConfig,
  exportLiveGuardConfig
} from "@/api/live-web/guard/liveGuardConfig";

export default {
  name: "LiveGuardConfig",
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
      // 表格数据
      liveGuardConfigList: [],
      guardOptions: [],
      propIdOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        specifications: null,
        month: null,
        price: null,
        type: null,
        propId: null,
        discountPrice: null,
        giveday: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    };
  },
  created() {
    this.getList();
    this.getDicts('guard_type').then(response => {
      this.guardOptions = response.data
    })
    getProp().then(response => {
      this.propIdOptions = response.rows
    })

  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true;
      listLiveGuardConfig(this.queryParams).then(response => {
        this.liveGuardConfigList = response.rows;
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
        specifications: null,
        month: null,
        price: null,
        type: null,
        propId: null,
        discountPrice: null,
        giveday: null
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
      this.title = this.$t('liveWeb.guard.addUpdateDialog.titleAdd');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveGuardConfig(id).then(response => {
        this.form = response.data;
        this.form.type = "" + this.form.type
        this.open = true;
        this.title = this.$t('liveWeb.guard.addUpdateDialog.titleUpdate');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveGuardConfig(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.guard.messageBox.updateLiveGuardConfigSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveGuardConfig(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.guard.messageBox.addLiveGuardConfigSuccess'));
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
      this.$confirm(this.$t('liveWeb.guard.confirmRemoveDialog.message', {ids: ids}), this.$t('liveWeb.guard.confirmRemoveDialog.title'), {
        confirmButtonText: this.$t('liveWeb.guard.confirmRemoveDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.guard.confirmRemoveDialog.cancelButton'),
        type: "warning"
      }).then(function () {
        return delLiveGuardConfig(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('liveWeb.guard.messageBox.removeLiveGuardConfigSuccess'));
      })
    },
    typeFormat(row, column) {
      if (row.type == "1") {
        return this.$t('liveWeb.guard.table.type1');
      } else {
        return this.$t('liveWeb.guard.table.typeOthers');
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('liveWeb.guard.confirmExportDialog.message'), this.$t('liveWeb.guard.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.guard.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.guard.confirmExportDialog.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportLiveGuardConfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, '守护')
      }).catch(() => {
      })
    }
  }
};
</script>
