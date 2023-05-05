<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('liveWeb.liveHostWageNote.queryForm.dateDayPlaceholder')"
                        style="width: 140px"
                        :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('liveWeb.liveHostWageNote.queryForm.settlementRateLabel')" prop="settlementRate" label-width="185px">
        <el-input
          v-model="queryParams.settlementRate"
          :placeholder="$t('liveWeb.liveHostWageNote.queryForm.settlementRatePlaceholder')"
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
          style="width: 60px;"
        />
      </el-form-item>
      <el-form-item prop="familyId" style="width: 150px">
        <el-input
          v-model="queryParams.familyId"
          :placeholder="$t('liveWeb.liveHostWageNote.queryForm.familyIdPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="familyName" style="width: 150px">
        <el-input
          v-model="queryParams.familyName"
          :placeholder="$t('liveWeb.liveHostWageNote.queryForm.familyNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="familyNickName" style="width: 150px">
        <el-input
          v-model="queryParams.familyNickName"
          :placeholder="$t('liveWeb.liveHostWageNote.queryForm.familyNickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.liveHostWageNote.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.liveHostWageNote.queryForm.resetButton')}}</el-button>
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
        >{{$t('liveWeb.liveHostWageNote.actions.export')}}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-crop"
          size="mini"
          @click="familyShow()"
        >{{$t('liveWeb.liveHostWageNote.actions.familyShow')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList"
    >
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.familyId')" align="center" prop="familyId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.familyId)">{{ row.familyId }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.familyName')" align="center" prop="familyName" min-width="120">
        <template v-slot="{row}">
          <span v-if="row.familyId === 0">{{$t('liveWeb.liveHostWageNote.table.familyId0Name')}}</span>
          <span v-else>{{ row.familyName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.familyUserId')" align="center" prop="familyUserId"  min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.familyNickName')" align="center" prop="familyNickName"  min-width="130"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.livetime')" align="center" prop="livetime"  min-width="180"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.livetimejiesuan')" align="center" prop="livetimejiesuan"  min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.liwu')" align="center" prop="liwu"  min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.liwujiesuan')" align="center" prop="liwujiesuan"  min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.lotteryCost')" align="center" prop="lotteryCost"  min-width="120"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.costQianliu')" align="center" prop="costQianliu"  min-width="150"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.times')" align="center" prop="times"  min-width="130"/>
      <el-table-column :label="$t('liveWeb.liveHostWageNote.table.totalsettle')" align="center" prop="totalsettle"  min-width="120"/>
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
  listFamilyWageNotePage,
  exportFamilyWageNote
} from '@/api/live-web/liveHostWageNote'
import {toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'LiveHostWageNote',
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: toyesDayshortcuts},
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
        dateDay: this.parseTime(new Date(), '{y}-{m}-{d}'),
        familyName: null,
        familyNickName: null,
        familyId: null,
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
    this.getList()
  },
  methods: {
    familyShow(familyId, createTime) {
      this.$router.push({
        path: '/live/live/liveHostWageNoteJump',
        query: {
          familyId: familyId,
          createTime: this.queryParams.dateDay,
          // settlementRate: this.queryParams.settlementRate,
          // selectDate: this.queryParams.selectDate
        }
      })
    },
    /** 查询主播时长列表 */
    getList() {
      this.loading = true
      listFamilyWageNotePage(this.queryParams).then(response => {
        this.liveHostWageNoteList = response.rows
        this.liveHostWageNoteList.forEach(value => {
          if (value.livetimejiesuan !== null) {
            value.totalsettle = (parseFloat(value.livetimejiesuan) + parseFloat(value.liwujiesuan) + parseFloat(value.costQianliu)).toFixed(2)
          } else {
            value.totalsettle = (parseFloat(value.liwujiesuan) + parseFloat(value.costQianliu)).toFixed(2)
          }
        })
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
        familyName: null,
        familyNickName: null,
        familyId: null
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
      this.$confirm(this.$t('liveWeb.liveHostWageNote.confirmExportDialog.message'), this.$t('liveWeb.liveHostWageNote.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.liveHostWageNote.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.liveHostWageNote.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportFamilyWageNote(queryParams)
      }).then(response => {
        this.downloadExcel(response, '家族直播时长')
      }).catch(() => {
      })
    }
  }
}
</script>
