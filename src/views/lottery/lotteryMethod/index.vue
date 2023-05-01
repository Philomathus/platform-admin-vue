<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item :label="$t('lotteryMethod.form.lotteryTypeLabel')" prop="lotteryType">
        <el-select v-model="queryParams.lotteryType" :placeholder="$t('lotteryMethod.form.lotteryTypePlaceholder')" clearable size="small">
          <el-option
            v-for="item in lotteryType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('lotteryMethod.form.nameLabel')" prop="name">
        <el-input
          v-model="queryParams.name"
          :placeholder="$t('lotteryMethod.form.namePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table stripe v-loading="loading" :data="lotteryMethodList">
      <el-table-column :label="$t('lotteryMethod.tableColumns.lotteryType')" align="center" prop="lotteryType"/>
      <el-table-column :label="$t('lotteryMethod.tableColumns.name')" align="center" prop="name">
        <template v-slot="{row}">
          <a @click="$router.push({path: '/lottery/lotteryGame',query: { type: row.name}})" style="color: #00afff">
            {{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="ind" align="center" prop="ind"/>
      <el-table-column :label="$t('lotteryMethod.tableColumns.order')" align="center" prop="order"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {listLotteryMethod} from "@/api/platform-web/lottery/lotteryMethod";

export default {
  name: "LotteryMethod",
  components: {},
  data() {
    return {
      //所属彩种类型下拉框
      lotteryType: [{
        value: this.$t('lotteryMethod.lotteryType.timeShareValue'),
        label: this.$t('lotteryMethod.lotteryType.timeShareLabel')
      }, {
        value: this.$t("lotteryMethod.lotteryType['11select5Value']"),
        label: this.$t("lotteryMethod.lotteryType['11select5Label']")
      }, {
        value: this.$t('lotteryMethod.lotteryType.fastThreeValue'),
        label: this.$t('lotteryMethod.lotteryType.fastThreeLabel')
      }, {
        value: this.$t('lotteryMethod.lotteryType.racingValue'),
        label: this.$t('lotteryMethod.lotteryType.racingLabel')
      }, {
        value: this.$t('lotteryMethod.lotteryType.markSixValue'),
        label: this.$t('lotteryMethod.lotteryType.markSixLabel')
      }, {
        value: this.$t('lotteryMethod.lotteryType.baccaratValue'),
        label: this.$t('lotteryMethod.lotteryType.baccaratLabel')
      }, {
        value: this.$t('lotteryMethod.lotteryType.hundredBullsValue'),
        label: this.$t('lotteryMethod.lotteryType.hundredBullsLabel')
      }],
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
      // 彩票种类表格数据
      lotteryMethodList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        lotteryType: null,
        order: null,
        name: null,
        ind: null,
        orderByColumn: 'ind',
        isAsc: 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        lotteryType: [
          {required: true, message: this.$t('lotteryMethod.lotteryTypeRuleMessage'), trigger: "change"}
        ]
      }
    };
  },
  /*  created() {
      this.getList();
    },*/
  activated() {
    const lotteryType = this.$route.query.lotteryType;
    if (lotteryType) {
      this.queryParams.lotteryType = lotteryType
    }
    this.getList();
  },
  methods: {
    /** 查询彩票种类列表 */
    getList() {
      this.loading = true;
      listLotteryMethod(this.queryParams).then(response => {
        this.lotteryMethodList = response.rows;
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
        lotteryType: null,
        order: null,
        name: null,
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
    }
  }
};
</script>
