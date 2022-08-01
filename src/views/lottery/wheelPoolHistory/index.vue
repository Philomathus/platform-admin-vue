<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="会员ID" prop="memberId">
        <el-input
          v-model="queryParams.memberId"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入昵称"
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

    <!-- 轮式台球历史表  wheel pool history table-->
    <el-table stripe v-loading="loading" :data="wheelPoolHistoryList" class="el-table--border">
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="会员ID" align="center" prop="memberId" />
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="中奖ID" align="center" prop="winId" />
      <el-table-column label="中奖金额" align="center" prop="prize" />
      <el-table-column label="是否首次中奖" align="center" prop="first" />
      <el-table-column label="状态" align="center" prop="status" :formatter="wheelStatusFormat" /><!-- 0 未中奖 1 已中奖 -->
      <el-table-column label="中奖牌型" align="center" prop="medalType"/>
      <el-table-column label="抽奖排序" align="center" prop="drawType" min-width="140" />
      <el-table-column label="已抽位置" align="center" prop="position" min-width="170" />
      <el-table-column label="创建时间" align="center" prop="createTime"  min-width="110" />
      <el-table-column label="更新时间" align="center" prop="updateTime"  min-width="110" />
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
import { listWheelPoolHistory} from "@/api/platform-web/lottery/wheelPoolHistory";

export default {
  name: "WheelPoolHistory",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],

      // 显示搜索条件 -
      showSearch: true,
      // 总条数
      total: 0,
      // 轮池历史列表 wheel pool history list
      wheelPoolHistoryList: [],
      // 弹出层标题
      title: "",
      wheelStatus: [],

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        memberId : null,
        nickName :null,
        headId : null,
        status : null,
        first:null,
        prize: null,
        winId: null,
        medalType:null,
        drawType:null,
        position:null,
        createTime : null,
        updateTime:null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts('wheel_pool_status').then(response => {
      this.wheelStatus = response.data
    })
  },
  methods: {
    /** 获取轮池的所有列表 get all list of wheel pool history */
    getList() {
      this.loading = true;
      listWheelPoolHistory(this.queryParams).then(response => {
        this.wheelPoolHistoryList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 handle search query */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作  Reset button action*/
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },

    // 状态字典翻译
    wheelStatusFormat(row, column) {
      return this.selectDictLabel(this.wheelStatus, row.first)
    },
  }
};
</script>
