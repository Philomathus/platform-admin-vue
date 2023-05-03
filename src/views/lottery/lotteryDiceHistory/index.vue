<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item  prop="cTime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.cTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('lottery.lotteryDiceHistory.form.datePickerPlaceholder')"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          :placeholder="$t('lottery.lotteryDiceHistory.form.pUserIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lottery.lotteryDiceHistory.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="diceName">
        <el-input
          v-model="queryParams.diceName"
          :placeholder="$t('lottery.lotteryDiceHistory.form.diceNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="diceId">
        <el-input
          v-model="queryParams.diceId"
          :placeholder="$t('lottery.lotteryDiceHistory.form.diceIdPlaceholder')"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:wheelHistoryDice:export']"
        >{{$t('global.exportButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelHistoryDiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.id')" align="center" prop="id" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.pUserId')" align="center" prop="puserId" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.name')" align="center" prop="name" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.diceName')" align="center" prop="diceName" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.diceValue')" align="center" prop="diceValue" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.diceId')" align="center" prop="diceId" />
      <el-table-column :label="$t('lottery.lotteryDiceHistory.tableColumns.cTime')" align="center" prop="cTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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

    <!-- 添加或修改博饼中奖记录对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.pUserIdLabel')" prop="pUserId">
          <el-input v-model="form.puserId" :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.pUserIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.nameLabel')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.diceNameLabel')" prop="diceName">
          <el-input v-model="form.diceName" :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.diceNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.cTimeLabel')" prop="cTime">
          <el-date-picker clearable size="small"
            v-model="form.cTime"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.datePickerPlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.diceValueLabel')" prop="diceValue">
          <el-input v-model="form.diceValue" :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.diceValuePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.lotteryDiceHistory.dialogForm.diceIdLabel')" prop="diceId">
          <el-input v-model="form.diceId" :placeholder="$t('lottery.lotteryDiceHistory.dialogForm.diceIdPlaceholder')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('global.confirmButton')}}}</el-button>
        <el-button @click="cancel">{{$t('global.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listWheelHistoryDice, getWheelHistoryDice, delWheelHistoryDice, addWheelHistoryDice, updateWheelHistoryDice, exportWheelHistoryDice } from "@/api/activity/wheelHistoryDice";
import { pickerDateShortcuts, toyesDayshortcuts } from '@/utils/dateUtils'
export default {
  name: "WheelHistoryDice",
  components: {
  },
  data() {
    return {
      pickerOptions: {shortcuts: toyesDayshortcuts},
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
      // 博饼中奖记录表格数据
      wheelHistoryDiceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        puserId: null,
        name: null,
        diceName: null,
        cTime: this.parseTime(new Date(), '{y}-{m}-{d}'),
        diceId: null
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
  },
  methods: {
    /** 查询博饼中奖记录列表 */
    getList() {
      this.loading = true;
      listWheelHistoryDice(this.queryParams).then(response => {
        this.wheelHistoryDiceList = response.rows;
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
        puserId: null,
        name: null,
        diceName: null,
        cTime: null,
        diceValue: null,
        diceId: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.pUserId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.pUserId.match(reg)
        if(!flag){
          this.msgError(this.$t('lottery.lotteryDiceHistory.responseMessages.pUserIdFormatError'))
          return
        }
      }
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
      this.title = this.$t('lottery.lotteryDiceHistory.titleMessages.add');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelHistoryDice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lottery.lotteryDiceHistory.titleMessages.update');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelHistoryDice(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryDiceHistory.responseMessages.updateWheelHistoryDiceSuccess'));
              this.open = false;
              this.getList();
            });
          } else {
            addWheelHistoryDice(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.lotteryDiceHistory.responseMessages.addWheelHistoryDiceSuccess'));
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
      this.$confirm(this.$t('lottery.lotteryDiceHistory.confirmDeleteDialog.message', {ids: row.id}), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delWheelHistoryDice(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('lottery.lotteryDiceHistory.responseMessages.deleteWheelHistoryDiceSuccess'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lottery.lotteryDiceHistory.confirmExportDialog.message'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return exportWheelHistoryDice(queryParams);
      }).then(response => {
        this.downloadExcel(response, '博饼中奖记录');
      }).catch(() => {
      })
    }
  }
};
</script>
