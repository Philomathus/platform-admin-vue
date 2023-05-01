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
          v-hasPermi="['admin:configVip:add']"
        >{{$t('global.addButton')}}</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="configVipList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column :label="$t('members.configVip.table.vipLvl')" align="center" prop="levelFlag" />
      <el-table-column :label="$t('members.configVip.table.demandCodingValue')" align="center" prop="levelMoney" min-width="120"/>
      <el-table-column :label="$t('members.configVip.table.advancementJackpot')" align="center" prop="jjcj" min-width="120" />
      <el-table-column :label="$t('members.configVip.table.weeklySalary')" align="center" prop="zfl" />
      <el-table-column :label="$t('members.configVip.table.monthlySalary')" align="center" prop="yfl" />
      <el-table-column :label="$t('members.configVip.table.creationTime')" align="center" prop="createTime" min-width="160"/>
      <el-table-column :label="$t('members.configVip.table.lastUpdateBy')" align="center" prop="opName" />
      <el-table-column :label="$t('members.configVip.table.lastUpdateAt')" align="center" prop="updateTime" min-width="160"/>
      <el-table-column :label="$t('global.operation')" align="center" class-name="small-padding fixed-width" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:configVip:edit']"
          >{{ $t('global.edit') }}</el-button>
          <el-button
            style="color: #FF5722"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['admin:configVip:remove']"
          >{{ $t('global.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,30,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px" append-to-body>
        <el-form-item :label=" $t( 'members.configVip.table.vipLvl' ) " prop="levelFlag">
          <el-input v-model="form.levelFlag" :placeholder="$t( 'members.configVip.dialog.vipLvlreq' )" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('members.configVip.table.demandCodingValue')" prop="levelMoney">
          <el-input v-model="form.levelMoney" :placeholder="$t( 'members.configVip.dialog.demCodereq' )" type="number"/>
        </el-form-item>
        <el-form-item :label="$t('members.configVip.table.advancementJackpot')" prop="jjcj">
          <el-input v-model="form.jjcj" :placeholder="$t( 'members.configVip.dialog.advJackpotreq' )"type="number" />
        </el-form-item>
        <el-form-item :label="$t('members.configVip.table.weeklySalary')" prop="zfl">
          <el-input v-model="form.zfl" :placeholder="$t( 'members.configVip.dialog.weeklySalreq' )"type="number" />
        </el-form-item>
        <el-form-item :label="$t('members.configVip.table.monthlySalary')" prop="yfl">
          <el-input v-model="form.yfl" :placeholder="$t( 'members.configVip.dialog.monthlySalreq' )" type="number"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('members.configVip.table.submit') }}</el-button>
        <el-button @click="cancel">{{ $t('members.configVip.table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listConfigVip, getConfigVip, delConfigVip, addConfigVip, updateConfigVip, exportConfigVip } from "@/api/platform-web/member/configVip";

export default {
  name: "ConfigVip",
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
      configVipList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        levelFlag: null,
        dmMoney: null,
        jjcj: null,
        zfl: null,
        yfl: null,
        tdjs: null,
        zskf: null,
        opName: null,
        levelMoney: null,
        orderByColumn: 'level_flag',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        levelFlag: [
          {required: true, message: this.$t('members.configVip.rules.vipRule'), trigger: "number"},
        ],
        levelMoney: [
          {required: true, message: this.$t('members.configVip.rules.demandRule'), trigger: "number"},
        ],
        jjcj: [
          {required: true, message: this.$t('members.configVip.rules.promoteRule'), trigger: "number"},
        ],
        zfl: [
          {required: true, message: this.$t('members.configVip.rules.weekSalaryRule'), trigger: "number"},
        ],
        yfl: [
          {required: true, message: this.$t('members.configVip.rules.monthSalaryRule'), trigger: "number"},
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
      listConfigVip(this.queryParams).then(response => {
        this.configVipList = response.rows;
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
        levelFlag: null,
        dmMoney: null,
        jjcj: null,
        zfl: null,
        yfl: null,
        tdjs: null,
        zskf: null,
        createTime: null,
        opName: null,
        updateTime: null,
        levelMoney: null
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
      this.title = this.$t('members.configVip.queries.addQuery');
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getConfigVip(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('members.configVip.queries.updateQuery');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateConfigVip(this.form).then(response => {
              this.msgSuccess(response.msg);
              this.open = false;
              this.getList();
            });
          } else {
            addConfigVip(this.form).then(response => {
              this.msgSuccess(response.msg);
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
      const vip=row.levelFlag;
      this.$confirm(this.$t('members.configVip.queries.delQuery') + vip
        + this.$t('members.configVip.queries.delQuery2'), this.$t('members.configVip.queries.warning'), {
        confirmButtonText: this.$t('members.configVip.queries.sure'),
        cancelButtonText: this.$t('members.configVip.queries.cancel'),
        type: "warning"
      }).then(function() {
        return delConfigVip(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess( this.$t('members.configVip.queries.delSuccess') );
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm( this.$t('members.configVip.queries.confExcel'), this.$t('members.configVip.queries.warning'), {
        confirmButtonText: this.$t('members.configVip.queries.confirm'),
        cancelButtonText: this.$t('members.configVip.queries.cancel'),
        type: "warning"
      }).then(function() {
        return exportConfigVip(queryParams);
      }).then(response => {
        this.downloadExcel(response, this.$t('members.configVip.queries.function'));
      }).catch(() => {
      })
    }
  }
};
</script>

