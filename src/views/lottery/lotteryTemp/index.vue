<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <!--      <el-form-item label="开启封盘" prop="su">-->
      <!--        <el-select v-model="queryParams.su" placeholder="请选择开启封盘状态" clearable size="small">-->
      <!--          <el-option-->
      <!--            v-for="item in su"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item :label="$t('lottery.lotteryTemp.form.ktimeLabel')" prop="ktime">
        <el-date-picker clearable size="small"
                        v-model="queryParams.ktime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :placeholder="$t('lottery.lotteryTemp.form.ktimePlaceholder')"
                        :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryTemp.form.issueLabel')" prop="issue">
        <el-input
          v-model="queryParams.issue"
          :placeholder="$t('lottery.lotteryTemp.form.issuePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryTemp.form.issueJustLabel')" prop="issueJust">
        <el-input
          v-model="queryParams.issueJust"
          :placeholder="$t('lottery.lotteryTemp.form.issueJustPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('lottery.lotteryTemp.form.codeJustLabel')" prop="codeJust">
        <el-input
          v-model="queryParams.codeJust"
          :placeholder="$t('lottery.lotteryTemp.form.codeJustPlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('global.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('global.resetButton')}}</el-button>
      </el-form-item>
    </el-form>


    <el-table stripe v-loading="loading" :data="lotteryTempList">
      <el-table-column :label="$t('lottery.lotteryTemp.tableColumns.id')" align="center" prop="id"/>
      <el-table-column :label="$t('lottery.lotteryTemp.tableColumns.issue')" align="center" prop="issue"/>
      <el-table-column :label="$t('lottery.lotteryTemp.tableColumns.issueJust')" align="center" prop="issueJust"/>
      <el-table-column :label="$t('lottery.lotteryTemp.tableColumns.codeJust')" align="center" prop="codeJust"/>
      <!--      <el-table-column label="开启或封盘" align="center" prop="su" :formatter="formattersu"/>-->
      <el-table-column :label="$t('lottery.lotteryTemp.tableColumns.ktime')" align="center" prop="ktime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ktime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { listLotteryTemp } from '@/api/platform-web/lottery/lotteryTemp'
import {toyesDayshortcuts} from "@/utils/dateUtils"


export default {
  name: 'LotteryTemp',
  components: {},
  data() {
    return {
      //日期快捷
      pickerOptions: {shortcuts: toyesDayshortcuts},
      //开启封盘选择栏
      su: [{
        value: '0',
        label: this.$t('lottery.lotteryTemp.sealOptions.open')
      }, {
        value: '1',
        label: this.$t('lottery.lotteryTemp.sealOptions.close')
      }],
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
      // 彩票即时信息表格数据
      lotteryTempList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        issue: null,
        ktime: null,
        issueJust: null,
        codeJust: null,
        su: null,
        orderByColumn: 'ktime',
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
    /** 查询彩票即时信息列表 */
    getList() {
      this.loading = true
      listLotteryTemp(this.queryParams).then(response => {
        this.lotteryTempList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    //开启封盘
    formattersu(row) {
      if (row.su == 0) {
        return this.$t('lottery.lotteryTemp.sealOptions.open')
      } else if (row.su == 1) {
        return this.$t('lottery.lotteryTemp.sealOptions.close')
      } else {
        return ''
      }
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
        issue: null,
        ktime: null,
        issueJust: null,
        codeJust: null,
        su: null
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
    }
  }
}
</script>
