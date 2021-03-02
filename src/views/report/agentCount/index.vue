<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期选择" prop="reptime">
        <el-date-picker
          v-model="queryParams.dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          placeholder="请选择日期选择"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="渠道编码" prop="agentcode">
        <el-input
          v-model="queryParams.agentcode"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邀请账号" prop="agentname">
        <el-input
          v-model="queryParams.agentname"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['admin:reportAgentcount:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="report" :stripe="true">
      <el-table-column label="渠道编码" align="center" prop="agentcode"/>
      <el-table-column label="邀请账号" min-width="150" align="center" prop="agentname"/>
      <el-table-column label="统计时间" align="center" prop="agenttime" min-width="120"/>
      <el-table-column label="当日/总(注册人数)" min-width="130" align="center" prop="regisNumber" :formatter="regisNumber"/>
      <el-table-column label="公司入款（首充）" min-width="130" align="center" prop="gsRukuanjine"/>
      <el-table-column label="线上入款（首充）" min-width="130" align="center" prop="xsRukuanjine"/>
      <el-table-column label="手工入款（首充）" min-width="130" align="center" prop="sgRukuanjine"/>
      <el-table-column label="入款总（首充）" min-width="120" align="center" prop="totalfristRukuanjine"/>
      <el-table-column label="人/笔/金额（入款日总）" min-width="170" align="center" prop="totalRukuanjine"/>
      <el-table-column label="出款金额（首充）" min-width="130" align="center" prop="chukuanjine"/>
      <el-table-column label="人/笔/金额（出款日总）" min-width="170" align="center" prop="totalChukuanjine"/>
      <el-table-column label="送礼次数/金额" min-width="120" align="center" prop="totalGiveprop"/>
      <el-table-column label="直播间次数/活跃安卓/活跃苹果" min-width="210" align="center" prop="ios" :formatter="ios" fixed="right"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listReport, liststorage,exportReportAgentCount} from '@/api/platform-web/report/agentCount'
import { getYesterDate } from '@/utils/dateUtils'

export default {
  name: 'Report-moneyinfo',
  components: {},
  data() {
    return {
      //日期快捷
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24);
            end.setTime(end.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额表格数据
      report: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        dateRange: [this.parseTime(getYesterDate(), '{y}-{m}-{d}'), this.parseTime(getYesterDate(), '{y}-{m}-{d}')]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询平台资金报，记录平台每日收入及支出总额，预估当前会员的积分余额列表 */
    getList() {
      this.loading = true
      listReport(this.addDateRange(this.queryParams, this.queryParams.dateRange)).then(response => {
        this.report = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getListstorage() {
      this.loading = true
      liststorage(this.addDateRange(this.queryParams, this.queryParams.dateRange)).then(response => {
        this.getList()
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.repId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    regisNumber(rows, column) {
      return rows.newmember + '/' + rows.totalmember
    },
    ios(rows, column) {
      return rows.totalEnterlivetimes + '/' + rows.totalActiveandroid + '/' + rows.totalActiveios
    },
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有列表数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportReportAgentCount(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }

  }
}
</script>
