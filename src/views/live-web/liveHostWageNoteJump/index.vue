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
          type="number"
          class="no-number"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList"
    >
      <el-table-column label="主播ID" align="center" prop="hostId" min-width="100">
        <template slot-scope="scope">
          <a style="color: #00afff" @click="openQuerDetails(scope.row)">{{ scope.row.hostId }}</a>
        </template>
      </el-table-column>
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
            <table>
              <tr>
                <td style="text-align: right">家 族 ID：</td>
                <td style="text-align: left">{{ scope.row.familyId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家 族 长 ID：</td>
                <td style="text-align: left">{{ scope.row.familyUserId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">家族长昵称：</td>
                <td style="text-align: left">{{ scope.row.familyNickName }}</td>
              </tr>
            </table>
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

    <!--主播时长详情-->
    <el-dialog :close-on-click-modal="false" title="主播时长详情" :visible.sync="open"
               width="1250px" append-to-body
    >
      <el-form :model="queryDetailsParams" ref="queryDetailsParams" :inline="true" label-width="68px">
        <el-form-item label="日期范围" prop="selectDate">
          <el-date-picker type="daterange" v-model="queryDetailsParams.selectDate" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          range-separator="至" clearable :picker-options="pickerOptions"
                          style="width: 250px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuerDetails">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-table :stripe="true" v-loading="loading" :data="detailsList">
        <el-table-column label="主播ID" align="center" prop="hostId" min-width="100"/>
        <el-table-column label="主播昵称" show-overflow-tooltip align="center" prop="nickName" min-width="120"/>
        <el-table-column label="直播开始时间" align="center" prop="startTime" width="160"/>
        <el-table-column label="直播结束时间" align="center" prop="endTime" width="160"/>
        <el-table-column label="直播时长（小时）" align="center" prop="liveTimeSec" width="130">
          <template v-slot="{row}">
            {{(row.liveTimeSec/3600).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column label="主播直播结算印票" align="center" prop="ticket" width="130"/>
<!--        <el-table-column label="彩票投注" align="center" prop="cpCost" min-width="120"/>
        <el-table-column label="彩票派奖" align="center" prop="cpPrize" min-width="120"/>-->
        <el-table-column label="备注" align="center" prop="remark" min-width="120"/>
        <el-table-column label="创建日期" align="center" prop="createTimes" width="160"/>
      </el-table>
      <pagination
        v-show="detailsTotal>0"
        :total="detailsTotal"
        :page-sizes="[10,20,100]"
        :page.sync="queryDetailsParams.pageNum"
        :limit.sync="queryDetailsParams.pageSize"
        @pagination="getDetailsList"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  listHostWageNotePage,
  exportHostWageNote,
  listHostWageNoteDetailsPage
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
        pageSize: 20,

      },
      detailsList: [],
      detailsTotal: 0,
      queryDetailsParams: {
        selectDate: [this.parseTime(new Date, '{y}-{m}-{d}'), this.parseTime(new Date, '{y}-{m}-{d}')],
        pageNum: 1,
        pageSize: 20,
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
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      const familyId = this.$route.query.familyId
      const settlementRate = this.$route.query.settlementRate
      const selectDate = this.$route.query.selectDate
      if (familyId && familyId >= 0) {
        this.queryParams.familyId = familyId
      } else {
        this.queryParams.familyId = null
      }
      if (settlementRate != null) {
        this.queryParams.settlementRate = settlementRate
      }
      if (selectDate != null) {
        this.queryParams.selectDate = selectDate
      }
      this.getList()
    },
    /** 查询主播时长列表 */
    getList() {
      this.loading = true
      listHostWageNotePage(this.queryParams).then(response => {
        this.liveHostWageNoteList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    getDetailsList() {
      this.loading = true
      listHostWageNoteDetailsPage(this.queryDetailsParams).then(response => {
        this.detailsList = response.rows
        this.detailsTotal = response.total
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
    openQuerDetails(row) {
      this.open = true
      this.queryDetailsParams.hostId = row.hostId
      this.queryDetailsParams.selectDate = row.timedata.split(' - ')
      this.getDetailsList()
    },
    handleQuerDetails() {
      this.queryDetailsParams.pageNum = 1
      this.getDetailsList()
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
