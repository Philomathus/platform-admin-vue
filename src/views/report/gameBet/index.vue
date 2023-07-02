<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">{{ $t('report.gameBet.tba') }}: {{ this.data.countBetMoney || 0 }}</el-button>
    <el-button type="success" @click="copy2">{{ $t('report.gameBet.tnb') }}: {{ this.data.countBetPeople || 0 }}</el-button>
    <el-button type="success">{{ $t('report.gameBet.mp') }}: {{ this.data.memberProfit || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px"
             v-show="showSearch"
    >
      <el-form-item :label=" $t('global.selectDate') " prop="selectDate" label-width="100">
        <el-date-picker type="daterange"
                        v-model="queryParams.dateRange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '95%' }"
                        :start-placeholder=" $t('global.datePickerStartDatePlaceholder') "
                        :end-placeholder=" $t('global.datePickerEndDatePlaceholder') "
                        :range-separator=" $t('global.selectDateRangeSeparator') "
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label=" $t('report.gameBet.pn') " prop="gameplame" label-width="100">
        <el-input
          v-model="queryParams.gameplame"
          :placeholder=" $t('report.gameBet.pepn') "
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
          v-hasPermi="['admin:reportPlamGames:export']"
        >{{ $t('global.exportButton') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">


      <el-table v-loading="loading" :data="dataList" style="width: 100%;" :stripe="true">
        <el-table-column :label=" $t('report.gameBet.pnum') " align="center" prop="gameagent" :show-overflow-tooltip="true"/>
        <el-table-column :label=" $t('report.gameBet.nd') " align="center" prop="gameplame">
          <template slot-scope="scope">
            <a style="color: #00afff" @click="jump(scope.row.begindate,scope.row.gameplame)">{{
                scope.row.gameplame
              }}</a>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('report.gameBet.nob') " align="center" prop="gamepepole"/>
        <el-table-column :label=" $t('report.gameBet.br') " align="center" prop="gametouzhu"/>
        <el-table-column :label=" $t('report.gameBet.tba') " align="center" prop="gamecell"/>
        <el-table-column :label=" $t('report.gameBet.eba') " align="center" prop="gamebet"/>
        <el-table-column :label=" $t('report.gameBet.mp') " align="center" prop="gameprofit"/>
        <el-table-column :label=" $t('report.gameBet.prop') " align="center" prop="bili"/>
        <el-table-column :label=" $t('report.gameBet.date') " align="center" prop="begindate"/>
      </el-table>
      <pagination
        v-show="this.total || 0"
        :total="this.total"
        :page-sizes="[20,50,100,200]"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        layout="prev, pager, next"
        @pagination="getList"
      />
    </div>

  </div>
</template>

<script>
import {
  count,
  liststorage,
  exportReportPlamGames,
  listGameBet,
} from '@/api/platform-web/report/gameBet'
import {getYesterDateEnd, getYesterDateStart, pickerDateShortcuts} from '@/utils/dateUtils'


export default {
  name: 'GameBet',
  data() {
    return {
      //日期快捷
      pickerOptions: {shortcuts: pickerDateShortcuts},
      interval: {listTime: null},
      // 遮罩层
      loading: true,
      // 遮罩层
      listLoading: false,
      // 总条数
      total: 0,
      // 显示搜索条件
      showSearch: true,
      isDestroyed: false,
      // 表格数据
      list: [],
      data: {
        countBetMoney: null,
        countBetPeople: null,
        memberProfit: null,
      },
      dataList: [],
      // 查询参数
      queryParams: {
        rows: [],
        pageNum: 1,
        pageSize: 20,
        dateRange: [getYesterDateStart(), getYesterDateEnd()],
        gameplame: null
      },
      backupDateTimeRange: null
    }
  },
  created() {
    this.getList()
    //this.count();
  },
  activated() {
  },
  destroyed() {
    this.isDestroyed = true
    this.listLoading = false
  },
  methods: {
    getList() {
      this.loading = true
      if (this.queryParams.dateRange) {
        this.queryParams.begindate = this.queryParams.dateRange[0];
        this.queryParams.endDate = this.queryParams.dateRange[1];
        this.backupDateTimeRange = this.queryParams.dateRange;
      } else {
        this.msgError( this.$t('report.gameBet.tdr') );
        this.queryParams.dateRange = this.backupDateTimeRange;
      }

      listGameBet(this.queryParams).then(response => {
        this.dataList = response.rows
        this.total = response.total
        this.listLoading = false
        this.$rjLoading.hide()
        this.count()
      }).catch((err) => {
        if (err == this.$t('report.gameBet.trb') ) {
          if (!this.listLoading) {
            this.listLoading = true
            this.$rjLoading.show( this.$t('report.gameBet.rbg') , that)
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
    getliststorage() {
      this.loading = true
      liststorage(this.queryParams).then(response => {
      })
    },
    //复制
    copy1() {
      this.copyCommand(this.data.countBetMoney)
    },
    copy2() {
      this.copyCommand(this.data.countBetPeople)
    },
    jump(begindate, gameplame) {
      let startDate = this.queryParams.dateRange ? this.queryParams.dateRange[0] : null;
      let endDate = this.queryParams.dateRange ? this.queryParams.dateRange[1] : null;

      if (this.queryParams.dateRange != null) {
        begindate = startDate;
      }
      this.$router.push(
        {
          path: '/report/gameBetJump',
          query: {
            gameplame: gameplame,
            begindate: begindate,
            startDate: startDate,
            endDate: endDate
          }
        })
    },
    //统计
    count() {
      this.loading = true
      count(this.queryParams).then(response => {
        if( response.data ) {
          this.data = response.data
        }
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      //this.count();

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.queryParams.dateRange = [getYesterDateStart(), getYesterDateEnd()];
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm( this.$t('report.gameBet.cpe') , this.$t('global.dialogTitle') , {
        confirmButtonText: this.$t('global.confirmButton') ,
        cancelButtonText: this.$t('global.cancelButton') ,
        type: 'warning'
      }).then(function () {
        return exportReportPlamGames(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('report.gameBet.gbs') )
      }).catch(() => {
      })
    },
  }
}
</script>

