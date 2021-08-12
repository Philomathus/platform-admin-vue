<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期选择" prop="selectDate">
        <el-date-picker
          v-model="queryParams.selectDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="hostId" style="width: 150px">
        <el-input
          v-model="queryParams.hostId"
          placeholder="主播ID"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName" style="width: 150px">
        <el-input
          v-model="queryParams.nickName"
          placeholder="主播昵称"
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
          v-hasPermi="['admin:liveHostWageNote:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5" style="width: 140px">
        <el-input
          v-model="this.totalsettleTotal"
          placeholder="结算总计统计"
          readonly
          clearable
          size="small"
        >
          {{ this.totalsettleTotal || 0 }}}
        </el-input>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList"
    >
      <el-table-column label="主播ID" align="center" prop="hostId"/>
      <el-table-column label="主播昵称" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="100"/>
      <el-table-column label="开播时长" align="center" prop="livetime"/>
      <el-table-column label="时长结算" align="center" prop="livetimejiesuan"/>
      <el-table-column label="礼物结算" align="center" prop="ticket"/>
      <el-table-column label="彩票结算" align="center" prop="costQianliu"/>
      <el-table-column label="开播次数" align="center" prop="times"/>
      <el-table-column label="总收入" align="center" prop="totalsettle"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100,500]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  listHostWageNoteDaysPage,
  exportHostWageNoteDays,
} from '@/api/live-web/liveHostWageNote'
import { get7beforeDay, pickerDateShortcuts, toyesDayshortcuts } from '@/utils/dateUtils'

export default {
  name: 'liveHostWageNotedays',
  components: {},
  data() {
    return {
      //快捷日期
      pickerOptions: {shortcuts: pickerDateShortcuts},
      pickerOptionsTestAccount: {shortcuts: toyesDayshortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      //结算总计统计
      totalsettleTotalList: [],
      // 日期范围
      dateRange: [this.parseTime(get7beforeDay(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
      totalsettleTotal: null,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 主播时长表格数据
      liveHostWageNoteList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
        nickName: null,
        hostId: null,
        familyId: null,
        settlementRate: 0.7,
        pageNum: 1,
        pageSize: 100,
      },
      detailsList: [],
      detailsTotal: 0,
      queryDetailsParams: {
        //dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
        pageNum: 1,
        pageSize: 100,
        orderByColumn: 'create_time',
        isAsc: 'desc'
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
    /** 查询主播时长列表 */
    getList() {
      this.loading = true
      listHostWageNoteDaysPage(this.queryParams).then(response => {
        this.liveHostWageNoteList = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        nickName: null,
        hostId: null
      }
      this.resetForm('form')
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.totalsettleTotalList = []
      this.totalsettleTotal = null
      this.queryParams.pageNum = 1
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
      this.$confirm('是否确认导出所有主播时长数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportHostWageNoteDays(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播时长礼物彩票总和')
      }).catch(() => {
      })
    }
  }
}
</script>
