<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="updateTime">
        <el-date-picker v-model="queryParams.updateTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="主播ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="nickName">
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


    <el-table stripe v-loading="loading" :data="liveUserList" @selection-change="handleSelectionChange">
      <el-table-column label="主播ID" align="center" prop="anchor"/>
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
import { getYesterDate, toyesDayshortcuts } from '@/utils/dateUtils'

export default {
  name: 'LiveUser',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: toyesDayshortcuts },
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
    }

  }
}
</script>
