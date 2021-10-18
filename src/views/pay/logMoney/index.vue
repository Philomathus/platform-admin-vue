<template>
  <div class="app-container">
    <div v-loading="totalLoading">
      <el-button type="primary" @click="copy1">行为类型统计 {{ this.totalData.totalIncome || 0 }}</el-button>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="listCount()" style="margin-left: 20px">统计查询
      </el-button>
    </div>
    <!--    <el-button type="primary" @click="copy1">总收入 {{ this.totalData.totalIncome || 0 }}</el-button>-->
    <!--    <el-button type="success" @click="copy2">总支出 {{ this.totalData.totalPay || 0 }}</el-button>-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px"
             style="margin-top: 10px">
      <el-form-item label="行为类型" prop="type" class="checkbox-type">
        <el-checkbox-group v-model="queryParams.types" size="medium">
          <el-checkbox v-for="item in typeOptions" :key="item.type" :label="item.type">{{ item.des }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="创建时间" prop="selectDate" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}" start-placeholder="开始时间"
                        end-placeholder="结束时间" :default-time="['00:00:00', '23:59:59']" range-separator="至" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="mark">
        <el-select v-model="queryParams.mark" placeholder="请选择入款备注" clearable size="small">
          <el-option
            v-for="dict in markOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:logMoney:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :stripe="true" stripe v-loading="loading" :data="logMoneyList">
      <el-table-column label="会员ID" align="center" prop="userId" min-width="120"/>
      <el-table-column label="账号" align="center" prop="userName" min-width="120"/>
      <el-table-column label="行为类型" align="center" prop="des" min-width="120"/>
      <el-table-column label="备注" align="center" prop="mark" min-width="260" :show-overflow-tooltip="true"/>
      <el-table-column label="订单号备注" align="center" prop="markorder" min-width="320" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <a style="color: #00afff"
             @click="jump(scope.row.userId,parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}'))">{{
              parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}')
            }}</a>
        </template>
      </el-table-column>
      <el-table-column label="收入" align="center" prop="income" min-width="90"/>
      <el-table-column label="支出" align="center" prop="pay" min-width="90"/>
      <el-table-column label="变化前余额" align="center" prop="totalBefore" min-width="90"/>
      <el-table-column label="余额" align="center" prop="total" min-width="90"/>
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
import {listLogMoney, exportLogMoney, listCount, totalCount} from '@/api/platform-web/pay/logMoney'
import {allTradeType} from '@/api/platform-web/config/tradeType'
import {pickerDateTimeShortcuts} from '@/utils/dateUtils'

export default {
  name: 'LogMoney',
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      //统计
      totalData: {},
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
      //  会员资金信息表格数据
      logMoneyList: [],
      //统计状态
      totalLoading: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 备注字典
      markOptions: [],
      // 行为类型
      typeOptions: [],
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'a.create_time',
        isAsc: 'desc',
        userId: null,
        userName: null,
        types: [],
        createTime: null,
        mark: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    // this.totalCount()
    this.getDicts('log_money_mark').then(response => {
      this.markOptions = response.data
    })
    this.getTypeData()
  },
  methods: {
    listCount() {
      if (this.queryParams.type === null || this.queryParams.type === '' || this.queryParams.types.length === 0) {
        this.$message.error("请至少选择一个行为类型")
      } else if (this.queryParams.searchValue === null || this.queryParams.searchValue === '' || this.queryParams.searchValue === undefined) {
        this.$message.error("请输入会员ID")
      } else {
        this.totalLoading = true
        listCount(this.queryParams).then((res) => {
          this.totalData = res.data
        }).finally(() => {
          this.totalLoading = false
        })
      }
    },
    // totalCount(){
    //   totalCount(this.queryParams).then((res) => {
    //           this.totalData = res.data;
    //         })
    // },
    //复制
    copy1() {
      this.copyCommand(this.totalData.totalIncome)
    },
    copy2() {
      this.copyCommand(this.totalData.totalPay)
    },
    jump(userId, createTime) {
      this.$router.push({path: '/member/memberGameData', query: {userId: userId, createTime: createTime,}})
    },
    /** 查询 会员资金信息列表 */
    getList() {
      this.loading = true
      listLogMoney(this.queryParams).then(response => {
        this.logMoneyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 查询资金交易类型列表 */
    getTypeData() {
      allTradeType().then(response => {
        this.typeOptions = response.data
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.searchValue){
        const reg = '^[0-9_]{1,}$'
        let flag = this.queryParams.searchValue.match(reg)
        if(!flag){
          this.msgError("会员ID只能输入数字及下划线")
          return
        }
      }
      this.queryParams.pageNum = 1
      this.getList()
      // this.totalCount()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportLogMoney(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员资金')
      }).catch(() => {
      })
    }
  }
}
</script>
<style>
.checkbox-type .el-form-item__content {
  width: 90%;
}
</style>
