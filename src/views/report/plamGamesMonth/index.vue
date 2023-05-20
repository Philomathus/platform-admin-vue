<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">{{ $t('report.plamGamesMonth.tb') }} {{ this.countData.countBetMoney || 0 }}</el-button>
    <el-button type="primary" @click="copy2">{{ $t('report.plamGamesMonth.tp') }} {{ this.countData.countPaiCai || 0 }}</el-button>
    <el-button type="primary" @click="copy3">{{ $t('report.plamGamesMonth.tpro') }} {{ this.countData.countGameProfit || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px"
             v-show="showSearch"
    >
      <el-form-item :label=" $t('report.plamGamesMonth.ms') " prop="begindate">
        <el-date-picker
          v-model="queryParams.begindate"
          type="month"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          :placeholder=" $t('report.plamGamesMonth.sm') ">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label=" $t('report.plamGamesMonth.pn') " prop="gameplame">
        <el-input
          v-model="queryParams.gameplame"
          :placeholder=" $t('report.plamGamesMonth.pepn') "
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
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">


      <el-table v-loading="loading"
                :data="listData"
                style="width: 100%;"
                :stripe="true"
      >
        <el-table-column :label=" $t('report.plamGamesMonth.pn') " align="center" prop="gameplame"/>
        <el-table-column :label=" $t('report.plamGamesMonth.bet') " align="center" prop="gamecell"/>
        <el-table-column :label=" $t('report.plamGamesMonth.pc') " align="center" prop="paicai"/>
        <el-table-column :label=" $t('report.plamGamesMonth.pro') " align="center" prop="gameprofit"/>
        <el-table-column :label=" $t('report.plamGamesMonth.stam') " align="center" prop="date"/>

      </el-table>
    </div>
  </div>
</template>

<script>
import { listMonth,  exportReportPlamGames,countBet} from '@/api/platform-web/report/gameBet'
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
      countPaiCai:null,
      countGameProfit:null,
      countBetPeople:null,
      // 表格数据
      listData: [],
      countData: {},
      // 查询参数
      queryParams: {
        begindate: null,
        gameplame: null
      }
    }
  },
  created() {
    this.getList()
    this.countBet()
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

    //复制
    copy1() {
      this.copyCommand(this.countData.countBetMoney)
    },
    copy2() {
      this.copyCommand(this.countData.countPaiCai)
    },
    copy3() {
      this.copyCommand(this.countData.countGameProfit)
    },


    countBet() {
      this.loading = true
      countBet(this.queryParams).then(response => {
        this.countData = response.data
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
      this.countBet()

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm( this.$t('report.planGamesMonth.cpe') , this.$t('global.dialogTitle'), {
        confirmButtonText: this.$t('global.confirmButton'),
        cancelButtonText: this.$t('global.cancelButton'),
        type: 'warning'
      }).then(function() {
        return exportReportPlamGames(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('report.planGamesMonth.gbs'))
      }).catch(() => {
      })
    }
  }
}
</script>

