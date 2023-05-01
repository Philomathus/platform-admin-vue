<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label="$t('liveWeb.anchorAward.queryForm.updateTimeLabel')" prop="updateTime">
        <el-date-picker v-model="queryParams.updateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" :placeholder="$t('liveWeb.anchorAward.queryForm.updateTimePlaceholder')" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="id">
        <el-input
          v-model="queryParams.id"
          :placeholder="$t('liveWeb.anchorAward.queryForm.idPlaceholder')"
          clearable
          size="small"
          type="number"
          class="no-number"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          :placeholder="$t('liveWeb.anchorAward.queryForm.nickNamePlaceholder')"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{$t('liveWeb.anchorAward.queryForm.searchButton')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{$t('liveWeb.anchorAward.queryForm.resetButton')}}</el-button>
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
          v-hasPermi="['live:anchorAward:export']"
        >{{$t('liveWeb.anchorAward.actions.exportButton')}}
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column :label="$t('liveWeb.anchorAward.table.anchor')" align="center" prop="anchor"/>
      <el-table-column :label="$t('liveWeb.anchorAward.table.nickName')" align="center" prop="nickName"/>
      <el-table-column :label="$t('liveWeb.anchorAward.table.cost')" align="center" prop="cost"/>
      <el-table-column :label="$t('liveWeb.anchorAward.table.prize')" align="center" prop="prize"/>
      <el-table-column :label="$t('liveWeb.anchorAward.table.prizeSixThousand')" align="center" prop="prizeSixThousand"/>
      <el-table-column :label="$t('liveWeb.anchorAward.table.updateTime')" align="center" prop="updateTime"/>
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
  listAnchorAward,
  exportAnchorAward
} from '@/api/live-web/liveUser'
import {getYesterDate, toyesDayshortcuts} from '@/utils/dateUtils'

export default {
  name: 'LiveUser',
  components: {},
  data() {
    return {
      pickerOptions: {shortcuts: toyesDayshortcuts},
      //所选的用户id
      userId: 0,
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
      // //用户信息表格数据
      liveUserList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        updateTime: this.parseTime(getYesterDate(), '{y}-{m}-{d}'),
        nickName: null,
        id: null
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
    /** 查询//用户信息列表 */
    getList() {
      this.loading = true
      listAnchorAward(this.queryParams).then(response => {
        this.liveUserList = response.rows
        this.total = response.total
      }).finally(() => {
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
        nickName: null
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm( this.$t('liveWeb.anchorAward.confirmExportDialog.message'), this.$t('liveWeb.anchorAward.confirmExportDialog.title'), {
        confirmButtonText: this.$t('liveWeb.anchorAward.confirmExportDialog.confirmButton'),
        cancelButtonText: this.$t('liveWeb.anchorAward.confirmExportDialog.cancelButton'),
        type: 'warning'
      }).then(function () {
        return exportAnchorAward(queryParams)
      }).then(response => {
        this.downloadExcel(response, '主播派奖')
      }).catch(() => {
      })
    }
  }
}
</script>
