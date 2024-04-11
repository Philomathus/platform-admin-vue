<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-button v-for="button in Object.values(BUTTONS_GUTTER)"
                 @click="button.HANDLER"
                 :type="button.TYPE"
                 :icon="button.ICON"
                 :size="button.SIZE"> {{ button.LABEL }}
      </el-button>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"/>
    </el-row>

    <el-table stripe v-loading="loading" :data="withdrawCashBackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column v-for="column in Object.values(QUERY_TABLE_COLUMNS)"
                       :key="column.PROP"
                       :prop="column.PROP"
                       :label="column.LABEL"
                       :min-width="column.WIDTH"
                       align="center">
        <template v-slot:default="scope">
          <el-switch v-if="column.PROP === QUERY_TABLE_COLUMNS.STATUS.PROP"
                     v-model="scope.row[column.PROP]"
                     :active-value="1"
                     :inactive-value="0"
                     @change="handleStatusChange(scope.row)">
          </el-switch>
          <span v-else>{{ scope.row[column.PROP] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-for="button in Object.values(BUTTONS_ACTION)"
                     @click="() => button.HANDLER(scope.row)"
                     :type="button.TYPE"
                     :icon="button.ICON"
                     :size="button.SIZE"> {{ button.LABEL }}
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
    <el-dialog :visible.sync="open" :title="title" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item v-for="item in Object.values(QUERY_TABLE_COLUMNS)" :label="item.LABEL" :prop="item.PROP">
          <el-select v-if="item.PROP === QUERY_TABLE_COLUMNS.BANK_CODE.PROP" v-model="form.bankCode">
            <el-option
              v-for="bank in bankCodeList"
              :key="bank.code"
              :label="bank.code"
              :value="bank.code"/>
          </el-select>
          <el-input v-else v-model="form[item.PROP]" type="number"
                    v-show="item.PROP !== QUERY_TABLE_COLUMNS.STATUS.PROP"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addActivityWithdrawCashBack,
  changeStatus,
  deleteActivityWithdrawCashBack,
  getActivityWithdrawCashBack,
  getConfigBankList,
  listActivityWithdrawCashBack,
  updateActivityWithdrawCashBack
} from "@/api/activity/activityWithdrawCashBack";

const TEXT = {
  BTN_LABEL_ADD: '添加',
  BTN_LABEL_DELETE: '删除',
  BTN_LABEL_EDIT: '编辑',
  BTN_TYPE_PRIMARY: 'primary',
  BTN_TYPE_WARNING: 'warning',
  BTN_TYPE_TEXT: 'text',
  BTN_ICON_PLUS: 'Plus',
  BTN_ICON_EDIT: 'el-icon-edit',
  BTN_ICON_DELETE: 'el-icon-delete',
  BTN_SIZE_SMALL: 'small',
};

export default {
  name: "ActivityWithdrawCashBack",
  components: {},
  data() {
    return {
      BUTTONS_GUTTER: {
        ADD: {
          TYPE: TEXT.BTN_TYPE_PRIMARY,
          ICON: TEXT.BTN_ICON_PLUS,
          SIZE: TEXT.BTN_SIZE_SMALL,
          LABEL: TEXT.BTN_LABEL_ADD,
          HANDLER: this.handleAdd
        },
        DELETE: {
          TYPE: TEXT.BTN_TYPE_WARNING,
          ICON: TEXT.BTN_ICON_DELETE,
          SIZE: TEXT.BTN_SIZE_SMALL,
          LABEL: TEXT.BTN_LABEL_DELETE,
          HANDLER: this.handleDelete
        },
      },
      BUTTONS_ACTION: {
        EDIT: {
          TYPE: TEXT.BTN_TYPE_TEXT,
          ICON: TEXT.BTN_ICON_EDIT,
          SIZE: TEXT.BTN_SIZE_SMALL,
          LABEL: TEXT.BTN_LABEL_EDIT,
          HANDLER: this.handleUpdate
        },
        DELETE: {
          TYPE: TEXT.BTN_TYPE_TEXT,
          ICON: TEXT.BTN_ICON_DELETE,
          SIZE: TEXT.BTN_SIZE_SMALL,
          LABEL: TEXT.BTN_LABEL_DELETE,
          HANDLER: this.handleDelete
        },
      },
      QUERY_TABLE_COLUMNS: {
        BANK_CODE: {PROP: 'bankCode', WIDTH: '90px', LABEL: '银行代码'},
        WITHDRAW_TOTAL_MIN: {PROP: 'withdrawTotalMin', WIDTH: '90px', LABEL: '最小提款额'},
        WITHDRAW_TOTAL_MAX: {PROP: 'withdrawTotalMax', WIDTH: '90px', LABEL: '最大提款额'},
        RATE: {PROP: 'rate', WIDTH: '90px', LABEL: '彩金比例'},
        BCODE_RATE: {PROP: 'bcodeRate', WIDTH: '90px', LABEL: '打码比例'},
        STATUS: {PROP: 'status', WIDTH: '90px', LABEL: '状态'},
      },
      loading: true,
      bankCodes: [],
      showSearch: true,
      total: 0,
      withdrawCashBackList: [],
      existingBanks: [],
      bankCodeList: [],
      title: null,
      open: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        withdrawTotalMin: null,
        withdrawTotalMax: null,
        status: null
      },
      form: {},
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    handleSelectionChange(selection) {
      this.bankCodes = selection.map(item => item.bankCode)
    },
    async fetchBankCodeList() {
      try {
        const res = await getConfigBankList();
        const existingBanks = this.withdrawCashBackList.map(data => data.bankCode)
        console.log(res.data)
        this.bankCodeList = res.data.filter(data => !existingBanks.includes(data.code));
      } catch (error) {
        this.handleError(error);
      }
    },
    handleStatusChange(row) {
      changeStatus(row.bankCode, row.status)
    },
    handleUpdate(row) {
      this.reset();
      this.fetchBankCodeList();
      getActivityWithdrawCashBack(row.bankCode).then(response => {
        this.form = response.data;
        this.title = '编辑';
        this.open = true;
      });
    },
    handleDelete(row) {
      const bankCodes = row.bankCode || this.bankCodes;
      this.$confirm(this.$t('global.deleteConfirm') + bankCodes + '"?', '', {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: "warning"
      }).then(function () {
        return deleteActivityWithdrawCashBack(bankCodes);
      }).then(() => {
        this.getList();
        this.msgSuccess(this.$t('global.deleteSuccessMsg'));
      }).catch(() => {
      })
    },
    initialize() {
      this.getList();
    },
    async getList() {
      try {
        this.loading = true;
        const response = await listActivityWithdrawCashBack(this.queryParams);
        this.withdrawCashBackList = response.rows;
        this.total = response.total;
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams.pageNum = 1;
      this.getList();
    },
    submitForm() {
      if (this.title === '编辑') {
        updateActivityWithdrawCashBack(this.form).then(response => {
          this.msgSuccess(this.$t('global.editSuccessMsg'));
          this.open = false;
          this.getList();
        });
      } else {
        addActivityWithdrawCashBack(this.form).then(response => {
          this.msgSuccess(this.$t('global.addSuccessMsg'));
          this.open = false;
          this.getList();
        });
      }
    },
    handleAdd() {
      this.reset();
      this.fetchBankCodeList();
      this.title = '新增';
      this.open = true;
    },
    cancel() {
      this.open = false;
      this.reset();
    },
    reset() {
      this.form = {
        withdrawTotalMin: null,
        withdrawTotalMax: null,
        rate: null,
        status: 0
      };
      this.resetForm("form");
    },
  }
};
</script>
