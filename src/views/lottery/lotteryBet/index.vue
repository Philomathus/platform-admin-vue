<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="puserId">
        <el-input
          v-model="queryParams.puserId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="issue">
        <el-input
          v-model="queryParams.issue"
          placeholder="请输入下注期数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item  prop="lotteryName">
        <el-input
          v-model="queryParams.lotteryName"
          placeholder="请输入彩票名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="betTime">
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
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="lotteryBet0List" >
      <el-table-column label="下注彩种id" align="center" prop="lotteryId" />
      <el-table-column label="平台用户ID" align="center" prop="puserId" />
      <el-table-column label="下注期数" align="center" prop="issue" />
      <el-table-column label="状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="下注选择菜单" align="center" prop="methodId" />
      <el-table-column label="下注选择" align="center" prop="betSelect" />
      <el-table-column label="下注索引" align="center" prop="betIds" />
      <el-table-column label="筹码" align="center" prop="chip" />
      <el-table-column label="中奖金额" align="center" prop="prize" />
      <el-table-column label="投资" align="center" prop="cost" />
      <el-table-column label="彩票名称" align="center" prop="lotteryName" />
      <el-table-column label="主播ID" align="center" prop="anchor" />
      <el-table-column label="开奖号码" align="center" prop="code" />
      <el-table-column label="下注时间" align="center" min-width="120px" prop="betTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.betTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
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

  </div>
</template>

<script>
import { listLotteryBet0} from "@/api/platform-web/lottery/lotteryBet";

export default {
  name: "LotteryBet0",
  components: {
  },
  data() {
    return {
      //状态选择栏
      status: [{
        value: '0',
        label: '待开奖'
      }, {
        value: '1',
        label: '已中奖'
      }, {
        value: '2',
        label: '未中奖'
      }],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 日期范围
      dateRange: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户投资行为表格数据
      lotteryBet0List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lotteryId: null,
        puserId: null,
        issue: null,
        status: null,
        methodId: null,
        betSelect: null,
        betIds: null,
        chip: null,
        prize: null,
        cost: null,
        lotteryName: null,
        anchor: null,
        code: null,
        betTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        betTime: [
          { required: true, message: "下注时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户投资行为列表 */
    getList() {
      this.loading = true;
      listLotteryBet0(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.lotteryBet0List = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0=投注中1=已开奖2=已派奖3=开奖失败
    formatterStatus(row) {
      if (row.status == 0) {
        return '待开奖'
      } else if (row.status == 1) {
        return '已中奖'
      } else if (row.status == 2) {
        return '未中奖'
      } else {
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
        lotteryId: null,
        puserId: null,
        issue: null,
        status: 0,
        methodId: null,
        betSelect: null,
        betIds: null,
        chip: null,
        prize: null,
        cost: null,
        lotteryName: null,
        anchor: null,
        code: null,
        betTime: null,
        updateTime: null
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
