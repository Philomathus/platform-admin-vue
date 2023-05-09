<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="55px">
      <el-form-item :label="$t('global.memberId') " prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          :placeholder="$t('global.memberIdPlaceholder') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('global.name') " prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('global.namePlaceholder') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['admin:lotteryHistoryDice:add']"
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
          v-hasPermi="['admin:lotteryHistoryDice:edit']"
        >{{ $t('global.editButton') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:lotteryHistoryDice:export']"
        >{{ $t('global.exportButton') }}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="lotteryHistoryDiceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('global.memberId') " align="center" prop="pUserId" />
      <el-table-column :label="$t('global.name') " align="center" prop="name" />
      <el-table-column :label="$t('activity.redPacketManage.lotteryHistoryDice.tableDialog.coverImg') " align="center" prop="headImg">
        <template slot-scope="scope">
          <el-image
            style="height: 50px;"
            :src="scope.row.headImg"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.ctTime')" align="center" prop="cTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.cTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('activity.redPacketManage.lotteryHistoryDice.tableDialog.award')" align="center" prop="award" />
      <el-table-column :label="$t('global.operationColumn')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryHistoryDice:edit']"
          >{{ $t('global.editButton') }}</el-button>
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('global.memberId')" prop="pUserId">
          <el-input v-model="form.pUserId" :placeholder="$t('global.memberIdPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('global.name')" prop="name">
          <el-input v-model="form.name" :placeholder="$t('global.namePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryHistoryDice.tableDialog.coverImg')">
          <imageUpload v-model="form.headImg" path="lotteryHistoryDice"/>
        </el-form-item>
        <el-form-item :label="$t('activity.redPacketManage.lotteryHistoryDice.tableDialog.award')" prop="award">
          <el-input v-model="form.award" :placeholder="$t('activity.redPacketManage.lotteryHistoryDice.tableDialog.awardPlaceholder')" />
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
import { listLotteryHistoryDice, getLotteryHistoryDice, delLotteryHistoryDice, addLotteryHistoryDice, updateLotteryHistoryDice, exportLotteryHistoryDice } from "@/api/activity/lotteryHistoryDice";
import ImageUpload from '@/components/ImageUpload';

export default {
  name: "LotteryHistoryDice",
  components: {
    ImageUpload
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
      lotteryHistoryDiceList: [],
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
        headImg: null,
        cTime: null,
        award: null,
        type: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        pUserId: [
          { required: true, message: this.$t('activity.redPacketManage.lotteryHistoryDice.validation.pUserId'), trigger: 'blur' }
        ],
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
      listLotteryHistoryDice(this.queryParams).then(response => {
        this.lotteryHistoryDiceList = response.rows;
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
        headImg: null,
        cTime: null,
        award: null,
        type: null
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
      this.title = this.$t('activity.redPacketManage.lotteryHistoryDice.addTitle');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryHistoryDice(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('activity.redPacketManage.lotteryHistoryDice.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryHistoryDice(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addLotteryHistoryDice(this.form).then(response => {
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
        return delLotteryHistoryDice(ids);
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
        type: 'warning'
      }).then(function() {
        return exportLotteryHistoryDice(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('activity.redPacketManage.lotteryHistoryDice.exportTitle'));
      }).catch(() => {
      })
    }
  }
};
</script>
