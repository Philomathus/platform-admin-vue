<template>
  <div class="app-container">
    <el-button type="primary" @click="copy1">总投注金额: {{ this.data.countBetMoney || 0 }}</el-button>
    <el-button type="success" @click="copy2">总投注人数: {{ this.data.countBetPeople || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px" v-show="showSearch">
      <el-form-item label="日期选择" prop="begindate">
        <el-date-picker v-model="queryParams.begindate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="平台名称" prop="gameplame">
        <el-input
          v-model="queryParams.gameplame"
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
          v-hasPermi="['admin:reportPlamGames:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    <el-table v-loading="loading"
              :data="list"
              style="width: 100%;"
              :stripe="true"
    >
      <el-table-column label="平台编号" align="center" prop="gameagent" :show-overflow-tooltip="true"/>
      <el-table-column label="名称-详情" align="center" prop="gameplame"/>
      <el-table-column label="名称-详情" align="center" prop="gameplame">
      <template slot-scope="scope">
        <a style="color: #00afff" @click="jump(scope.row.begindate,scope.row.gameplame)">{{scope.row.gameplame}}</a>
      </template>
      </el-table-column>
      <el-table-column label="投注人数" align="center" prop="gamepepole"/>
      <el-table-column label="投注比数" align="center" prop="gametouzhu"/>
      <el-table-column label="总投注金额" align="center" prop="gamecell"/>
      <el-table-column label="有效投注金额" align="center" prop="gamebet"/>
      <el-table-column label="平台抽水" align="center" prop="gamerevenve"/>
      <el-table-column label="会员盈利" align="center" prop="gameprofit"/>
      <el-table-column label="比例" align="center" prop="bili"/>
      <el-table-column label="日期" align="center" prop="begindate"/>
    </el-table>
    <!--    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize"/>-->
  </div>
</template>

<script>
import { list, count, liststorage,exportReportPlamGames } from '@/api/platform-web/report/gameBet'
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
      // countBetMoney:null,
      // countBetPeople:null,
      // 表格数据
      list: [],
      data: {},
      // 查询参数
      queryParams: {
        begindate: this.parseTime(getYesterDate(), '{y}-{m}-{d}'),
        gameplame: null
      }
    }
  },
  created() {
    var begindate = this.$route.query.begindate;
    var gameplame = this.$route.query.gameplame;
    if(gameplame!=null) {
      this.queryParams.gameplame = gameplame
    }
    if(begindate!=null) {
       this.queryParams.begindate = begindate
    }
    this.getliststorage()
    this.getList()
    this.count()
  },
  methods: {

    getList() {
      this.loading = true
      list(this.queryParams).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
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
    jump(begindate,gameplame){
      this.$router.push({path: '/report/gameBet',query: { begindate: begindate, gameplame:gameplame}})
    },
    //统计
    count() {
      this.loading = true
      count(this.queryParams).then(response => {
        if (response.data) {
          this.data = response.data
        }
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {

      this.pageNum = 1
      this.getliststorage()
      this.getList()
      this.count()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有会员数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReportPlamGames(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>

