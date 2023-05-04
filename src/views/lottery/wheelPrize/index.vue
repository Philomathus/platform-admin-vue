<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('global.name')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lottery.wheelPrize.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.wheelPrize.form.prizeLabel')" prop="prize">
        <el-input
          v-model="queryParams.prize"
          :placeholder="$t('lottery.wheelPrize.form.prizePlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.wheelPrize.form.weightLabel')" prop="weight">
        <el-input
          v-model="queryParams.weight"
          :placeholder="$t('lottery.wheelPrize.form.weightPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.sort')" prop="odr">
        <el-input
          v-model="queryParams.odr"
          :placeholder="$t('global.sortPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.wheelPrize.form.wheelTypeLabel')" prop="wheelType">
        <el-select v-model="queryParams.wheelType" :placeholder="$t('lottery.wheelPrize.form.wheelTypePlaceholder')" clearable size="small">
          <el-option
            v-for="dict in typeList "
            :key="dict.dictValue"
            :value="parseInt(dict.dictValue)"
            :label="dict.dictLabel"
          />

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
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
          v-hasPermi="['lottery:wheelPrize:add']"
        >{{$t('global.addButton')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['lottery:wheelPrize:edit']"
        >{{$t('global.editButton')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['lottery:wheelPrize:remove']"
        >{{$t('global.deleteButton')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lottery:wheelPrize:export']"
        >{{$t('global.exportButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelPrizeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('lottery.wheelPrize.tableColumns.id')" align="center" prop="id" />
      <el-table-column :label="$t('global.name')" align="center" prop="name" />
      <el-table-column :label="$t('lottery.wheelPrize.tableColumns.prize')" align="center" prop="prize" />
      <el-table-column :label="$t('lottery.wheelPrize.tableColumns.weight')" align="center" prop="weight" />
      <el-table-column :label="$t('global.sort')" align="center" prop="odr" />
      <el-table-column :label="$t('lottery.wheelPrize.tableColumns.wheelType')" align="center" prop="wheelType" :formatter="formatterType"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lottery:wheelPrize:edit']"
          >{{$t('global.editButton')}}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lottery:wheelPrize:remove']"
          >{{$t('global.deleteButton')}}</el-button>
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

    <!-- 添加或修改转盘奖励对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('global.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('lottery.wheelPrize.dialogForm.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPrize.dialogForm.prizeLabel')" prop="prize">
          <el-input v-model="form.prize" :placeholder="$t('lottery.wheelPrize.dialogForm.prizePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPrize.dialogForm.weightLabel')" prop="weight">
          <el-input v-model="form.weight" :placeholder="$t('lottery.wheelPrize.dialogForm.weightPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('global.sort')" prop="odr">
          <el-input v-model="form.odr" :placeholder="$t('global.sortPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelPrize.dialogForm.wheelTypeLabel')" prop="wheelType">
          <el-select v-model="form.wheelType" :placeholder="$t('lottery.wheelPrize.dialogForm.wheelTypePlaceholder')" clearable size="small">
            <el-option
              v-for="dict in typeList "
              :key="dict.dictValue"
              :value="parseInt(dict.dictValue)"
              :label="dict.dictLabel"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('global.submitButton')}}</el-button>
        <el-button @click="cancel">{{$t('global.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWheelPrize, getWheelPrize, delWheelPrize, addWheelPrize, updateWheelPrize, exportWheelPrize } from "@/api/platform-web/lottery/wheelPrize";

export default {
  name: "WheelPrize",
  components: {
  },
  data() {
    return {
      typeList: [],
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
      // 转盘奖励表格数据
      wheelPrizeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        prize: null,
        weight: null,
        odr: null,
        wheelType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts('sys_wheel_type').then(response => {
      this.typeList = response.data;
    })
  },
  methods: {
    formatterType(row){
      var msg ;
      this.typeList.forEach((value, index, array) => {
        if (value.dictValue == row.wheelType) {
          msg = value.dictLabel
        }
      });
      return msg;
    },
    /** 查询转盘奖励列表 */
    getList() {
      this.loading = true;
      listWheelPrize(this.queryParams).then(response => {
        this.wheelPrizeList = response.rows;
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
        name: null,
        prize: null,
        weight: null,
        odr: null,
        wheelType: null
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
      this.title = this.$t('lottery.wheelPrize.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelPrize(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lottery.wheelPrize.updateTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelPrize(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addWheelPrize(this.form).then(response => {
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
      this.$confirm(this.$t('lottery.wheelPrize.confirmDeleteMessage', {ids: row.id}), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delWheelPrize(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lottery.wheelPrize.confirmExportMessage'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportWheelPrize(queryParams);
      }).then(response => {
        this.downloadExcel(response, "转盘奖励");
      }).catch(() => {
      })
    }
  }
};
</script>
