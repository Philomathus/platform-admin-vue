<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px" v-show="showSearch">
      <el-form-item :label=" $t('report.gameBetJump.gbs') " prop="begindate" label-width="100">
        <el-date-picker type="daterange"
                        v-model="queryParams.dateRange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '95%' }"
                        :start-placeholder=" $t('global.dateTimePickerStartTimePlaceholder') "
                        :end-placeholder=" $t('global.dateTimePickerEndTimePlaceholder') "
                        :range-separator=" $t('global.selectDateRangeSeparator') "
                        clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label=" $t('report.gameBetJump.sbn') " prop="agentchildname" label-width="100">
        <el-input
          v-model="queryParams.agentchildname"
          :placeholder=" $t('report.gameBetJump.pensp') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label=" $t('report.gameBetJump.pn') " prop="gameplame" label-width="100">
        <el-input
          v-model="queryParams.gameplame"
          :placeholder=" $t('report.gameBetJump.pepn') "
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading"
              :data="list"
              style="width: 100%;"
              :stripe="true"
    >
      <el-table-column :label=" $t('report.gameBetJump.pnum') " align="center" prop="gameagent" :show-overflow-tooltip="true"/>
      <el-table-column :label=" $t('report.gameBetJump.nd') " align="center" prop="gameplame"/>
      <el-table-column :label=" $t('report.gameBetJump.sbnum') " align="center" prop="agentchild"/>
      <el-table-column :label=" $t('report.gameBetJump.sbn') " align="center" prop="agentchildname"/>
      <el-table-column :label=" $t('report.gameBetJump.nob') " align="center" prop="gamepepole">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="handleClickBetCount(row)">{{row.gamepepole}}</a>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('report.gameBetJump.br') " align="center" prop="gametouzhu"/>
      <el-table-column :label=" $t('report.gameBetJump.tba') " align="center" prop="gamecell"/>
      <el-table-column :label=" $t('report.gameBetJump.eba') " align="center" prop="gamebet"/>
      <el-table-column :label=" $t('report.gameBetJump.pp') " align="center" prop="gamerevenve"/>
      <el-table-column :label=" $t('report.gameBetJump.mp') " align="center" prop="gameprofit"/>
      <el-table-column :label=" $t('report.gameBetJump.prop') " align="center" prop="bili"/>
      <el-table-column :label=" $t('report.gameBetJump.date')" align="center" prop="begindate"/>
    </el-table>
    <TableShow ref="tableShow"></TableShow>
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
</template>

<script>
import {list} from '@/api/platform-web/report/gameBetJump'
import { pickerDateShortcuts } from '@/utils/dateUtils'
import TableShow from '@/views/report/gameBetJump/tableShow.vue';


export default {
  name: 'GameBetJump',
  components: {TableShow},
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
      data: {},
      pickerOptions: { shortcuts: pickerDateShortcuts },
      // 查询参数
      queryParams: {
        agentchildname: null,
        gameplame: null,
        dateRange: [],
        pageSize: 10,
        pageNum: 1
      },
      backupDateTimeRange: null,
      params: {
        gamepepole: null,
        platformId: null,
        agentchild: null,
        begindate: null,
        gameagent: null,
        gameUuid: null,
        endDate: null,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  created() {
    this.init()
  },
  activated(){
    this.init()
  },
  methods: {

    init(){

      var begindate = this.$route.query.begindate;
      var endDate   = this.$route.query.endDate;
      var gameplame = this.$route.query.gameplame;
      var startDate = this.$route.query.startDate;

      if (startDate != null && endDate != null){
        this.queryParams.dateRange = [ begindate, endDate ];
      }

      if(gameplame!=null) {
        this.queryParams.gameplame = gameplame;
      }
      this.getList()
    },

    getList() {
      this.loading = true
      if (this.queryParams.dateRange) {
        this.queryParams.begindate = this.queryParams.dateRange[0];
        this.queryParams.endDate   = this.queryParams.dateRange[1];
        this.backupDateTimeRange   = this.queryParams.dateRange;
      } else {
        this.msgError( this.$t('report.gameBetJump.tdir') );
        this.queryParams.dateRange = this.backupDateTimeRange;
        }
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    handleClickBetCount(row) {
      this.params.begindate  = this.queryParams.dateRange[0];
      this.params.endDate    = this.queryParams.dateRange[1];
      this.params.agentchild = row.agentchild
      this.params.gamepepole = row.gamepepole;
      this.params.gameagent  = row.gameagent;
      this.params.gameUuid   = row.gameUuid;

      this.$refs.tableShow.setParam(this.params);
    },
  }
}
</script>

