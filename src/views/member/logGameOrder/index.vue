<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="-" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="会员ID/会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" placeholder="全部类型" clearable size="small" style="width: 100px;">
          <el-option v-for="item in typeList" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" placeholder="全部状态" clearable size="small" style="width: 100px;">
          <el-option v-for="item in statusList" :label="item.label" :value="item.value"/>
        </el-select>
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
          v-hasPermi="['member:logGameOrder:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="logGameOrderList">
      <el-table-column label="会员ID" align="center" prop="memberId"/>
      <el-table-column label="会员账号" align="center" prop="userName"/>
      <el-table-column label="游戏平台" align="center" prop="platformName"/>
      <el-table-column label="金额" align="center" prop="money"/>
      <el-table-column label="开始时间" align="center" prop="bTime" min-width="160"/>
      <el-table-column label="结束时间" align="center" prop="eTime" min-width="160"/>
      <el-table-column label="类型" align="center" prop="type" min-width="60" :formatter="formatterType"/>
      <el-table-column label="状态" align="center" prop="status" min-width="60" :formatter="formatterStatus"/>
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
  listLogGameOrder,
  exportLogGameOrder
} from '@/api/platform-web/member/logGameOrder'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'LogGameOrder',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      //类型列表
      typeList: [{ label: '上分', value: '1' }, { label: '下分', value: '2' }],
      //状态列表
      statusList: [{ label: '开始', value: '0' }, { label: '失败', value: '1' }, { label: '成功', value: '2' }, { label: '异常', value: '3' }],
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
      // 会员上下分表格数据
      logGameOrderList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'e_time',
        isAsc: 'desc',
        searchValue: null,
        type: null,
        status: null,
        selectDate: [this.parseTime(new Date,'{y}-{m}-{d}'), this.parseTime(new Date,'{y}-{m}-{d}')]
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
    formatterType(row) {
      if (row.type == 1) {
        return '上分'
      } else if (row.type == 2) {
        return '下分'
      } else {
        return '未知'
      }
    },
    formatterStatus(row) {
      if (row.status == 1) {
        return '失败'
      } else if (row.status == 2) {
        return '成功'
      } else if (row.status == 3) {
        return '异常'
      } else if (row.status == 0) {
        return '开始'
      } else {
        return '未知'
      }
    },
    /** 查询会员上下分列表 */
    getList() {
      this.loading = true
      listLogGameOrder(this.queryParams).then(response => {
        this.logGameOrderList = response.rows
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
        type: null,
        memberId: null,
        userName: null,
        platformId: null,
        status: 0,
        money: null,
        bTime: null,
        eTime: null
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLogGameOrder(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员上下分')
      }).catch(() => {
      })
    }
  }
}
</script>
