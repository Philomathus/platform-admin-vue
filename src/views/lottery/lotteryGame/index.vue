<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('lotteryGame.form.methodIdLabel')" prop="methodId">
        <el-input
          v-model="queryParams.methodId"
          :placeholder="$t('lotteryGame.form.methodIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lotteryGame.form.typeLabel')" prop="type">
        <el-select v-model="queryParams.type" :placeholder="$t('lotteryGame.form.typePlaceholder')" clearable size="small">
          <el-option
            v-for="item in lotteryType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('lotteryGame.form.infoLabel')" prop="info">
        <el-input
          v-model="queryParams.info"
          :placeholder="$t('lotteryGame.form.infoPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lotteryGame.form.victoryRuleLabel')" prop="victoryRule">
        <el-input
          v-model="queryParams.victoryRule"
          :placeholder="$t('lotteryGame.form.victoryRulePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('lotteryGame.form.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('lotteryGame.form.resetButton')}}</el-button>
      </el-form-item>
    </el-form>


    <el-table stripe v-loading="loading" :data="lotteryGameList">
      <el-table-column :label="$t('lotteryGame.tableColumns.methodId')" align="center" prop="methodId"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.type')" align="center" prop="type"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.info')" align="center" prop="info"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.odds')" align="center" prop="odds"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.victoryRule')" align="center" prop="victoryRule"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.ind')" align="center" prop="ind"/>
      <el-table-column :label="$t('lotteryGame.tableColumns.operationLabel')" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['admin:lotteryGame:edit']"
          >{{$t('lotteryGame.tableColumns.editButton')}}
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

    <!-- 修改赔率对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="open" width="300px"
               append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="40px">
        <el-form-item :label="$t('lotteryGame.dialogForm.oddsLabel')" prop="odds">
          <el-input v-model="form.odds" :placeholder="$t('lotteryGame.dialogForm.oddsPlaceholder')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{$t('lotteryGame.dialogForm.confirmButton')}}</el-button>
        <el-button @click="cancel">{{$t('lotteryGame.dialogForm.cancelButton')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listLotteryGame, getLotteryGame, updateLotteryGame} from "@/api/platform-web/lottery/lotteryGame";

export default {
  name: "LotteryGame",
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
      // 下注表格数据
      lotteryGameList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        methodId: null,
        type: null,
        info: null,
        odds: null,
        victoryRule: null,
        ind: null,
        orderByColumn: 'ind',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      lotteryType: [{
        value: this.$t('lotteryGame.lotteryType.timeShareValue'),
        label: this.$t('lotteryGame.lotteryType.timeShareLabel')
      }, {
        value: this.$t("lotteryGame.lotteryType['11select5Value']"),
        label: this.$t("lotteryGame.lotteryType['11select5Label']"),
      }, {
        value: this.$t('lotteryGame.lotteryType.fastThreeValue'),
        label: this.$t('lotteryGame.lotteryType.fastThreeLabel')
      }, {
        value: this.$t('lotteryGame.lotteryType.racingValue'),
        label: this.$t('lotteryGame.lotteryType.racingLabel')
      }, {
        value: this.$t('lotteryGame.lotteryType.markSixValue'),
        label: this.$t('lotteryGame.lotteryType.markSixLabel')
      }, {
        value: this.$t('lotteryGame.lotteryType.baccaratValue'),
        label: this.$t('lotteryGame.lotteryType.baccaratLabel')
      }, {
        value: this.$t('lotteryGame.lotteryType.hundredBullsValue'),
        label: this.$t('lotteryGame.lotteryType.hundredBullsLabel')
      }],
    };
  },
/*  created() {
    this.getList();
  },*/
  activated() {
    var type = this.$route.query.type;
    if (type) {
      this.queryParams.type=type
    }
    this.getList();
  },
  methods: {
    /** 查询下注列表 */
    getList() {
      this.loading = true;
      listLotteryGame(this.queryParams).then(response => {
        this.lotteryGameList = response.rows;
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
        methodId: null,
        type: null,
        index: null,
        info: null,
        odds: null,
        victoryRule: null,
        ind: null
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
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLotteryGame(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('lotteryGame.updateOddsTitle');
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLotteryGame(this.form).then(response => {
              this.msgSuccess(this.$t('lotteryGame.updateSuccessMessage'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    }
  }
};
</script>
