<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="dateDay">
        <el-date-picker clearable size="small"
                        v-model="queryParams.dateDay"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :style="{width: '100%'}"
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
      <el-form-item prop="familyName" style="width: 150px">
        <el-input
          v-model="queryParams.familyName"
          placeholder="家族名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="familyNickName" style="width: 150px">
        <el-input
          v-model="queryParams.familyNickName"
          placeholder="族长昵称"
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
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-crop"
          size="mini"
          @click="familyShow()"
        >所有主播
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table id="out-table" stripe v-loading="loading" :data="liveHostWageNoteList"
    >
      <el-table-column label="家族ID" align="center" prop="familyId">
        <template v-slot="{row}">
          <a style="color: #00afff" @click="familyShow(row.familyId)">{{ row.familyId }}</a>
        </template>
      </el-table-column>
      <el-table-column label="家族名称" align="center" prop="familyName">
        <template v-slot="{row}">
          <span v-if="row.familyId === 0">散户</span>
          <span v-else>{{ row.familyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="族长ID" align="center" prop="familyUserId" />
      <el-table-column label="族长昵称" align="center" prop="familyNickName" />
      <el-table-column label="直播总时长(小时)" align="center" prop="alltimeDes" />
      <el-table-column label="直播礼物总结算" align="center" prop="allticket" />
      <el-table-column label="直播礼物折扣结算" align="center" prop="allticketRes" />
<!--      <el-table-column label="结算率" align="center" prop="settlementRate" />-->
      <el-table-column label="派奖千六" align="center" prop="costQianliu" />
      <el-table-column label="彩票投注" align="center" prop="lotteryCost" />
      <el-table-column label="上播次数" align="center" prop="times" />
<!--      <el-table-column label="统计日期" align="center" prop="timedata" />-->
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
import { toyesDayshortcuts } from '@/utils/dateUtils'

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
    familyShow(familyId) {
      this.$router.push({
        path: '/live/live/liveHostWageNoteJump',
        query: {
          familyId: familyId,
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
      this.$confirm('是否确认导出所有主播时长数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportFamilyWageNote(queryParams)
      }).then(response => {
        this.downloadExcel(response, '家族直播时长')
      }).catch(() => {
      })
    }
  }
}
</script>
