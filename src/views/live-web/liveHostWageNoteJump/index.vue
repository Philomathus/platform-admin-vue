<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('liveWeb.liveHostWageNoteJump.queryForm.dateDayPlaceholder')"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveHostWageNoteJump.queryForm.settlementRateLabel')" prop="settlementRate" label-width="85px">
        <el-input
          v-model="queryParams.settlementRate"
          :placeholder="$t('liveWeb.liveHostWageNoteJump.queryForm.settlementRatePlaceholder')"
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
          :placeholder="$t('liveWeb.liveHostWageNoteJump.queryForm.hostIdPlaceholder')"
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
          :placeholder="$t('liveWeb.liveHostWageNoteJump.queryForm.nickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="familyId" style="width: 150px">
        <el-input
          v-model="queryParams.familyId"
          :placeholder="$t('liveWeb.liveHostWageNoteJump.queryForm.familyIdPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveHostWageNoteJump.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveHostWageNoteJump.queryForm.resetButton')}}</el-button>
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
        >{{$t('liveWeb.liveHostWageNoteJump.actions.export')}}
        </el-button>
      </el-col>
      <el-col :span="1.5" style="width: 140px">
        <el-input
          v-model="this.totalsettleTotal"
          :placeholder="$t('liveWeb.liveHostWageNoteJump.statistics.totalsettleTotalPlaceholder')"
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
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.hostId')" align="center" prop="hostId"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.nickName')" :show-overflow-tooltip="true" align="center" prop="nickName" min-width="100"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.familyId')" align="center" prop="familyId">
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
                <td style="text-align: right">{{$t('liveWeb.liveHostWageNoteJump.table.familyIdPopover')}}</td>
                <td style="text-align: left">{{ scope.row.familyId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">{{$t('liveWeb.liveHostWageNoteJump.table.familyUserIdPopover')}}</td>
                <td style="text-align: left">{{ scope.row.familyUserId }}</td>
              </tr>
              <tr>
                <td style="text-align: right">{{$t('liveWeb.liveHostWageNoteJump.table.familyNickName')}}</td>
                <td style="text-align: left">{{ scope.row.familyNickName }}</td>
              </tr>
            </table>
            <a slot="reference" style="color: #00afff">{{ scope.row.familyId }}</a>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.familyName')" :show-overflow-tooltip="true" align="center" prop="familyName" min-width="100"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.startTime')" align="center" prop="startTime" min-width="150"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.endTime')" align="center" prop="endTime" min-width="150"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.livetime')" align="center" prop="livetime" />
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.lwrenwu')" align="center" prop="lwrenwu"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.screnwu')" align="center" prop="screnwu"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.coin')" align="center" prop="coin"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.livetimejiesuan')" align="center" prop="livetimejiesuan"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.liwu')" align="center" prop="liwu"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.liwujiesuanbili')" align="center" prop="liwujiesuanbili"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.ticket')" align="center" prop="ticket"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.lotteryCost')" align="center" prop="lotteryCost"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.lotteryBili')" align="center" prop="lotteryBili"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.costQianliu')" align="center" prop="costQianliu"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.times')" align="center" prop="times"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNoteJump.table.totalsettle')" align="center" prop="totalsettle"/>
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
        // orderBy: 'd.end_time desc',
      },
      detailsList: [],
      detailsTotal: 0,
      queryDetailsParams: {
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
        pageNum: 1,
        pageSize: 100,
        // orderByColumn: 'create_time',
        // isAsc: 'desc'
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
      this.$confirm(this.$t('liveWeb.liveHostWageNoteJump.confirmExportDialog.message'), this.$t('liveWeb.liveHostWageNoteJump.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveHostWageNoteJump.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveHostWageNoteJump.confirmExportDialog.cancelButton'),
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
