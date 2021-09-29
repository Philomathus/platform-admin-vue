<template>
  <div class="app-container">
    <el-button type="primary">总充值 {{ this.totalData.total.toFixed(2) }}</el-button>
    <el-button type="success">总打码 {{ this.totalData.countCur.toFixed(2) }}</el-button>
    <el-button type="warning">还需打码 {{ (this.totalData.total - this.totalData.countCur).toFixed(2) }}</el-button>
    <el-form :model="queryParams" ref="queryForm" style="margin-top: 10px" :inline="true" v-show="showSearch" label-width="100px">
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
      <el-form-item prop="userId">
        <el-input
          v-model.trim="queryParams.userId"
          placeholder="会员ID"
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
          v-hasPermi="['member:memberBcode:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="memberBcodeList">
      <el-table-column label="会员ID" align="center" prop="userId"/>
      <el-table-column label="收入" align="center" prop="income"/>
      <el-table-column label="描述" align="center" prop="des"/>
      <el-table-column label="是否打码" align="center" prop="status" :formatter="formatterStatus"/>
      <el-table-column label="当前打码量" align="center" prop="cur"/>
      <el-table-column label="创建时间" align="center" prop="createTime" min-width="160"/>
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
  listMemberBcode,
  exportMemberBcode,
  getTotalData
} from '@/api/platform-web/member/memberBcode'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'MemberBcode',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      //顶部的三个总数据
      totalData: {
        total: 0,
        countCur: 0
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
      // 会员打码数据表格数据
      memberBcodeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userId: null,
        selectDate: [this.parseTime(new Date, '{y}-{m}-{d}'), this.parseTime(new Date, '{y}-{m}-{d}')],
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
    this.getTotalData()
  },
  methods: {
    getTotalData() {
      getTotalData(this.queryParams).then((res) => {
        this.totalData = res.data
      }).catch(() => {
        this.$notify.error('网络异常')
      })
    },
    // 0:未洗码1已经洗码
    formatterStatus(row) {
      if (row.status == 0) {
        return '未打码'
      } else if (row.status == 1) {
        return '已打码'
      } else {
        return '未知'
      }
    },
    /** 查询会员打码数据列表 */
    getList() {
      this.loading = true
      listMemberBcode(this.queryParams).then(response => {
        this.memberBcodeList = response.rows
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
        id: null,
        userId: null,
        des: null,
        income: null,
        createTime: null,
        status: 0,
        cur: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
      this.getTotalData()
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
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportMemberBcode(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员打码数据')
      }).catch(() => {
      })
    }
  }
}
</script>
