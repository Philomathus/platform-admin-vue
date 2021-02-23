<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属彩种类型" prop="lotteryType">
        <el-select v-model="queryParams.lotteryType" placeholder="请选择所属彩种类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序键" prop="order">
        <el-input
          v-model="queryParams.order"
          placeholder="请输入排序键"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="投注名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入投注名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序键" prop="ind">
        <el-input
          v-model="queryParams.ind"
          placeholder="请输入排序键"
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


    <el-table stripe v-loading="loading" :data="lotteryMethodList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="所属彩种类型" align="center" prop="lotteryType" />
      <el-table-column label="排序键" align="center" prop="order" />
      <el-table-column label="投注名称" align="center" prop="name" />
      <el-table-column label="排序键" align="center" prop="ind" />
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
import { listLotteryMethod } from "@/api/platform-web/lottery/lotteryMethod";

export default {
  name: "LotteryMethod",
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
      // 彩票种类表格数据
      lotteryMethodList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lotteryType: null,
        order: null,
        name: null,
        ind: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        lotteryType: [
          { required: true, message: "所属彩种类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  created() {
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
