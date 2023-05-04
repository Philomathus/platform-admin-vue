<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('lottery.wheelHistory.form.pUserIdLabel')" prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          :placeholder="$t('lottery.wheelHistory.form.pUserIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.nickname')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('global.nicknamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.wheelHistory.form.prizeLabel')" prop="prize">
        <el-input
          v-model="queryParams.prize"
          :placeholder="$t('lottery.wheelHistory.form.prizePlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="时间" prop="cTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.cTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item :label="$t('global.selectDatePlaceholder')" prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" :start-placeholder="$t('global.dateTimePickerStartTimePlaceholder')"
                        :end-placeholder="$t('global.dateTimePickerEndTimePlaceholder')"
                        :range-separator="$t('global.dateTimePickerRangeSeparator')" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('lottery.wheelHistory.form.wheelTypeLabel')" prop="wheelType">
        <el-select v-model="queryParams.wheelType" :placeholder="$t('lottery.wheelHistory.form.wheelTypePlaceholder')" clearable size="small">
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
      <!--<el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['lottery:wheelHistory:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['lottery:wheelHistory:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['lottery:wheelHistory:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lottery:wheelHistory:export']"
        >{{$t('global.exportButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="wheelHistoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column :label="$t('lottery.wheelHistory.tableColumns.pUserId')" align="center" prop="puserId" />
      <el-table-column :label="$t('global.nickname')" align="center" prop="name" />
      <el-table-column :label="$t('lottery.wheelHistory.tableColumns.prize')" align="center" prop="prize" />
      <el-table-column :label="$t('lottery.wheelHistory.tableColumns.cTime')" align="center" prop="cTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('lottery.wheelHistory.tableColumns.wheelType')" align="center" prop="wheelType" :formatter="formatterType"/>
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['lottery:wheelHistory:edit']"-->
<!--          >修改</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['lottery:wheelHistory:remove']"-->
<!--          >删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改转盘中奖历史对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('lottery.wheelHistory.dialogForm.pUserIdLabel')" prop="pUserId">
          <el-input v-model="form.pUserId" :placeholder="$t('lottery.wheelHistory.dialogForm.pUserIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('global.nickname')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('global.nicknamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelHistory.dialogForm.prizeLabel')" prop="prize">
          <el-input v-model="form.prize" :placeholder="$t('lottery.wheelHistory.dialogForm.prizePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelHistory.dialogForm.cTimeLabel')" prop="cTime">
          <el-date-picker clearable size="small"
            v-model="form.cTime"
            type="date"
            value-format="yyyy-MM-dd"
            :placeholder="$t('lottery.wheelHistory.dialogForm.cTimePlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('lottery.wheelHistory.dialogForm.wheelTypeLabel')" prop="wheelType">
          <el-select v-model="form.wheelType" :placeholder="$t('lottery.wheelHistory.dialogForm.wheelTypePlaceholder')">
            <el-option :label="$t('lottery.wheelHistory.dialogForm.optionLabel')" value="" />
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
import { listWheelHistory, getWheelHistory, delWheelHistory, addWheelHistory, updateWheelHistory, exportWheelHistory } from "@/api/platform-web/lottery/wheelHistory";

export default {
  name: "WheelHistory",
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
      // 转盘中奖历史表格数据
      wheelHistoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pUserId: null,
        name: null,
        prize: null,
        cTime: null,
        wheelType: null,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        orderByColumn: 'cTime',
        isAsc: 'desc'
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
    /** 查询转盘中奖历史列表 */
    getList() {
      this.loading = true;
      listWheelHistory(this.queryParams).then(response => {
        this.wheelHistoryList = response.rows;
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
        pUserId: null,
        name: null,
        prize: null,
        cTime: null,
        wheelType: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.pUserId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.pUserId.match(reg)
        if(!flag){
          this.msgError(this.$t('lottery.wheelHistory.queryErrorMessage'));
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
      this.title = this.$t('lottery.wheelHistory.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWheelHistory(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lottery.wheelHistory.updateTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWheelHistory(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.wheelHistory.updateSuccessMessage'));
              this.open = false;
              this.getList();
            });
          } else {
            addWheelHistory(this.form).then(response => {
              this.msgSuccess(this.$t('lottery.wheelHistory.addSuccessMessage'));
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
      this.$confirm(this.$t('lottery.wheelHistory.confirmDeleteMessage', {ids: row.id}), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function() {
        return delWheelHistory(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('lottery.wheelHistory.deleteSuccessMessage'));
      }).catch(() => {
	  })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm(this.$t('lottery.wheelHistory.confirmExportMessage'), this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportWheelHistory(queryParams);
      }).then(response => {
        this.downloadExcel(response, '转盘中奖历史')
      }).catch(() => {
      })
    }
  }
};
</script>
