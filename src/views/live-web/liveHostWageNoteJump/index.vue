<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
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
      <el-form-item prop="familyId" style="width: 150px">
        <el-input
          v-model="queryParams.familyId"
          placeholder="家族ID"
          clearable
          size="small"
          type="number"
          class="no-number"
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
      <!--        <template slot-scope="scope">-->
      <!--          <a style="color: #00afff" @click="openQuerDetails(scope.row)">{{ scope.row.hostId }}</a>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="主播昵称" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="100"/>
      <el-table-column label="家族ID" align="center" prop="familyId">
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
      <el-table-column label="家族名称" :show-overflow-tooltip="true" align="center" prop="familyName" min-width="100"/>
      <el-table-column label="直播开始时间" align="center" prop="startTime" min-width="150"/>
      <el-table-column label="直播结束时间" align="center" prop="endTime" min-width="150"/>
      <el-table-column label="直播时长" align="center" prop="livetime" />
      <el-table-column label="礼物任务" align="center" prop="lwrenwu"/>
      <el-table-column label="时长任务" align="center" prop="screnwu"/>
      <el-table-column label="时薪" align="center" prop="coin"/>
      <el-table-column label="时长结算" align="center" prop="livetimejiesuan"/>
      <el-table-column label="收礼金额" align="center" prop="liwu"/>
      <el-table-column label="礼物提成" align="center" prop="liwujiesuanbili"/>
      <el-table-column label="礼物结算" align="center" prop="ticket"/>
      <el-table-column label="彩票投注" align="center" prop="lotteryCost"/>
      <el-table-column label="彩票提成" align="center" prop="lotteryBili"/>
      <el-table-column label="彩票结算" align="center" prop="costQianliu"/>
      <el-table-column label="开播次数" align="center" prop="times"/>
      <el-table-column label="结算总计" align="center" prop="totalsettle"/>
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
    <!--    <el-dialog :close-on-click-modal="false" title="主播时长详情" :visible.sync="open"-->
    <!--               width="1250px" append-to-body-->
    <!--    >-->
    <!--      <el-form :model="queryDetailsParams" ref="queryDetailsParams" :inline="true" label-width="68px">-->
    <!--        <el-form-item prop="dateDay">-->
    <!--          <el-date-picker clearable size="small"-->
    <!--                          v-model="queryDetailsParams.dateDay"-->
    <!--                          type="date"-->
    <!--                          format="yyyy-MM-dd"-->
    <!--                          value-format="yyyy-MM-dd"-->
    <!--                          placeholder="选择日期"-->
    <!--                          :style="{width: '100%'}"-->
    <!--                          :picker-options="pickerOptions">-->
    <!--          </el-date-picker>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item>-->
    <!--          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuerDetails">搜索</el-button>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->

    <!--      <el-table :stripe="true" v-loading="loading" :data="detailsList">-->
    <!--        <el-table-column label="主播ID" align="center" prop="hostId" min-width="100"/>-->
    <!--        <el-table-column label="主播昵称" show-overflow-tooltip align="center" prop="nickName" min-width="120"/>-->
    <!--        <el-table-column label="直播开始时间" align="center" prop="startTime" width="160"/>-->
    <!--        <el-table-column label="直播结束时间" align="center" prop="endTime" width="160"/>-->
    <!--        <el-table-column label="直播时长（小时）" align="center" prop="liveTimeSec" width="130">-->
    <!--          <template v-slot="{row}">-->
    <!--            {{(row.liveTimeSec/3600).toFixed(2)}}-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column label="主播结算印票" align="center" prop="ticket" width="130"/>-->
    <!--        <el-table-column label="彩票投注" align="center" prop="cpCost" min-width="120"/>-->
    <!--       <el-table-column label="彩票派奖" align="center" prop="cpPrize" min-width="120"/>-->
    <!--        <el-table-column label="备注" align="center" prop="remark" min-width="120"/>-->
    <!--        <el-table-column label="创建日期" align="center" prop="createTimes" width="160"/>-->
    <!--      </el-table>-->
    <!--      <pagination-->
    <!--        v-show="detailsTotal>0"-->
    <!--        :total="detailsTotal"-->
    <!--        :page-sizes="[10,20,100]"-->
    <!--        :page.sync="queryDetailsParams.pageNum"-->
    <!--        :limit.sync="queryDetailsParams.pageSize"-->
    <!--        @pagination="getDetailsList"-->
    <!--      />-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import {
  listHostWageNotePage,
  exportHostWageNote,
  listHostWageNoteDetailsPage
} from '@/api/live-web/liveHostWageNote'
import {toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'LiveHostWageNote',
  components: {},
  data() {
    return {
      //快捷日期
      pickerOptions: {shortcuts: toyesDayshortcuts},
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      //结算总计统计
      totalsettleTotalList: [],
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
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
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
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
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
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      const familyId = this.$route.query.familyId
      const createTime = this.$route.query.createTime
      const hostId = this.$route.query.hostId
      // const settlementRate = this.$route.query.settlementRate
      //const selectDate = this.$route.query.selectDate
      if (familyId && familyId >= 0) {
        this.queryParams.familyId = familyId
      } else {
        this.queryParams.familyId = null
      }
      if (hostId != null && familyId == 0) {
        this.queryParams.hostId = hostId
      }
      this.queryParams.dateDay = createTime
      /* if (settlementRate != null) {
         this.queryParams.settlementRate = settlementRate
       }*/
      /*if (selectDate != null) {
        this.queryParams.selectDate = selectDate
      }*/
      this.getList()
    },
    /** 查询主播时长列表 */
    getList() {
      this.loading = true
      listHostWageNotePage(this.queryParams).then(response => {
        this.liveHostWageNoteList = response.rows
        if (this.liveHostWageNoteList.length !== 0) {
          this.liveHostWageNoteList.forEach(value => {
            if (value.livetimejiesuan !== null) {
              value.totalsettle = (parseFloat(value.livetimejiesuan) + parseFloat(value.ticket) + parseFloat(value.costQianliu)).toFixed(2)
            } else {
              value.totalsettle = (parseFloat(value.ticket) + parseFloat(value.costQianliu)).toFixed(2)
            }
            this.totalsettleTotalList.push(value.totalsettle)
          })
          for (var i = 0; i < this.totalsettleTotalList.length; i++) {
            this.totalsettleTotal += parseFloat(this.totalsettleTotalList[i]);
          }
          this.totalsettleTotal = parseFloat(this.totalsettleTotal).toFixed(2)
        }
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
      // this.queryDetailsParams.dateDay = row.dateDay
      this.getDetailsList()
    },
    handleQuerDetails() {
      this.queryDetailsParams.pageNum = 1
      this.getDetailsList()
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
        return exportHostWageNote(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播时长')
      }).catch(() => {
      })
    }
  }
}
</script>
