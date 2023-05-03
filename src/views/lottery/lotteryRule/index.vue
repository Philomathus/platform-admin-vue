<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item :label="$t('lottery.lotteryRule.form.kindLabel')" prop="kind">
        <el-select v-model="queryParams.kind" :placeholder="$t('lottery.lotteryRule.form.kindPlaceholder')" clearable size="small">
          <el-option
            v-for="item in kindOptions"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryRule.form.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lottery.lotteryRule.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
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
          v-hasPermi="['admin:lotteryRule:add']">{{$t('global.addButton')}}
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
          v-hasPermi="['admin:lotteryRule:edit']">{{$t('global.editButton')}}
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
          v-hasPermi="['admin:lotteryRule:remove']">{{$t('global.deleteButton')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryRule:export']">{{$t('global.exportButton')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryRuleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('lottery.lotteryRule.tableColumns.kind')" align="center" prop="kind" width="120px" :formatter="formatterKind"/>
      <el-table-column :label="$t('lottery.lotteryRule.tableColumns.name')" align="center" prop="name" width="120px"/>
      <el-table-column :label="$t('lottery.lotteryRule.tableColumns.des')" align="center" prop="des"/>
      <el-table-column :label="$t('lottery.lotteryRule.tableColumns.ind')" align="center" prop="ind" width="80px"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" width="120px" class-name="small-padding fixed-width">
        <template v-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryRule:edit']">{{$t('global.editButton')}}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:lotteryRule:remove']">{{$t('global.deleteButton')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改开奖规则说明对话框 Add or modify lottery rules description dialog-->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="550px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item :label="$t('lottery.lotteryRule.dialogForm.kindLabel')" prop="kind" v-if="form.id == null">
          <el-select
            filterable
            v-model="form.kind"
            :placeholder="$t('lottery.lotteryRule.dialogForm.kindPlaceholder')"
            clearable
            size="small"
            style="width: 410px">
            <el-option
              v-for="dict in kindOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryRule.dialogForm.nameLabel')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('lottery.lotteryRule.dialogForm.namePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryRule.dialogForm.indLabel')" prop="ind">
          <el-input v-model="form.ind" :placeholder="$t('lottery.lotteryRule.dialogForm.indPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryRule.dialogForm.desLabel')" prop="des">
          <el-input v-model="form.des" type="textarea" :placeholder="$t('lottery.lotteryRule.dialogForm.desPlaceholder')"/>
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
import {
  listLotteryRule,
  getLotteryRule,
  delLotteryRule,
  addLotteryRule,
  updateLotteryRule,
  exportLotteryRule
} from "@/api/platform-web/lottery/lotteryRule";

export default {
  name: "LotteryRule",
  components: {},
  data() {
    return {
      //所属彩种字典
      kindOptions: [],
      kind: [],
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
      // 开奖规则说明表格数据
      lotteryRuleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
        des: null,
        orderByColumn: 'ind',
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
    this.getDicts('lotteryRule_kind').then(response => {
      this.kindOptions = response.data
    })
  },
  methods: {
    /** 查询开奖规则说明列表 */
    getList() {
      this.loading = true;
      listLotteryRule(this.queryParams).then(response => {
        this.lotteryRuleList = response.rows;
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
        des: null
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
      this.title = this.$t('lottery.lotteryRule.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryRule(id).then(response => {
        this.form = response.data;
        this.form.kind = this.form.kind + ''
        this.open = true;
        this.title = this.$t('lottery.lotteryRule.updateTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryRule(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryRule.updateSuccessMessage'));
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryRule(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryRule.addSuccessMessage'));
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
      this.$confirm(this.$t('lottery.lotteryRule.confirmDeleteMessage',row.id), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return delLotteryRule(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lottery.lotteryRule.confirmExportMessage'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return exportLotteryRule(queryParams);
      }).then(response => {
        (response.msg);
      }).catch(() => {
      })
    },
    formatterKind(row) {
      return this.selectDictLabel(this.kindOptions, row.kind)
    }
  }
};
</script>
