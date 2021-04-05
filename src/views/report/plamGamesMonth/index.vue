<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px"
             v-show="showSearch"
    >
      <el-form-item label="月份选择" prop="begindate">
        <el-date-picker
          v-model="queryParams.begindate"
          type="month"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="平台名称" prop="gameplame">
        <el-input
          v-model="queryParams.gameplame"
          placeholder="请输入平台名称"
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
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">


      <el-table v-loading="loading"
                :data="listData"
                style="width: 100%;"
                :stripe="true"
      >
        <el-table-column label="平台名称" align="center" prop="gameplame"/>
        <el-table-column label="盈利" align="center" prop="yingli"/>
        <el-table-column label="报表月份" align="center" prop="date"/>

      </el-table>
    </div>
  </div>
</template>

<script>
import { listMonth,  exportReportPlamGames } from '@/api/platform-web/report/gameBet'
export default {
  name: 'PlamGamesMonth',
  data() {
    return {

      interval: { listTime: null },
      // 遮罩层
      loading: true,
      // 遮罩层
      listLoading: false,
      // 总条数
      total: 0,
      // 显示搜索条件
      showSearch: true,
      isDestroyed: false,
      countBetMoney:null,
      countBetPeople:null,
      // 表格数据
      listData: [],
      data: {},
      // 查询参数
      queryParams: {
        begindate: null,
        gameplame: null
      }
    }
  },
  created() {
    this.getList()
  },
  activated() {
  },
  methods: {
    getList() {

      this.loading = true
      listMonth(this.queryParams).then(response => {
        this.listData = response.rows
      }).finally(() => {
        this.loading = false
      })
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReportPlamGames(queryParams)
      }).then(response => {
        this.downloadExcel(response, '游戏投注报表')
      }).catch(() => {
      })
    }
  }
}
</script>

