<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.channelName')" prop="channelName">
        <el-input
          v-model="queryParams.channelName"
          :placeholder="$t('config.configUsdtRecharge.tableDialog.channelNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.chainName')" prop="chainName">
        <el-input
          v-model="queryParams.chainName"
          :placeholder="$t('config.configUsdtRecharge.tableDialog.chainNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.rechargeAddress')" prop="rechargeAddress">
        <el-input
          v-model="queryParams.rechargeAddress"
          :placeholder="$t('config.configUsdtRecharge.tableDialog.rechargeAddressPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{
            $t('global.searchButton')
          }}
        </el-button>
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
          v-hasPermi="['admin:configUsdtRecharge:add']"
        >{{ $t('global.addButton') }}
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
          v-hasPermi="['admin:configUsdtRecharge:edit']"
        >{{ $t('global.editButton') }}
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
          v-hasPermi="['admin:configUsdtRecharge:remove']"
        >{{ $t('global.deleteButton') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:configUsdtRecharge:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="configUsdtRechargeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <!--      <el-table-column :label="排序" align="center" width="200" prop="indexs" />
            <el-table-column :label="钱包二维码" align="center" width="200" prop="icon">
              <template slot-scope="scope">
                <el-image
                  style="height: 50px;"
                  :src="scope.row.icon"
                  fit="contain"
                >
                </el-image>
              </template>
            </el-table-column>-->
      <el-table-column :label="$t('config.configUsdtRecharge.tableDialog.channelName')" align="center" width="300"
                       prop="channelName"/>
      <el-table-column :label="$t('config.configUsdtRecharge.tableDialog.chainName')" align="center" width="300"
                       prop="chainName"/>
      <el-table-column :label="$t('global.status')" align="center" width="100" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('config.configUsdtRecharge.tableDialog.rechargeAddress')" align="center"
                       min-width="400" prop="rechargeAddress"/>
      <el-table-column :label="$t('config.configUsdtRecharge.tableDialog.discountBill')" align="center" width="100"
                       prop="discountBill"/>
      <el-table-column :label="$t('config.configUsdtRecharge.tableDialog.exchangeRate')" align="center" width="100"
                       prop="exchangeRate"/>
      <el-table-column :label="$t('global.operationColumn')" align="center" width="300"
                       class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:configUsdtRecharge:edit']"
          >{{ $t('global.editButton') }}
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:configUsdtRecharge:remove']"
          >{{ $t('global.deleteButton') }}
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

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.channelName')" prop="channelName">
          <el-input v-model="form.channelName" :placeholder="$t('config.configUsdtRecharge.tableDialog.channelNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.chainName')" prop="chainName">
          <el-input v-model="form.chainName"
                    :placeholder="$t('config.configUsdtRecharge.tableDialog.chainNamePlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.rechargeAddress')" prop="rechargeAddress">
          <el-input v-model="form.rechargeAddress"
                    :placeholder="$t('config.configUsdtRecharge.tableDialog.rechargeAddressPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.discountBill')" prop="discountBill">
          <el-input v-model="form.discountBill"
                    :placeholder="$t('config.configUsdtRecharge.tableDialog.discountBillPlaceholder')"/>
        </el-form-item>
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.exchangeRate')" prop="exchangeRate">
          <el-input v-model="form.exchangeRate"
                    :placeholder="$t('config.configUsdtRecharge.tableDialog.exchangeRatePlaceholder')"/>
        </el-form-item>
        <!--        <el-form-item :label="排序" prop="indexs">
                  <el-input v-model="form.indexs" :placeholder="请输入排序" />
                </el-form-item>
                <el-form-item :label="钱包二维码">
                  <imageUpload v-model="form.icon" path="ConfigUsdtRecharge"/>
                </el-form-item>-->
        <el-form-item :label="$t('config.configUsdtRecharge.tableDialog.remark')" prop="remark">
          <el-input v-model="form.remark" :placeholder="$t('config.configUsdtRecharge.tableDialog.remarkPlaceholder')"/>
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
  listConfigUsdtRecharge,
  getConfigUsdtRecharge,
  delConfigUsdtRecharge,
  addConfigUsdtRecharge,
  updateConfigUsdtRecharge,
  exportConfigUsdtRecharge,
  changeUsdtRechargeStatus
} from "@/api/platform-web/config/configUsdtRecharge"
import ImageUpload from '@/components/ImageUpload'

export default {
  name: "ConfigUsdtRecharge",
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
      configUsdtRechargeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        channelName: null,
        chainName: null,
        rechargeAddress: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        channelName: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.channelName'), trigger: 'blur'}
        ],
        chainName: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.chainName'), trigger: 'blur'}
        ],
        rechargeAddress: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.rechargeAddress'), trigger: 'blur'}
        ],
        discountBill: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.discountBill'), trigger: 'blur'}
        ],
        exchangeRate: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.exchangeRate'), trigger: 'blur'}
        ],
        icon: [
          {required: true, message: this.$t('config.configUsdtRecharge.validation.icon'), trigger: 'blur'}
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
      listConfigUsdtRecharge(this.queryParams).then(response => {
        this.configUsdtRechargeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //支付类型状态修改
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
        return changeUsdtRechargeStatus(row.id, row.status)
      }).then(() => {
        this.msgSuccess(text + this.$t('global.statusEditSuccess'))
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
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
        channelName: null,
        chainName: null,
        rechargeAddress: null,
        discountBill: null,
        exchangeRate: null,
        indexs: null,
        icon: null,
        status: 0,
        openLevel: null,
        openLevelMax: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      this.title = this.$t('config.configUsdtRecharge.addTitle');

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfigUsdtRecharge(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('config.configUsdtRecharge.editTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigUsdtRecharge(this.form).then(response => {
              this.msgSuccess(this.$t('global.editSuccessMsg'));
              this.open = false;
              this.getList();
            });
          } else {
            addConfigUsdtRecharge(this.form).then(response => {
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
        return delConfigUsdtRecharge(ids);
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
      }).then(function () {
        return exportConfigUsdtRecharge(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('config.configUsdtRecharge.exportTitle'));
      }).catch(() => {
      })
    }
  }
};
</script>
