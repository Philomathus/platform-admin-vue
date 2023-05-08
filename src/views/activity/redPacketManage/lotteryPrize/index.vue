<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['admin:lotteryPrize:add']"
        >{{ $t('global.addButton') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['admin:lotteryPrize:edit']"
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
          v-hasPermi="['admin:lotteryPrize:remove']"
        >{{ $t('global.deleteButton') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryPrize:export']"
        >{{ $t('global.exportButton') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryPrizeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.id')" align="center" prop="id" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeName')" align="center" prop="prizeName" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prize')" align="center" prop="prize" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeWeight')" align="center" prop="prizeWeight" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeAmount')" align="center" prop="prizeAmount" />
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryPrize:edit']"
          >{{ $t('global.editButton') }}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:lotteryPrize:remove']"
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.type')" prop="type">
          <el-input v-model="form.type" :placeholder="$t('activity.redPacketManage.lotteryPrize.tableDialog.typePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeName')" prop="prizeName">
          <el-input v-model="form.prizeName" :placeholder="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prize')" prop="prize">
          <el-input v-model="form.prize" :placeholder="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeWeight')" prop="prizeWeight">
          <el-input v-model="form.prizeWeight" :placeholder="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeWeightPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeAmount')" prop="prizeAmount">
          <el-input v-model="form.prizeAmount" :placeholder="$t('activity.redPacketManage.lotteryPrize.tableDialog.prizeAmountPlaceholder')" />
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
import { listLotteryPrize, getLotteryPrize, delLotteryPrize, addLotteryPrize, updateLotteryPrize, exportLotteryPrize } from "@/api/activity/lotteryPrize";

export default {
  name: "LotteryPrize",
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
      // 【请填写功能名称】表格数据
      lotteryPrizeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prizeName: null,
        prize: null,
        prizeWeight: null,
        type: null,
        prizeAmount: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          { required: true, message: this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.validation.type'), trigger: 'blur' }
        ],
        prizeName: [
          { required: true, message: this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.validation.prizeName'), trigger: 'blur' }
        ],
        prize: [
          { required: true, message: this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.validation.prize'), trigger: 'blur' }
        ],
        prizeWeight: [
          { required: true, message: this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.validation.prizeWeight'), trigger: 'blur', pattern:'^[1-9]$' }
        ],
        prizeAmount: [
          { required: true, message: this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.validation.prizeAmount'), trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listLotteryPrize(this.queryParams).then(response => {
        this.lotteryPrizeList = response.rows;
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
        prizeName: null,
        prize: null,
        prizeWeight: null,
        type: 1,
        prizeAmount: null
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
      this.title = this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryPrize(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.redPacketManage.activityCashBack.lotteryPrize.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryPrize(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryPrize(this.form).then(response => {
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
      this.$confirm(this.$t('global.deleteConfirm') + ids + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delLotteryPrize(ids);
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
      }).then(function() {
        return exportLotteryPrize(queryParams);
      }).then(response => {
        this.downloadExcel(response, '【请填写功能名称】');
      }).catch(() => {
      })
    }
  }
};
</script>
