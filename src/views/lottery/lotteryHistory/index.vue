<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="70px">
      <el-form-item prop="name">
        <el-select
          filterable
          v-model="queryParams.name"
          placeholder="请选择彩种"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in historyNameOptions"
            :key="dict.name"
            :label="dict.name"
            :value="dict.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="issue">
        <el-input
          v-model="queryParams.issue"
          placeholder="请输入期数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="ktime">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!--      <el-form-item label="自开实际杀率" prop="killRate">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.killRate"-->
      <!--          placeholder="请输入自开实际杀率"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="总投注" prop="totalBet">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.totalBet"-->
      <!--          placeholder="请输入总投注"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="预计派奖总额" prop="totalPrize">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.totalPrize"-->
      <!--          placeholder="请输入预计派奖总额"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="开奖分析" prop="analyse">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.analyse"-->
      <!--          placeholder="请输入开奖分析"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryHistoryList">
      <!--      <el-table-column label="ID" align="center" prop="id"/>-->
      <el-table-column label="彩票名称" align="center" prop="name"/>
      <el-table-column label="期数" align="center" prop="issue"/>
      <el-table-column label="开奖号码" align="center" min-width="150px" prop="code"/>
      <el-table-column label="开奖时间" min-width="90px" align="center" prop="ktime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ktime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总投注" align="center" prop="totalBet"/>
      <el-table-column label="杀率" align="center" prop="killRate"/>
      <el-table-column label="派奖" align="center" prop="totalPrize"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="formatterStatus"/>
<!--      <el-table-column label="杀法" align="center" prop="ctl" :formatter="formatterctl"/>-->
<!--      <el-table-column label="开奖分析" align="center" prop="analyse"/>-->
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
import {listLotteryHistory, historyName} from "@/api/platform-web/lottery/lotteryHistory";
export default {
  name: "LotteryHistory",
  components: {},
  data() {
    return {
      //状态选择栏
      status: [{
        value: '0',
        label: '投注中'
      }, {
        value: '1',
        label: '已开奖'
      }, {
        value: '2',
        label: '已派奖'
      }, {
        value: '3',
        label: '开奖失败'
      }],
      //杀法选择栏
      ctl: [{
        value: '0',
        label: '未杀'
      }, {
        value: '1',
        label: '控杀'
      }],
      //全部彩种
      historyNameOptions: [],
      // 日期范围
      dateRange: [],
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
      // 开奖历史表格数据
      lotteryHistoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        issue: null,
        lotteryId: null,
        code: null,
        ktime: null,
        status: null,
        name: null,
        killRate: null,
        totalBet: null,
        totalPrize: null,
        ctl: null,
        analyse: null,
        orderByColumn: 'ktime',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        ktime: [
          {required: true, message: "开奖时间不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
    //全部彩种
    historyName().then(response => {
      this.historyNameOptions = response.data
    })
  },
  methods: {
    /** 查询开奖历史列表 */
    getList() {
      this.loading = true;
      listLotteryHistory(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.lotteryHistoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0=投注中1=已开奖2=已派奖3=开奖失败
    formatterStatus(row) {
      if (row.status == 0) {
        return '投注中'
      } else if (row.status == 1) {
        return '已开奖'
      } else if (row.status == 2) {
        return '已派奖'
      } else if (row.status == 3) {
        return '开奖失败'
      } else {
        return ''
      }
    },
    formatterctl(row) {
      if (row.ctl == 0) {
        return '未杀'
      } else if (row.ctl == 1) {
        return '控杀'
      } else if (row.ctl == null) {
        return ''
      }
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
        issue: null,
        lotteryId: null,
        code: null,
        ktime: null,
        status: 0,
        name: null,
        killRate: null,
        totalBet: null,
        totalPrize: null,
        ctl: null,
        analyse: null
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
      this.dateRange = []
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
