<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开奖形式" prop="official">
        <el-select v-model="queryParams.official" placeholder="请选择开奖形式" clearable size="small">
          <el-option
            v-for="item in official"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="彩种名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入彩种名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          filterable
          v-model="form.type"
          placeholder="请选择类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="杀率" prop="killRate">
        <el-input
          v-model="queryParams.killRate"
          placeholder="请输入杀率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="最小投注金额" prop="minCost">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.minCost"-->
      <!--          placeholder="请输入最小投注金额"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="周期" prop="cycle">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.cycle"-->
      <!--          placeholder="请输入周期"-->
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

    <el-table stripe v-loading="loading" :data="lotteryInfoList">
      <el-table-column width="55" align="center"/>
      <el-table-column label="彩种编号" align="center" prop="id"/>
      <el-table-column label="彩种名称" align="center" prop="name"/>
      <el-table-column label="类型" align="center" prop="type"/>
      <el-table-column label="状态" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="图标" align="center" prop="icon">
        <template slot-scope="scope">
          <el-image
            style="height:50px"
            :src="scope.row.icon"
            fit="contain"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="开奖形式" align="center" prop="official" :formatter="formatterofficial"/>
      <el-table-column label="杀率" align="center" prop="killRate"/>
      <el-table-column label="最小投注金额" align="center" prop="minCost"/>
      <el-table-column label="周期" align="center" prop="cycle"/>
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
import {listLotteryInfo, listLotteryRuleName } from "@/api/platform-web/lottery/lotteryInfo";

export default {
  name: "LotteryInfo",
  components: {},
  data() {
    return {
      //状态选择栏
      status: [{
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '禁用'
      }],
      //开奖形式选择栏
      official: [{
        value: '0',
        label: '官方'
      }, {
        value: '1',
        label: '自开(数据库)'
      }, {
        value: '2',
        label: '自开(程序)'
      }],
      //类型下拉框
      typeOptions: [],
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
      // 彩票名称表格数据
      lotteryInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        type: null,
        status: null,
        icon: null,
        official: null,
        killRate: null,
        minCost: null,
        cycle: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          {required: true, message: "彩种名称不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
    // listLotteryRuleName().then(response => {
    //   this.typeOptions = response.data
    // })
  },
  methods: {
    /** 查询彩票名称列表 */
    getList() {
      this.loading = true;
      listLotteryInfo(this.queryParams).then(response => {
        this.lotteryInfoList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 0=官方1=自开（数据库）2=自开（程序）
    formatterofficial(row) {
      if (row.official == 0) {
        return '官方'
      } else if (row.official == 1) {
        return '自开（数据库）'
      } else if (row.official == 2) {
        return '自开（程序）'
      } else {
        return ''
      }
    },
    // 禁用启用
    formatterStatus(row) {
      if (row.status == 0) {
        return '禁用'
      } else if (row.status == 1) {
        return '启用'
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
        name: null,
        type: null,
        status: 0,
        icon: null,
        official: null,
        killRate: null,
        minCost: null,
        cycle: null
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
