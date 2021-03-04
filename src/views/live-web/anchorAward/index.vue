<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="主播昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入主播昵称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" :style="{width: '60%'}" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="至" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>


    <el-table stripe v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column label="主播ID" align="center" prop="id"/>
      <el-table-column label="主播昵称" align="center" prop="nickName"/>
      <el-table-column label="投注" align="center" prop="cost"/>
      <el-table-column label="派奖" align="center" prop="prize"/>
      <el-table-column label="派奖千六" align="center" prop="prizeSixThousand"/>
      <el-table-column label="修改时间" align="center" prop="updateTime"/>
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
  listAnchorAward
} from '@/api/live-web/liveUser'
import {pickerDateShortcuts} from "@/utils/dateUtils";

export default {
  name: 'LiveUser',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
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
        selectDate: [this.parseTime(new Date), this.parseTime(new Date)],
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
  watch: {
    selectDate: function(newVal, oldVal) {
      if (newVal === null) {
        this.queryParams.sendStartTime = undefined
        this.queryParams.sendEndTime = undefined
      } else {
        this.queryParams.sendStartTime = this.selectDate[0] + ' 00:00:00'
        this.queryParams.sendEndTime = this.selectDate[1] + ' 23:59:59'
      }
    }
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
    }

  }
}
</script>
