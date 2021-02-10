<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" v-show="showSearch">

      <el-form-item label="日期选择" prop="reporttime">
        <el-date-picker v-model="queryParams.reporttime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="名称" prop="classTwoname">
        <el-input
          v-model="queryParams.classTwoname"
          placeholder="请输入用户名称"
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


    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:report-plam-com:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%;"
      :stripe="true"
    >
      <el-table-column label="名称" align="center" prop="classTwoname" :show-overflow-tooltip="true"/>
      <el-table-column label="金额" align="center" prop="tValue" :show-overflow-tooltip="true"/>
      <el-table-column label="类型" align="center" prop="type"/>
      <el-table-column label="时间" align="center" prop="reporttime" width="180"/>
    </el-table>
<!--    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>-->
  </div>
</template>

<script>
import { list, listStorage,exportReportPlamCom } from '@/api/platform-web/report/comprehensiveStatistics'
import { getYesterDate } from '@/utils/dateUtils'

export default {
  name: 'Online',
  data() {
    return {
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
    this.getlistStorage()
    this.getList()

  },
  methods: {
    /** 查询登录日志列表 */
    getlistStorage() {
      this.loading = true
      listStorage(this.queryParams).then(response => {
      })
    },
    getList() {
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getlistStorage()
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
      this.$confirm('是否确认导出所有列表数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReportPlamCom(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>

