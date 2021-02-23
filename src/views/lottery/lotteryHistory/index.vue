<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="期数" prop="issue">
        <el-input
          v-model="queryParams.issue"
          placeholder="请输入期数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属彩种" prop="lotteryId">
        <el-input
          v-model="queryParams.lotteryId"
          placeholder="请输入所属彩种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开奖号码" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入开奖号码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开奖时间" prop="ktime">
        <el-date-picker clearable size="small"
          v-model="queryParams.ktime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开奖时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择0=投注中1=已开奖2=已派奖3=开奖失败" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="彩票名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入彩票名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="自开实际杀率" prop="killRate">
        <el-input
          v-model="queryParams.killRate"
          placeholder="请输入自开实际杀率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总投注" prop="totalBet">
        <el-input
          v-model="queryParams.totalBet"
          placeholder="请输入总投注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="预计派奖总额" prop="totalPrize">
        <el-input
          v-model="queryParams.totalPrize"
          placeholder="请输入预计派奖总额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="杀法" prop="ctl">
        <el-input
          v-model="queryParams.ctl"
          placeholder="请输入0=未杀1=控杀"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开奖分析" prop="analyse">
        <el-input
          v-model="queryParams.analyse"
          placeholder="请输入开奖分析"
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

    <el-table stripe v-loading="loading" :data="lotteryHistoryList">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="期数" align="center" prop="issue" />
      <el-table-column label="所属彩种" align="center" prop="lotteryId" />
      <el-table-column label="开奖号码" align="center" prop="code" />
      <el-table-column label="开奖时间" align="center" prop="ktime" />
      <el-table-column label="状态" align="center" prop="status" />
      <el-table-column label="彩票名称" align="center" prop="name" />
      <el-table-column label="自开实际杀率" align="center" prop="killRate" />
      <el-table-column label="总投注" align="center" prop="totalBet" />
      <el-table-column label="预计派奖总额" align="center" prop="totalPrize" />
      <el-table-column label="杀法" align="center" prop="ctl" />
      <el-table-column label="开奖分析" align="center" prop="analyse" />
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
import { listLotteryHistory } from "@/api/platform-web/lottery/lotteryHistory";

export default {
  name: "LotteryHistory",
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
        analyse: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        ktime: [
          { required: true, message: "开奖时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询开奖历史列表 */
    getList() {
      this.loading = true;
      listLotteryHistory(this.queryParams).then(response => {
        this.lotteryHistoryList = response.rows;
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
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
