<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总投注金额: {{ this.countBetMoney || 0 }}</el-button>
    <el-button type="success" @click="copy2">总投注人数: {{ this.countBetPeople || 0 }}</el-button>
    <el-button type="success">会员盈利: {{ this.memberProfit || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px"
             v-show="showSearch"
    >
      <el-form-item label="日期选择" prop="selectDate">
        <el-date-picker type="datetimerange"
                        v-model="queryParams.dateRange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '95%' }"
                        start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至"
                        clearable
                        :default-time="getDefaultTime()"
                        :picker-options="pickerOptions"
        ></el-date-picker>
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
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['admin:reportPlamGames:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <div ref="container" style="position: relative">


      <el-table v-loading="loading"
                :data="dataList"
                style="width: 100%;"
                :stripe="true"
      >
        <el-table-column label="平台编号" align="center" prop="gameagent" :show-overflow-tooltip="true"/>
        <el-table-column label="名称-详情" align="center" prop="gameplame">
          <template slot-scope="scope">
            <a style="color: #00afff" @click="jump(scope.row.begindate,scope.row.gameplame)">{{ scope.row.gameplame }}</a>
          </template>
        </el-table-column>
        <el-table-column label="投注人数" align="center" prop="gamepepole"/>
        <el-table-column label="投注比数" align="center" prop="gametouzhu"/>
        <el-table-column label="总投注金额" align="center" prop="gamecell"/>
        <el-table-column label="有效投注金额" align="center" prop="gamebet"/>
        <el-table-column label="会员盈利" align="center" prop="gameprofit"/>
        <el-table-column label="比例" align="center" prop="bili"/>
        <el-table-column label="日期" align="center" prop="begindate"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
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
import { getDefaultTime, pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'GameBet',
  data() {
    return {
      //日期快捷
      pickerOptions: { shortcuts: pickerDateShortcuts },
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
      memberProfit:null,
      // 表格数据
      list: [],
      data: {},
      dataList: [],
      // 查询参数
      queryParams: {
        rows: [],
        pageNum: 1,
        pageSize: 20,
        dateRange: [ this.parseTime( this.getTodayStartTime() ), this.parseTime( this.getTodayEndTime() ) ],
        gameplame: null
      },
      backupDateTimeRange: null
    }
  },
  created() {
    this.getList()
    this.count();
  },
  activated() {
  },
  destroyed() {
    this.isDestroyed = true
    this.listLoading = false
  },
  methods: {
    getDefaultTime,
    getList() {
      this.loading = true
      if ( this.queryParams.dateRange ){
        this.queryParams.begindate = this.queryParams.dateRange[0];
        this.queryParams.endDate   = this.queryParams.dateRange[1];
        this.backupDateTimeRange   = this.queryParams.dateRange;
      } else {
        this.msgError("日期是必需的");
        this.queryParams.dateRange = this.backupDateTimeRange;
      }

      listGameBet(this.queryParams).then(response => {
        this.dataList = response.rows
        this.total = response.total
        this.listLoading = false
        this.$rjLoading.hide()
        this.count()
      }).catch((err) => {
        if (err == 'Error: 报表正在生成，请稍后...') {
          if (!this.listLoading) {
            this.listLoading = true
            this.$rjLoading.show('报表正在生成', that)
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
      let startDate = this.queryParams.dateRange ? this.queryParams.dateRange[0]: null;
      let endDate = this.queryParams.dateRange ? this.queryParams.dateRange[1] : null;

      if ( this.queryParams.dateRange != null ){
        begindate = startDate;
      }
      this.$router.push(
        {
          path: '/report/gameBetJump',
          query: {
            gameplame: gameplame,
            begindate: begindate,
            startDate: startDate,
            endDate:   endDate
          }
       })
    },
    //统计
    count() {
      this.loading = true
      count(this.queryParams).then(response => {
        this.data = response.rows
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {

      this.queryParams.pageNum = 1
      this.getList()
      this.count();

    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.queryParams.dateRange = [ this.parseTime( this.getTodayStartTime() ), this.parseTime( this.getTodayEndTime() ) ];
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

