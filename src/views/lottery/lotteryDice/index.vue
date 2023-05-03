<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('global.name')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lottery.lotteryDice.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['admin:wheelDice:add']"
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
          v-hasPermi="['admin:wheelDice:edit']"
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
          v-hasPermi="['admin:wheelDice:remove']"
        >{{$t('global.deleteButton')}}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:wheelDice:export']"
        >{{$t('global.exportButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelDiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.id')" align="center" prop="id" />
      <el-table-column :label="$t('global.name')" align="center" prop="name" />
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.prize.label')" align="center" prop="prize" >
        <template slot="header">
          <span>{{$t('lottery.lotteryDice.tableColumns.prize.spanName')}}</span>
          <el-tooltip popper-class="tooltip" placement="top">
            <i class="el-icon-question"></i>
            <div slot="content" class="tooltip-content">
              <div>{{$t('lottery.lotteryDice.tableColumns.prize.tooltipContent')}}</div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.type')" align="center" prop="type" :formatter="typeFormat" >
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.description.label')" align="center" prop="des" >
        <template slot="header">
          <span>{{$t('lottery.lotteryDice.tableColumns.description.spanName')}}</span>
          <el-tooltip popper-class="tooltip" placement="top">
            <i class="el-icon-question"></i>
            <div slot="content" class="tooltip-content">
              <div>{{$t('lottery.lotteryDice.tableColumns.description.tooltipContent')}}</div>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.weight')" align="center" prop="weight" />
      <el-table-column :label="$t('lottery.lotteryDice.tableColumns.sort')" align="center" prop="odr" />
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:wheelDice:edit']"
          >{{$t('global.editButton')}}</el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:wheelDice:remove']"
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

    <!-- 添加或修改中秋博饼对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="570px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="padding-right: 20px">
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.nameLabel')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('lottery.lotteryDice.dialogForm.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.prizeLabel')" prop="prize">
          <el-input v-model="form.prize" type="number" :placeholder="$t('lottery.lotteryDice.dialogForm.prizePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.weightLabel')" prop="weight">
          <el-input v-model="form.weight" type="number" :placeholder="$t('lottery.lotteryDice.dialogForm.weightPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.typeLabel')" prop="type">
          <el-select v-model="form.type" :placeholder="$t('lottery.lotteryDice.dialogForm.typePlaceholder')">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.descriptionLabel')" prop="des">
          <el-input v-model="form.des"  type="number" :placeholder="$t('lottery.lotteryDice.dialogForm.descriptionPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDice.dialogForm.diceValueLabel')" prop="diceValue">
          <el-input v-model="form.diceValue" :placeholder="$t('lottery.lotteryDice.dialogForm.diceValuePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('global.sort')" prop="odr">
          <el-input v-model="form.odr" type="number" :placeholder="$t('global.sortPlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-right: 20px">
        <el-button type="primary" @click="submitForm">{{$t('global.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('global.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWheelDice, getWheelDice, delWheelDice, addWheelDice, updateWheelDice, exportWheelDice } from "@/api/activity/wheelDice";

export default {
  name: "WheelDice",
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
      // 中秋博饼表格数据
      wheelDiceList: [],
      // 类型(1返现打码,2坐骑)字典
      typeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyName') , trigger: "blur"}
        ],
        prize: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyPrize'), trigger: "blur"}
        ],
        weight: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyWeight'), trigger: "blur"}
        ],
        odr: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptySort'), trigger: "blur"}
        ],
        des: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyDescription'), trigger: "blur"}
        ],
        diceValue: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyDiceValue'), trigger: "blur"}
        ],
        type: [
          {required: true, message: this.$t('lotteryBet.validationMessages.emptyType'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("award_type").then(response => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询中秋博饼列表 */
    getList() {
      this.loading = true;
      listWheelDice(this.queryParams).then(response => {
        this.wheelDiceList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 类型(1返现打码,2坐骑)字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.type);
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        name: null,
        prize: null,
        weight: null,
        odr: null
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
      this.title = this.$t('lotteryBet.popUpTitle.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelDice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lotteryBet.popUpTitle.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelDice(this.form).then(response => {
              this.msgSuccess(this.$t('lotteryBet.responseMessages.editSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addWheelDice(this.form).then(response => {
              this.msgSuccess(this.$t('lotteryBet.responseMessages.addedSuccess'));
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

      this.$confirm(this.$t('lottery.lotteryDice.confirmDeleteDialog.message', {ids: row.ids}), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delWheelDice(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('lotteryBet.responseMessages.deleteSuccess'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lotteryBet.confirmExportDialog.message'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportWheelDice(queryParams);
      }).then(response => {
        this.downloadExcel(response, '中秋博饼');
      }).catch(() => {
      })
    }
  }
};
</script>
