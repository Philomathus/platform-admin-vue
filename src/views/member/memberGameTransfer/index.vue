<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label=" $t('global.selectDate') " prop="selectDate" label-width="40">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :start-placeholder=" $t('members.memberGameTransfer.index.div.date.sDate') "
                        :end-placeholder=" $t('members.memberGameTransfer.index.div.date.eDate') "
                        range-separator="-" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue" style="width: 130px;">
        <el-input
          v-model.trim="queryParams.userId"
          :placeholder=" $t('members.memberGameTransfer.index.div.entPid') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="transferId">
        <el-input
          v-model="queryParams.transferId"
          :placeholder=" $t('members.memberGameTransfer.index.div.entPod') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item  prop="transferState">
        <el-select v-model="queryParams.transferState" :placeholder=" $t('members.memberGameTransfer.index.div.selStat') " clearable size="small" style="width: 150px;">
          <el-option
            v-for="(item,index) in transferStateList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="transferType">
        <el-select v-model="queryParams.transferType" :placeholder=" $t('members.memberGameTransfer.index.div.selTtype') " clearable size="small" style="width: 150px;">
          <el-option
            v-for="(item,index) in transferTypeList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.memberGameTransfer.index.div.btn.search') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.memberGameTransfer.index.div.btn.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberGameTransferList">
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.tId') " align="center" prop="id" width="180"/>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.pId') " align="center" prop="userId" />
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.proxy') " align="center" prop="agent" />
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.plat') " align="center" prop="platformId" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.platformId == '1'">{{ $t('members.memberGameTransfer.index.div.template.kChess') }}</span>
          <span v-if="scope.row.platformId == '2'">{{ $t('members.memberGameTransfer.index.div.template.ppFish') }}</span>
          <span v-if="scope.row.platformId == '4'">{{ $t('members.memberGameTransfer.index.div.template.lot77') }}</span>
          <span v-if="scope.row.platformId == '5'">{{ $t('members.memberGameTransfer.index.div.template.agPlat') }}</span>
          <span v-if="scope.row.platformId == '6'">{{ $t('members.memberGameTransfer.index.div.template.mgPlat') }}</span>
          <span v-if="scope.row.platformId == '7'">{{ $t('members.memberGameTransfer.index.div.template.ngElec') }}</span>
          <span v-if="scope.row.platformId == '8'">{{ $t('members.memberGameTransfer.index.div.template.bbinV') }}</span>
          <span v-if="scope.row.platformId == '9'">{{ $t('members.memberGameTransfer.index.div.template.bbinS') }}</span>
          <span v-if="scope.row.platformId == '10'">{{ $t('members.memberGameTransfer.index.div.template.bbinE') }}</span>
          <span v-if="scope.row.platformId == '11'">{{ $t('members.memberGameTransfer.index.div.template.bbinF') }}</span>
          <span v-if="scope.row.platformId == '12'">{{ $t('members.memberGameTransfer.index.div.template.sabS') }}</span>
          <span v-if="scope.row.platformId == '14'">{{ $t('members.memberGameTransfer.index.div.template.mChess') }}</span>
          <span v-if="scope.row.platformId == '15'">{{ $t('members.memberGameTransfer.index.div.template.tChess') }}</span>
          <span v-if="scope.row.platformId == '16'">{{ $t('members.memberGameTransfer.index.div.template.lChess') }}</span>
          <span v-if="scope.row.platformId == '17'">{{ $t('members.memberGameTransfer.index.div.template.nwChess') }}</span>
          <span v-if="scope.row.platformId == '18'">{{ $t('members.memberGameTransfer.index.div.template.afbEl') }}</span>
          <span v-if="scope.row.platformId == '19'">{{ $t('members.memberGameTransfer.index.div.template.panSport') }}</span>
          <span v-if="scope.row.platformId == '20'">PragmaticPlay</span>
          <span v-if="scope.row.platformId == '21'">{{ $t('members.memberGameTransfer.index.div.template.bgVid') }}</span>
          <span v-if="scope.row.platformId == '22'">{{ $t('members.memberGameTransfer.index.div.template.bgFish') }}</span>
          <span v-if="scope.row.platformId == '23'">{{ $t('members.memberGameTransfer.index.div.template.bgGame') }}</span>
          <span v-if="scope.row.platformId == '51'">{{ $t('members.memberGameTransfer.index.div.template.tChessx') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.ordId') " align="center" prop="transferId" min-width="100"/>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.pType') " align="center" prop="product" width="180"/>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.tStat') " align="center" prop="transferState" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.transferState == 'Succeeded'" :style="{'color': '#5FB878'}">{{ $t('members.memberGameTransfer.index.div.succ') }}</span>
          <span v-else-if="scope.row.transferType == 'Inprogress'" :style="{'color': 'rgb(245 86 11)'}">{{ $t('members.memberGameTransfer.index.div.tobe') }}</span>
          <span v-else-if="scope.row.transferType == 'Unconfirmed'" :style="{'color': 'rgb(245 86 11)'}">{{ $t('members.memberGameTransfer.index.div.nConf') }}</span>
          <span v-else-if="scope.row.transferType == 'Failed'" :style="{'color': 'rgb(245 86 11)'}">{{ $t('members.memberGameTransfer.index.div.fail') }}</span>
          <span v-else>{{ $t('members.memberGameTransfer.index.div.unk') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.tType') " align="center" prop="transferType" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.transferType == 'Deposit'" :style="{'color': '#5FB878'}">{{ $t('members.memberGameTransfer.index.div.tQuota') }}</span>
            <span v-else-if="scope.row.transferType == 'Withdraw'" :style="{'color': 'rgb(245 86 11)'}">{{ $t('members.memberGameTransfer.index.div.cTrans') }}</span>
            <span v-else>{{ $t('members.memberGameTransfer.index.div.unk') }}</span>
          </template>
      </el-table-column>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.tAmt') " align="center" prop="transferAmount" width="180"/>
      <el-table-column :label=" $t('members.memberGameTransfer.index.div.tAmt') " align="center" prop="transferTime" width="180">
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
