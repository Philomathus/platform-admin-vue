<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="-" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue" style="width: 130px;">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="请输入玩家ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="transferId">
        <el-input
          v-model="queryParams.transferId"
          placeholder="请输入订单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="transferState">
        <el-select v-model="queryParams.transferState" placeholder="请选择交易状态" clearable size="small" style="width: 150px;">
          <el-option
            v-for="(item,index) in transferStateList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="transferType">
        <el-select v-model="queryParams.transferType" placeholder="请选择交易类型" clearable size="small" style="width: 150px;">
          <el-option
            v-for="(item,index) in transferTypeList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberGameTransferList">
      <el-table-column label="交易ID" align="center" prop="id" width="180"/>
      <el-table-column label="玩家ID" align="center" prop="userId" />
      <el-table-column label="代理ID" align="center" prop="agent" />
      <el-table-column label="平台ID" align="center" prop="platformId">
        <template slot-scope="scope">
          <span v-if="scope.row.platformId == '1'">开元棋牌</span>
          <span v-if="scope.row.platformId == '2'">PP捕鱼</span>
          <span v-if="scope.row.platformId == '4'">77彩票</span>
          <span v-if="scope.row.platformId == '5'">AG平台</span>
          <span v-if="scope.row.platformId == '6'">MG平台</span>
          <span v-if="scope.row.platformId == '7'">NG电子</span>
          <span v-if="scope.row.platformId == '8'">BBIN视讯</span>
          <span v-if="scope.row.platformId == '9'">BBIN体育</span>
          <span v-if="scope.row.platformId == '10'">BBIN电子</span>
          <span v-if="scope.row.platformId == '11'">BBIN捕鱼</span>
          <span v-if="scope.row.platformId == '12'">沙巴体育</span>
          <span v-if="scope.row.platformId == '14'">美天棋牌</span>
          <span v-if="scope.row.platformId == '15'">凯旋棋牌</span>
          <span v-if="scope.row.platformId == '16'">乐游棋牌</span>
          <span v-if="scope.row.platformId == '17'">新世界棋牌</span>
          <span v-if="scope.row.platformId == '18'">AFB电子</span>
          <span v-if="scope.row.platformId == '19'">泛亚电竞</span>
          <span v-if="scope.row.platformId == '20'">PragmaticPlay</span>
          <span v-if="scope.row.platformId == '21'">BG视讯</span>
          <span v-if="scope.row.platformId == '22'">BG捕鱼</span>
          <span v-if="scope.row.platformId == '23'">BG电游</span>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" align="center" prop="transferId" min-width="100"/>
      <el-table-column label="产品类型" align="center" prop="product" />
      <el-table-column label="交易状态" align="center" prop="transferState">
        <template slot-scope="scope">
          <span v-if="scope.row.transferState == 'Succeeded'" :style="{'color': '#5FB878'}">成功</span>
          <span v-else-if="scope.row.transferType == 'Inprogress'" :style="{'color': 'rgb(245 86 11)'}">待处理</span>
          <span v-else-if="scope.row.transferType == 'Unconfirmed'" :style="{'color': 'rgb(245 86 11)'}">未确认</span>
          <span v-else-if="scope.row.transferType == 'Failed'" :style="{'color': 'rgb(245 86 11)'}">失败</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column label="交易类型" align="center" prop="transferType">
          <template slot-scope="scope">
            <span v-if="scope.row.transferType == 'Deposit'" :style="{'color': '#5FB878'}">额度转出</span>
            <span v-else-if="scope.row.transferType == 'Withdraw'" :style="{'color': 'rgb(245 86 11)'}">额度转入</span>
            <span v-else>未知</span>
          </template>
      </el-table-column>
      <el-table-column label="交易金额" align="center" prop="transferAmount" />
      <el-table-column label="交易时间" align="center" prop="transferTime" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.transferTime  }}</span>
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
import {
  listMemberGameTransfer,
  refreshMemberGameTransfer,
  getTransferStateList,
  getTransferTypeList
} from "@/api/platform-web/member/memberGameTransfer";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {
  name: "MemberGameTransfer",
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
      memberGameTransferList: [],
      // 初始化时间空间
      pickerOptions: { shortcuts: pickerDateTimeShortcuts },
      // 日期范围
      dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //交易状态
      transferStateList:[],
      //交易类型
      transferTypeList:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        agent: null,
        platformId: null,
        transferId: null,
        product: null,
        transferState: null,
        transferType: null,
        transferAmount: null,
        transferTime: null,
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  activated(){
    this.init()
  },
  created() {
    this.init();
  },
  methods: {
    init(){
        this.listTransferState();
        this.listTransferType();
        this.getList();
    },
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      if (this.queryParams.transferType == 'ALL'){
        this.queryParams.transferType = null
      }
      if (this.queryParams.transferState == 'ALL'){
        this.queryParams.transferState = null
      }
      listMemberGameTransfer(this.queryParams).then(response => {
        this.memberGameTransferList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 获取状态列表 */
    listTransferState() {
      getTransferStateList(this.queryParams).then(response => {
        this.transferStateList = response.data
        console.info(this.transferStateList)
      })
    },
    /** 获取类型列表 */
    listTransferType() {
      getTransferTypeList(this.queryParams).then(response => {
        this.transferTypeList = response.data
        console.info(this.transferTypeList)
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
        userId: null,
        agent: null,
        platformId: null,
        transferId: null,
        product: null,
        transferState: null,
        transferType: null,
        transferAmount: null,
        transferTime: null
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
