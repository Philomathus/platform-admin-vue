<template>
  <div class="app-container">
    <el-button type="primary" @click="copy">送礼金额 {{ this.totalData.countTotal || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px"
             label-width="68px"
    >
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
          style="width: 280px"
        />
      </el-form-item>
      <el-form-item prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          placeholder="会员ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="toUserId">
        <el-input
          v-model="queryParams.toUserId"
          placeholder="主播ID"
          clearable
          size="small"
          type="number"
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
          v-hasPermi="['admin:liveVideoProp:export']"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="testAccountPorp()"
          v-hasPermi="['admin:liveVideoProp:list']"
        >测试号送礼明细
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveProplogList">
      <el-table-column label="会员ID" align="center" prop="pUserId" width="120"/>
      <el-table-column label="礼物名" align="center" prop="propName"/>
      <el-table-column label="礼物金额" align="center" prop="totalDiamonds"/>
      <el-table-column label="主播ID" align="center" prop="toUserId"/>
      <el-table-column label="主播昵称" align="center" prop="nickName"/>
      <el-table-column label="送礼日期" align="center" prop="createTime" min-width="160"/>
    </el-table>

    <el-dialog v-dialogDrag title="测试号送礼明细" :visible.sync="testAccountPorpList" width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="日期选择" prop="testAccountCreateTime">
          <el-date-picker v-model="queryParam.testAccountCreateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '100%'}" placeholder="请选择日期选择" clearable
                          :picker-options="pickerOptionsTestAccount"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="toUserId">
          <el-input
            v-model="queryParam.toUserId"
            placeholder="主播ID"
            clearable
            size="small"
            type="number"
            class="no-number"
            @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="testAccountPorp()">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-button type="primary" @click="copy1">送礼金额 {{ this.totalData.testAccountPorpTotal || 0 }}</el-button>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExportTestAccount"
            v-hasPermi="['admin:liveVideoProp:export']"
          >导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="testAccountPorp"></right-toolbar>
      </el-row>

      <el-table :stripe="true" v-loading="loading" :data="testAccountPorpData">
        <el-table-column type="selection" align="center"/>
        <el-table-column label="会员ID" align="center" prop="puserId"/>
        <el-table-column label="会员昵称" show-overflow-tooltip align="center" prop="puserName"/>
        <el-table-column label="送礼金额" show-overflow-tooltip align="center" prop="totalDiamonds"/>
        <el-table-column label="主播ID" align="center" prop="toUserId"/>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[10,20,100]"
        :page.sync="queryParam.pageNum"
        :limit.sync="queryParam.pageSize"
        @pagination="testAccountPorp"
      />
    </el-dialog>

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
  exportLiveProplog,
  getCount, testAccountPorpList, exportTestAccountProplog, testAccountCount
} from '@/api/platform-web/member/liveVideoProp'
import {getYesterDate, pickerDateShortcuts, toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'LiveProplog',
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: pickerDateShortcuts},
      pickerOptionsTestAccount: {shortcuts: toyesDayshortcuts},
      //统计数据
      totalData: {
        countTotal: 0,
        testAccountPorpTotal: 0
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
      // 用户送礼日志表格数据
      liveProplogList: [],
      testAccountPorpData: [],
      testAccountPorpList: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        pUserId: null,
        toUserId: null,
        selectDate: [this.parseTime(new Date, '{y}-{m}-{d}'), this.parseTime(new Date, '{y}-{m}-{d}')],
        orderByColumn: 'createTime',
        isAsc: 'desc'
      },
      queryParam: {
        pageNum: 1,
        pageSize: 20,
        toUserId: null,
        testAccountCreateTime: this.parseTime(getYesterDate(), '{y}-{m}-{d}')
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
    this.count()
    testAccountCount()
  },
  methods: {
    /** 查询用户送礼日志列表 */
    getList() {
      this.loading = true
      listLiveProplog(this.queryParams).then(response => {
        this.liveProplogList = response.rows
        this.liveProplogList.forEach(function (item) {
          if(item.toUserId<=1){
            item.toUserId = '';
          }
        });
        this.total = response.total
      }).catch(() => {
        this.$notify.error('网络异常')
      }).finally(() => {
        this.loading = false
      })
    },
    testAccountPorp() {
      this.testAccountPorpList = true
      this.title = '测试号送礼明细'
      testAccountPorpList(this.queryParam).then(response => {
        this.testAccountPorpData = response.rows
        this.total = response.total
        this.loading = false
      })
      this.testAccountCount()
    },
    //复制
    copy() {
      this.copyCommand(this.totalData.countTotal)
    },
    //复制
    copy1() {
      this.copyCommand(this.totalData.testAccountPorpTotal)
    },
    count() {
      getCount(this.queryParams).then((res) => {
        console.info(res.data)
        if (res.data) {
          this.totalData = res.data
        }
        this.loading = false
      })
    },

    testAccountCount() {
      testAccountCount(this.queryParam).then((res) => {
        if (res.data) {
          this.totalData = res.data
        }
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
      this.count()
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
      }).then(function () {
        return exportLiveProplog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '用户送礼日志')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExportTestAccount() {
      const queryParams = this.queryParam
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return exportTestAccountProplog(queryParams)
      }).then(response => {
        this.downloadExcel(response, '用户送礼日志')
      }).catch(() => {
      })
    }
  }
}
</script>
