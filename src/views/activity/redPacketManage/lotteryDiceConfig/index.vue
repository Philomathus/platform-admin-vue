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
          v-hasPermi="['admin:lotteryDiceConfig:add']"
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
          v-hasPermi="['admin:lotteryDiceConfig:edit']"
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
          v-hasPermi="['admin:lotteryDiceConfig:remove']"
        >{{ $t('global.deleteButton') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryDiceConfig:export']"
        >{{ $t('global.exportButton') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryDiceConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMin')" align="center" prop="depositTotalMin" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMax')" align="center" prop="depositTotalMax" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.lotteryTimes')" align="center" prop="lotteryTimes" />
      <el-table-column :label="$t('global.status')" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryDiceConfig:edit']"
          >{{ $t('global.editButton') }}</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:lotteryDiceConfig:remove']"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.type')" prop="type">
          <el-input v-model="form.type" :placeholder="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.typePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMin')" prop="depositTotalMin">
          <el-input v-model="form.depositTotalMin" :placeholder="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMinPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMaxPlaceholder')" prop="depositTotalMax">
          <el-input v-model="form.depositTotalMax" :placeholder="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.depositTotalMaxPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.lotteryTimes')" prop="lotteryTimes">
          <el-input v-model="form.lotteryTimes" :placeholder="$t('activity.redPacketManage.lotteryDiceConfig.tableDialog.lotteryTimesPlaceholder')" />
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
import { listLotteryDiceConfig, getLotteryDiceConfig, delLotteryDiceConfig, addLotteryDiceConfig, updateLotteryDiceConfig, exportLotteryDiceConfig, changeStatus } from "@/api/activity/lotteryDiceConfig";

export default {
  name: "LotteryDiceConfig",
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
      lotteryDiceConfigList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        depositTotalMin: null,
        depositTotalMax: null,
        lotteryTimes: null,
        status: null,
        type: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          { required: true, message: this.$t('activity.redPacketManage.lotteryDiceConfig.validation.type'), trigger: 'blur' }
        ],
        depositTotalMin: [
          { required: true, message: this.$t('activity.redPacketManage.lotteryDiceConfig.validation.depositTotalMin'), trigger: 'blur' }
        ],
        depositTotalMax: [
          { required: true, message: this.$t('activity.redPacketManage.lotteryDiceConfig.validation.depositTotalMax'), trigger: 'blur' }
        ],
        lotteryTimes: [
          { required: true, message: this.$t('activity.redPacketManage.lotteryDiceConfig.validation.lotteryTimes'), trigger: 'blur' }
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
      listLotteryDiceConfig(this.queryParams).then(response => {
        this.lotteryDiceConfigList = response.rows;
        this.lotteryDiceConfigList.forEach(value => {value.status= value.status + ''})
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
        depositTotalMin: null,
        depositTotalMax: null,
        lotteryTimes: null,
        status: 0,
        type: 1
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
      this.title = this.$t('activity.redPacketManage.lotteryDiceConfig.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryDiceConfig(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.redPacketManage.lotteryDiceConfig.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryDiceConfig(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryDiceConfig(this.form).then(response => {
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
      this.$confirm(this.$t('global.deleteConfirm') + row.name + '"?', this.$t('global.deleteConfirmTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delLotteryDiceConfig(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    //修改状态
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
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('global.confirmExport'), this.$t('global.confirmExportTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportLotteryDiceConfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, '【请填写功能名称】');
      }).catch(() => {
      })
    }
  }
};
</script>
