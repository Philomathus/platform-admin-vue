<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker
          type="daterange"
          v-model="queryParams.selectDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          range-separator="至"
          clearable
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="会员ID/主播ID"
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
          v-hasPermi="['admin:liveProplog:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveProplogList">
      <el-table-column label="会员ID" align="center" prop="pUserId" width="120"/>
      <el-table-column label="礼物名" align="center" prop="propName"/>
      <el-table-column label="礼物金额" align="center" prop="totalDiamonds"/>
      <el-table-column label="主播ID" align="center" prop="toUserId"/>
      <el-table-column label="送礼日期" align="center" prop="createtime" min-width="160"/>
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
import {
  listLiveProplog,
  exportLiveProplog
} from '@/api/platform-web/member/liveProplog'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'LiveProplog',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
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
      // 用户送礼日志表格数据
      liveProplogList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        searchValue: null,
        selectDate: [this.parseTime(new Date,'{y}-{m}-{d}'), this.parseTime(new Date,'{y}-{m}-{d}')],
        orderByColumn: 'createtime',
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
    /** 查询用户送礼日志列表 */
    getList() {
      this.loading = true
      listLiveProplog(this.queryParams).then(response => {
        this.liveProplogList = response.rows
        this.total = response.total
      }).catch(() => {
        this.$notify.error('网络异常')
      }).finally(() => {
        this.loading = false
      })
    },
    // 表单重置
    reset() {
      this.form = {
        searchValue: null
      }
      this.resetForm('form')
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
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有用户送礼日志数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLiveProplog(queryParams)
      }).then(response => {
        this.download(response.msg)
      })
    }
  }
}
</script>
