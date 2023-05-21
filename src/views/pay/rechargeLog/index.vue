<template>
  <div class="app-container">
<!--    search data -->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="50px">
      <el-form-item :label=" $t('global.selectDate') " prop="createTime" label-width="100px">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '100%'}"
                        :start-placeholder=" $t('global.datePickerStartDatePlaceholder') "
                        :end-placeholder=" $t('global.datePickerEndDatePlaceholder') "
                        :range-separator=" $t('global.selectDateRangeSeparator') "
                        :default-time="['00:00:00', '23:59:59']" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('global.memberId') " prop="memberId" label-width="90px">
        <el-input
          v-model="queryParams.memberId"
          :placeholder="$t('global.memberIdPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item :label="$t('global.bankCard')" prop="card"  label-width="100px">
        <el-input
          v-model="queryParams.card"
          placeholder="请输入会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

<!--    export data-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:rechargeLog:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

<!--  show data table -->
    <el-table stripe :stripe="true" v-loading="loading" :data="rechargeLogList">
      <el-table-column :label="$t('global.memberId')" align="center" prop="memberId"/>
      <el-table-column :label="$t('global.memberIp')" align="center" prop="ip"/>
      <el-table-column :label="$t('global.memberVip')" align="center" prop="vip"/>
      <el-table-column :label="$t('global.bankCard')" align="center" prop="card"/>
      <el-table-column :label="$t('global.createTime')" align="center" prop="createTime"/>
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

import {exportRechargeLog, listRechargeLog} from "@/api/platform-web/pay/rechargeLog";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {

  name:"rechargeLog",

  data(){

    return{
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
      showSearch: true,
      rechargeLogList:[],

      queryParams:{
        selectDate: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())],//回调日期
        pageSize:10,
        pageNum :1,
        card:null,
      }
    }
  },

  created() {
    this.getList()
  },

  methods:{
    getList() {
      this.loading = true
      listRechargeLog(this.queryParams).then(response => {
        this.rechargeLogList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },

    /** 导出按钮操作 */
    handleExport(){
      const queryParams = this.queryParams
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportRechargeLog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '充值日志列表')
      }).catch(() => {
      })
    },
    },
}

</script>

<style scoped>

</style>
