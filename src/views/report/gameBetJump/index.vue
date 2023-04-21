<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" label-width="68px" v-show="showSearch">
      <el-form-item label="日期选择" prop="begindate">
        <el-date-picker type="datetimerange"
                        v-model="queryParams.dateRange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :style="{ width: '95%' }"
                        start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至"
                        clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="子平台名" prop="agentchildname">
        <el-input
          v-model="queryParams.agentchildname"
          placeholder="请输入子平台名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台名称" prop="gameplame">
        <el-input
          v-model="queryParams.gameplame"
          placeholder="请输入平台名称"
          clearable
          size="small"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
      <el-table-column label="平台编号" align="center" prop="gameagent" :show-overflow-tooltip="true"/>
      <el-table-column label="名称-详情" align="center" prop="gameplame"/>
      <el-table-column label="子平台编号" align="center" prop="agentchild"/>
      <el-table-column label="子平台名称" align="center" prop="agentchildname"/>
      <el-table-column label="投注人数" align="center" prop="gamepepole"/>
      <el-table-column label="投注比数" align="center" prop="gametouzhu"/>
      <el-table-column label="总投注金额" align="center" prop="gamecell"/>
      <el-table-column label="有效投注金额" align="center" prop="gamebet"/>
      <el-table-column label="平台抽水" align="center" prop="gamerevenve"/>
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
</template>

<script>
import { list } from '@/api/platform-web/report/gameBetJump'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'GameBetJump',
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
        dateRange: [],
        pageNum: 1,
        pageSize: 10,
        agentchildname: null,
        gameplame: null
      },
      backupDateTimeRange: null
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
        this.msgError("日期是必需的");
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
    }

  }
}
</script>

