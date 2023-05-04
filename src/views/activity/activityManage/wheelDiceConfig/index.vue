<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="status">
        <el-select v-model="queryParams.status"
                   :placeholder="$t('activity.activityManage.wheelDiceConfig.statusPlaceholder')" clearable
                   size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{
            $t('activity.searchButton')
          }}
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('activity.resetButton') }}</el-button>
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
          v-hasPermi="['admin:wheelDiceConfig:add']"
        >{{ $t('activity.addButton') }}
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
          v-hasPermi="['admin:wheelDiceConfig:edit']"
        >{{ $t('activity.editButton') }}
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
          v-hasPermi="['admin:wheelDiceConfig:remove']"
        >{{ $t('activity.deleteutton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:wheelDiceConfig:export']"
        >{{ $t('activity.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelDiceConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column :label="$t('activity.activityManage.wheelDiceConfig.statusPlaceholder')" align="center"
                       prop="id"/>
      <el-table-column :label="$t('activity.activityManage.wheelDiceConfig.depositTotalMin')" align="center"
                       prop="depositTotalMin"/>
      <el-table-column :label="$t('activity.activityManage.wheelDiceConfig.depositTotalMax')" align="center"
                       prop="depositTotalMax"/>
      <el-table-column :label="$t('activity.activityManage.wheelDiceConfig.lotteryTimes')" align="center"
                       prop="lotteryTimes"/>
      <el-table-column :label="$t('activity.activityManage.wheelDiceConfig.status')" align="center" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.operation')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:wheelDiceConfig:edit']"
          >{{ $t('activity.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:wheelDiceConfig:remove']"
          >{{
              $t('activity.deleteButton')
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

    <!-- 添加或修改【抽奖配置】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item :label="$t('activity.activityManage.wheelDiceConfig.depositTotalMin')" prop="depositTotalMin">
          <el-input v-model="form.depositTotalMin" type="number" :placeholder="$t('activity.activityManage.wheelDiceConfig.depositTotalMinPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.wheelDiceConfig.depositTotalMax')" prop="depositTotalMax">
          <el-input v-model="form.depositTotalMax" type="number" :placeholder="$t('activity.activityManage.wheelDiceConfig.depositTotalMaxPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('activity.activityManage.wheelDiceConfig.lotteryTimes')" prop="lotteryTimes">
          <el-input v-model="form.lotteryTimes" type="number" :placeholder="$t('activity.activityManage.wheelDiceConfig.lotteryTimesPlaceholder')"/>
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
  listWheelDiceConfig,
  getWheelDiceConfig,
  delWheelDiceConfig,
  addWheelDiceConfig,
  updateWheelDiceConfig,
  exportWheelDiceConfig,
  changeLotteryInfoStatus
} from "@/api/activity/wheelDiceConfig";

export default {
  name: "WheelDiceConfig",
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
      // 【抽奖配置】表格数据
      wheelDiceConfigList: [],
      statusOptions: [],
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
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        depositTotalMin: [
          {required: true, message: this.$t('activity.activityManage.validation.depositTotalMin'), trigger: "blur"}
        ],
        depositTotalMax: [
          {required: true, message: this.$t('activity.activityManage.validation.depositTotalMax'), trigger: "blur"}
        ],
        lotteryTimes: [
          {required: true, message: this.$t('activity.activityManage.validation.lotteryTimes'), trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts('activityInfo_status').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    /** 查询【抽奖配置】列表 */
    getList() {
      this.loading = true;
      listWheelDiceConfig(this.queryParams).then(response => {
        this.wheelDiceConfigList = response.rows;
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
        status: 0
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
      this.title = this.$t('activity.activityManage.wheelDiceConfig.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelDiceConfig(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.activityManage.wheelDiceConfig.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelDiceConfig(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addWheelDiceConfig(this.form).then(response => {
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
      }).then(function () {
        return delWheelDiceConfig(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
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
        return changeLotteryInfoStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('global.statusEditSuccess'))
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
      }).then(function () {
        return exportWheelDiceConfig(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('global.exportResponse'));
      }).catch(() => {
      })
    }
  }
};
</script>
