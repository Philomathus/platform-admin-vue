<template>
  <div class="app-container">
    <el-button type="primary" @click="copy">{{ this.$t('members.liveVideoProp.form.giftAmt') }} {{ this.totalData.countTotal || 0 }}</el-button>
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px"
             label-width="68px"
    >
      <el-form-item :label=" $t('global.selectDate') " prop="selectDate" label-width="120">
        <el-date-picker
          type="daterange"
          v-model="queryParams.selectDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :range-separator=" $t('global.selectDateRangeSeparator') "
          clearable
          :picker-options="pickerOptions"
          style="width: 280px"
        />
      </el-form-item>
      <el-form-item prop="pUserId">
        <el-input
          v-model="queryParams.pUserId"
          :placeholder=" $t('members.liveVideoProp.form.memId') "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="toUserId">
        <el-input
          v-model="queryParams.toUserId"
          :placeholder=" $t('members.liveVideoProp.form.hostId') "
          clearable
          size="small"
          type="number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.liveVideoProp.form.search') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.liveVideoProp.form.reset') }}</el-button>
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
        >{{ $t('members.liveVideoProp.form.export') }}
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
        >{{ $t('members.liveVideoProp.form.testGift') }}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveProplogList">
      <el-table-column :label=" $t('members.liveVideoProp.form.hostId') " align="center" prop="perUserId" width="120"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.status') " align="center" min-width="110px" prop="isPrivate" :formatter="callbackStatusFormat"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.giftName') " align="center" prop="propName" min-width="100"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.giftAmt') " align="center" prop="totalDiamonds" min-width="120"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.hostId') " align="center" prop="toUserId"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.hostNn') " align="center" prop="nickName" min-width="120"/>
      <el-table-column :label=" $t('members.liveVideoProp.form.giftDate') " align="center" prop="createTime" min-width="160"/>
    </el-table>

    <el-dialog v-dialogDrag :title=" $t('members.liveVideoProp.form.testAcct') " :visible.sync="testAccountPorpList" width="1200px" append-to-body>
      <el-form :model="queryParam" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item :label=" $t('members.liveVideoProp.form.date.sel') " prop="testAccountCreateTime">
          <el-date-picker v-model="queryParam.testAccountCreateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '100%'}" :placeholder=" $t('members.liveVideoProp.form.date.sel2') " clearable
                          :picker-options="pickerOptionsTestAccount"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="toUserId">
          <el-input
            v-model="queryParam.toUserId"
            :placeholder=" $t('members.liveVideoProp.form.hostId') "
            clearable
            size="small"
            type="number"
            class="no-number"
            @keyup.enter.native="handleQuery"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="testAccountPorp()">{{  $t('members.liveVideoProp.form.search')  }}</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-button type="primary" @click="copy1">{{  $t('members.liveVideoProp.form.giftAmt')  }} {{ this.totalData.testAccountPorpTotal || 0 }}</el-button>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="small"
            @click="handleExportTestAccount"
            v-hasPermi="['admin:liveVideoProp:export']"
          >{{  $t('members.liveVideoProp.form.export')  }}
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="testAccountPorp"></right-toolbar>
      </el-row>

      <el-table :stripe="true" v-loading="loading" :data="testAccountPorpData">
        <el-table-column type="selection" align="center"/>
        <el-table-column :label=" $t('members.liveVideoProp.form.memId') " align="center" prop="puserId"/>
        <el-table-column :label=" $t('members.liveVideoProp.form.memNn') " show-overflow-tooltip align="center" prop="puserName"/>
        <el-table-column :label=" $t('members.liveVideoProp.form.giftAmt') " show-overflow-tooltip align="center" prop="totalDiamonds"/>
        <el-table-column :label=" $t('members.liveVideoProp.form.hostId') " align="center" prop="toUserId"/>
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
      typeList: [],
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
    this.testAccountCount()
    this.getDicts('member_type').then(response => {
      this.typeList = response.data
    })
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
        this.$notify.error(this.$t('members.liveVideoProp.form.netErr'))
      }).finally(() => {
        this.loading = false
      })
    },
    testAccountPorp() {
      this.testAccountPorpList = true
      this.title = this.$t('members.liveVideoProp.form.testGift')
      testAccountPorpList(this.queryParam).then(response => {
        this.testAccountPorpData = response.rows
        this.total = response.total
        this.loading = false
      })
      this.testAccountCount()
    },
    // 回调状态字典翻译
    callbackStatusFormat(row, column) {
      return this.selectDictLabel(this.typeList, row.isPrivate)
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
        if (res.data) {
          this.totalData = res.data
        } else {
          this.totalData.countTotal = 0
        }
        this.loading = false
      })
    },
    testAccountCount() {
      testAccountCount(this.queryParam).then((res) => {
        if (res.data) {
          this.totalData = res.data
        } else {
          this.totalData.testAccountPorpTotal = 0
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
      if(this.queryParams.pUserId){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.pUserId.match(reg)
        if(!flag){
          this.msgError(this.$t('members.liveVideoProp.form.memIdErr'))
          return
        }
      }
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
      this.$confirm(this.$t('members.liveVideoProp.form.excelErr'), this.$t('members.liveVideoProp.form.warning'), {
        confirmButtonText: this.$t('members.liveVideoProp.form.confirm'),
        cancelButtonText: this.$t('members.liveVideoProp.form.cancel'),
        type: 'warning'
      }).then(function () {
        return exportLiveProplog(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('members.liveVideoProp.form.giftLog'))
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExportTestAccount() {
      const queryParams = this.queryParam
      this.$confirm(this.$t('members.liveVideoProp.form.excelErr'), this.$t('members.liveVideoProp.form.warning'), {
        confirmButtonText: this.$t('members.liveVideoProp.form.confirm'),
        cancelButtonText: this.$t('members.liveVideoProp.form.cancel'),
        type: 'warning'
      }).then(function () {
        return exportTestAccountProplog(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('members.liveVideoProp.form.giftLog'))
      }).catch(() => {
      })
    }
  }
}
</script>
