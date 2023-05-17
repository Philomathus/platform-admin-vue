<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" v-show="showSearch">

      <el-form-item :label=" $t('global.selectDate') " prop="reporttime">
        <el-date-picker v-model="queryParams.reporttime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" :placeholder=" $t('report.comprehensiveStatistics.psd') " clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item :label=" $t('global.name') " prop="classTwoname">
        <el-input
          v-model="queryParams.classTwoname"
          :placeholder=" $t('global.userNamePlaceholder') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
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
          v-hasPermi="['admin:report-plam-com:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%;"
        :stripe="true"
      >
        <el-table-column :label=" $t('global.name') " align="center" prop="classTwoname" :show-overflow-tooltip="true"/>
        <el-table-column :label=" $t('report.comprehensiveStatistics.amt') " align="center" prop="tvalue" :show-overflow-tooltip="true"/>
        <el-table-column :label=" $t('report.comprehensiveStatistics.type') " align="center" prop="type"/>
        <el-table-column :label=" $t('report.comprehensiveStatistics.time') " align="center" prop="reporttime" width="180"/>
      </el-table>
    </div>
    <!--    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>-->
  </div>
</template>

<script>
import { list, listStorage, exportReportPlamCom } from '@/api/platform-web/report/comprehensiveStatistics'
import { getYesterDate } from '@/utils/dateUtils'
import { toyesDayshortcuts } from '@/utils/dateUtils'

export default {
  name: 'Report',
  data() {
    return {
      //日期快捷
      pickerOptions: { shortcuts: toyesDayshortcuts },
      interval: { listTime: null },
      // 遮罩层
      listLoading: false,
      isDestroyed: false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 显示搜索条件
      showSearch: true,
      // 表格数据
      list: [],
      // 查询参数
      queryParams: {
        reporttime: this.parseTime(getYesterDate(), '{y}-{m}-{d}'),
        classTwoname: undefined
      }
    }
  },
  created() {
    this.getList()

  },
  destroyed() {
    this.isDestroyed = true
    this.listLoading = false
  },
  methods: {
    /** 查询登录日志列表 */
    getlistStorage() {
      this.loading = true
      listStorage(this.queryParams).then(response => {
      })
    },
    getList() {
      var that = this
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        that.listLoading = false
        that.$rjLoading.hide()
      }).catch((err) => {
        if (err == this.$t('report.comprehensiveStatistics.err') ) {
          if (!that.listLoading) {
            that.listLoading = true
            that.$rjLoading.show( this.$t('report.comprehensiveStatistics.rbg') , that)
          }
          if (!this.isDestroyed) {
            setTimeout(() => {
              that.getList()
            }, 10000)
          }
        }
      }).finally(() => {
          this.loading = false
        }
      )
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm( this.$t('report.comprehensiveStatistics.cpe') , this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: 'warning'
      }).then(function() {
        return exportReportPlamCom(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('report.comprehensiveStatistics.ids') )
      }).catch(() => {
      })
    }
  }
}
</script>

