<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.liveVideoClassified.queryForm.titleLabel')" prop="title">
        <el-input
          v-model="queryParams.title"
          :placeholder="$t('liveWeb.liveVideoClassified.queryForm.titlePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveVideoClassified.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveVideoClassified.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['admin:liveVideoClassified:add']"
        >{{$t('liveWeb.liveVideoClassified.actions.add')}}
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
          v-hasPermi="['admin:liveVideoClassified:edit']"
        >{{$t('liveWeb.liveVideoClassified.actions.edit')}}
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
          v-hasPermi="['admin:liveVideoClassified:remove']"
        >{{$t('liveWeb.liveVideoClassified.actions.delete')}}
        </el-button>
      </el-col>
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          plain-->
      <!--          icon="el-icon-download"-->
      <!--          size="mini"-->
      <!--          @click="handleExport"-->
      <!--          v-hasPermi="['admin:liveVideoClassified:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="liveVideoClassifiedList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="ID" align="center" prop="id"/>
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.title')" align="center" prop="title"/>
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.isEffect')" align="center" key="isEffect" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isEffect"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.sort')" align="center" prop="sort"/>
      <!--      <el-table-column label="分类图标" align="center" prop="img"/>-->
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.classfy')" align="center" prop="classfy"/>
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.isHostShow')" align="center" key="isHostShow" v-if="columns[0].visible">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isHostShow"
            active-value="1"
            inactive-value="0"
            @change="handleShowStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <!--      <el-table-column label="查询主播列表分页逻辑" align="center" prop="sortDesc"/>-->
      <el-table-column :label="$t('liveWeb.liveVideoClassified.table.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:liveVideoClassified:edit']"
          >{{$t('liveWeb.liveVideoClassified.table.editButton')}}
          </el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:liveVideoClassified:remove']"
          >{{$t('liveWeb.liveVideoClassified.table.deleteButton')}}
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

    <!-- 添加或修改分类对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="610px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.titleLabel')" prop="title">
          <el-input v-model="form.title" :placeholder="$t('liveWeb.liveVideoClassified.addEditDialog.titlePlaceholder')"/>
        </el-form-item>

        <section class="el-row">
          <div class="el-col-lg-14">
            <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.isEffectLabel')">
              <el-radio-group v-model="form.isEffect">
                <el-radio label="0">{{$t('liveWeb.liveVideoClassified.table.isEffect0')}}</el-radio>
                <el-radio label="1">{{$t('liveWeb.liveVideoClassified.table.isEffect0')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.isHostShowLabel')">
              <el-radio-group v-model="form.isHostShow">
                <el-radio label="0">{{$t('liveWeb.liveVideoClassified.table.isHostShow0')}}</el-radio>
                <el-radio label="1">{{$t('liveWeb.liveVideoClassified.table.isHostShow1')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.sortLabel')" prop="sort">
              <el-input v-model="form.sort" :placeholder="$t('liveWeb.liveVideoClassified.addEditDialog.sortPlaceholder')" type="number"/>
            </el-form-item>
            <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.classfyLabel')" prop="classfy">
              <el-input v-model="form.classfy" :placeholder="$t('liveWeb.liveVideoClassified.addEditDialog.classfyPlaceholder')" type="number"/>
            </el-form-item>
          </div>
          <div class="el-col-lg-10" style="margin-left: -35px">
            <el-form-item :label="$t('liveWeb.liveVideoClassified.addEditDialog.imgLabel')" prop="img">
              <imageUpload v-model="form.img" path="give"/>
            </el-form-item>
          </div>
        </section>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('liveWeb.liveVideoClassified.addEditDialog.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('liveWeb.liveVideoClassified.addEditDialog.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLiveVideoClassified,
  getLiveVideoClassified,
  delLiveVideoClassified,
  addLiveVideoClassified,
  updateLiveVideoClassified,
  exportLiveVideoClassified
} from "@/api/live-web/liveVideoClassified/liveVideoClassified";
import ImageUpload from '@/components/ImageUpload';

export default {
  name: "LiveVideoClassified",
  components: {ImageUpload},
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
      // 分类表格数据
      liveVideoClassifiedList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        isEffect: null,
        sort: null,
        img: null,
        classfy: null,
        isHostShow: null,
        sortDesc: null
      },
      // 列信息
      columns: [
        {key: 0, label: `状态`, visible: true},
        {key: 1, label: `主播端显示`, visible: true}
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          {required: true, message: this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.title'), trigger: "blur"}
        ],
        isEffect: [
          {required: true, message: this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.isEffect'), trigger: "blur"}
        ],
        sort: [
          {required: true, message: this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.sort'), trigger: "blur"}
        ],
        img: [
          {required: true, message: this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.img'), trigger: "blur"}
        ],
        isHostShow: [
          {required: true, message: this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.isHostShow'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询分类列表 */
    getList() {
      this.loading = true;
      listLiveVideoClassified(this.queryParams).then(response => {
        this.liveVideoClassifiedList = response.rows;
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
        title: null,
        isEffect: null,
        sort: null,
        img: null,
        classfy: null,
        isHostShow: null,
        sortDesc: null
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
      this.title = this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLiveVideoClassified(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('liveWeb.liveVideoClassified.addEditDialog.validations.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLiveVideoClassified(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveVideoClassified.messageBox.updateLiveVideoClassifiedSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addLiveVideoClassified(this.form).then(response => {
              this.msgSuccess(this.$t('liveWeb.liveVideoClassified.messageBox.addLiveVideoClassifiedSuccess'));
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
      this.$confirm(this.$t('liveWeb.liveVideoClassified.confirmDeleteDialog.message', {ids: ids}), this.$t('liveWeb.liveVideoClassified.confirmDeleteDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoClassified.confirmDeleteDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoClassified.confirmDeleteDialog.cancelButton'),
        type: "warning"
      }).then(function () {
        return delLiveVideoClassified(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('liveWeb.liveVideoClassified.messageBox.deleteSuccess'));
      })
    },
    // 状态修改
    handleStatusChange(row) {
      let text = row.isEffect === '0' ? this.$t('liveWeb.liveVideoClassified.table.isEffect0') : this.$t('liveWeb.liveVideoClassified.table.isEffect1')
      this.$confirm(this.$t('liveWeb.liveVideoClassified.confirmStatusChangeDialog.message', {text: text, title: row.title}), this.$t('liveWeb.liveVideoClassified.confirmStatusChangeDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoClassified.confirmStatusChangeDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoClassified.confirmStatusChangeDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        var data = {};
        data.id = row.id;
        data.isEffect = row.isEffect;
        return updateLiveVideoClassified(data)
      }).then(() => {
        this.msgSuccess(this.$t('liveWeb.liveVideoClassified.messageBox.statusChangeSuccess', {text: text}))
      }).catch(function () {
        row.isEffect = row.isEffect === '0' ? '1' : '0'
      })
    },
    handleShowStatusChange(row) {
      let text = row.isEffect === '0' ? this.$t('liveWeb.liveVideoClassified.table.isHostShow0') : this.$t('liveWeb.liveVideoClassified.table.isHostShow1')
      this.$confirm(this.$t('liveWeb.liveVideoClassified.confirmShowStatusChangeDialog.message', {text: text, title: row.title}), this.$t('liveWeb.liveVideoClassified.confirmShowStatusChangeDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoClassified.confirmShowStatusChangeDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoClassified.confirmShowStatusChangeDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        var data = {};
        data.id = row.id;
        data.isHostShow = row.isHostShow;
        return updateLiveVideoClassified(data)
      }).then(() => {
        this.msgSuccess(this.$t('liveWeb.liveVideoClassified.messageBox.showStatusChangeSuccess', {text: text}))
      }).catch(function () {
        row.isHostShow = row.isHostShow === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;

      this.$confirm(this.$t('liveWeb.liveVideoClassified.confirmExportDialog.message'), this.$t('liveWeb.liveVideoClassified.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveVideoClassified.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveVideoClassified.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportLiveVideoClassified(queryParams);
      }).then(response => {
        this.downloadExcel(response, '分类')
      }).catch(() => {
      })
    }
  }
};
</script>
