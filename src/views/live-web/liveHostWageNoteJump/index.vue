<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable :picker-options="pickerOptions"
                        style="width: 250px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="散户结算率" prop="settlementRate" label-width="85px">
        <el-input
          v-model="queryParams.settlementRate"
          placeholder="请输入散户结算率"
          size="small"
          @keyup.enter.native="handleQuery"
          style="width: 60px;"
        />
      </el-form-item>
      <el-form-item prop="hostId" style="width: 150px">
        <el-input
          v-model="queryParams.hostId"
          placeholder="主播ID"
          clearable
          size="small"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList"
    >
      <el-table-column label="主播ID" align="center" prop="hostId" min-width="100"/>
      <el-table-column label="主播昵称" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="120"/>
      <el-table-column label="家族ID" align="center" prop="familyId" min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.familyId === 0">{{ scope.row.familyId }}</span>
          <el-popover
            v-else
            placement="top"
            :title="scope.row.familyName"
            width="200"
            trigger="click"
          >
            <div>家族ID：{{ scope.row.familyId }}</div>
            <div>家族长ID：{{ scope.row.familyUserId }}</div>
            <div>家族长昵称：{{ scope.row.familyNickName }}</div>
            <a slot="reference" style="color: #00afff">{{ scope.row.familyId }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="家族名称" :show-overflow-tooltip="true" align="center" prop="familyName" min-width="150"/>
      <el-table-column label="直播总时长(小时)" align="center" prop="alltimeDes" min-width="100"/>
      <el-table-column label="直播礼物总结算" align="center" prop="allticket" min-width="100"/>
      <el-table-column label="直播礼物折扣结算" align="center" prop="allticketRes" min-width="100"/>
      <el-table-column label="结算率" align="center" prop="settlementRate" min-width="80"/>
      <el-table-column label="统计日期" align="center" prop="timedata" width="180"/>
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
  listHostWageNotePage,
  exportHostWageNote
} from '@/api/live-web/liveHostWageNote'
import { pickerDateShortcuts } from '@/utils/dateUtils'

export default {
  name: 'LiveHostWageNote',
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
      // 主播时长表格数据
      liveHostWageNoteList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        selectDate: [this.parseTime(new Date, '{y}-{m}-{d}'), this.parseTime(new Date, '{y}-{m}-{d}')],
        nickName: null,
        hostId: null,
        settlementRate: 0.7,
        pageNum: 1,
        pageSize: 20
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
  },
  activated() {
    const familyId = this.$route.query.familyId
    const settlementRate = this.$route.query.settlementRate
    const selectDate = this.$route.query.selectDate
    if (familyId && familyId >= 0) {
      this.queryParams.familyId = familyId
    }
    if (settlementRate != null) {
      this.queryParams.settlementRate = settlementRate
    }
    if (selectDate != null) {
      this.queryParams.selectDate = selectDate
    }
    this.getList()
  },
  methods: {
    /** 查询主播时长列表 */
    getList() {
      this.loading = true
      listHostWageNotePage(this.queryParams).then(response => {
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
      }).then(function() {
        return exportHostWageNote(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播时长')
      }).catch(() => {
      })
    }
  }
}
</script>
