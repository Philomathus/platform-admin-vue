<template>
  <div class="app-container">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="1500px"
      top="5vh"
      @close="reset()"
      append-to-body
    >
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item :label=" $t('members.logGameOrder.analyze.date.range') " prop="selectDate">
          <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd" :start-placeholder=" $t('members.logGameOrder.analyze.date.start') "
                          :end-placeholder=" $t('members.logGameOrder.analyze.date.end') "
                          range-separator="-" clearable
                          :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="searchValue">
          <el-input
            v-model.trim="queryParams.searchValue"
            :placeholder=" $t('members.logGameOrder.analyze.memIdAcc') "
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="platformId">
          <el-select v-model="queryParams.platformId" :placeholder=" $t('members.logGameOrder.analyze.plat') " clearable size="small" >
            <el-option v-for="item in platformList" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="type">
          <el-select v-model="queryParams.type" :placeholder=" $t('members.logGameOrder.analyze.types') " clearable size="small" >
            <el-option v-for="item in typeList" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"> {{ $t('members.logGameOrder.analyze.search') }} </el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('members.logGameOrder.analyze.reset') }}</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleScore"
            v-hasPermi="['member:logGameOrder:backScore']"
          >{{ $t('members.logGameOrder.analyze.batch') }}
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table stripe v-loading="loading" :data="scoreList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column :label="$t('members.logGameOrder.analyze.memId')" align="center" prop="memberId"/>
        <el-table-column :label="$t('members.logGameOrder.analyze.orderId')" align="center" prop="id" min-width="150"/>
        <el-table-column :label="$t('members.logGameOrder.analyze.gamePlat')" align="center" prop="platformName"/>
        <el-table-column :label="$t('members.logGameOrder.analyze.amt')" align="center" prop="money"/>
        <el-table-column :label="$t('members.logGameOrder.analyze.type')" align="center" prop="type" min-width="60" :formatter="formatterType"/>
        <el-table-column :label="$t('members.logGameOrder.analyze.opt')" min-width="150" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="success"
              plain
              size="small"
              @click="handleBackScore(scope.row)"
            >{{scope.row.type == 1 ? this.$t('members.logGameOrder.analyze.bckUp') : this.$t('members.logGameOrder.analyze.nxtPoint')}}
              {{ $t('members.logGameOrder.analyze.amt') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page-sizes="[20,50,100]"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  listScoreOrder,
  handleBackScore
} from '@/api/platform-web/member/logGameOrder'
import { pickerDateShortcuts } from '@/utils/dateUtils'
import { listGame } from '../../../api/platform-web/member/logGameOrder'

export default {
  name: 'LogGameOrder',
  components: {},
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateShortcuts },
      //类型列表
      typeList: [{ label: '上分', value: '1' }, { label: '下分', value: '2' }],
      //状态列表
      statusList: [],
      //平台
      platformList:[],
      //状态集合列表
      stateCollection: [[
                        { label: '入厅失败', value: '-1' },
                        { label: '入厅开始', value: '0' },
                        { label: '注册失败', value: '1' },
                        { label: '上分成功', value: '2' },
                        { label: '上分扣款异常', value: '3' },
                        { label: '上分扣款失败', value: '4' },
                        { label: '上分失败', value: '5' },
                        { label: '上分超时', value: '6' },
                        { label: '查询余额失败', value: '7' },
                        { label: '上分查询明细失败', value: '8' },
                        { label: '上分查询明细超时', value: '9' },
                        { label: '上分交易不存在', value: '10' },
                        { label: '获取游戏失败', value: '11' },
                        { label: '未知异常', value: '12' },
                        { label: '回退上分', value: '13' }

      ],[
        { label: '出厅失败', value: '-1' },
        { label: '下分开始', value: '0' },
        { label: '下分成功', value: '2' },
        { label: '下分失败', value: '5' },
        { label: '下分超时', value: '6' },
        { label: '查询余额失败', value: '7' },
        { label: '下分查询明细失败', value: '8' },
        { label: '下分查询明细超时', value: '9' },
        { label: '下分交易不存在', value: '10' },
        { label: '未知异常', value: '12' }
      ]],
      visible: false,
      //状态列表
      stateList: [],
      // 遮罩层
      loading: true,
      //列表
      ids: [],
      // 选中数组
      scoreList: [],
      //选中列表
      selectionList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 会员上下分表格数据
      logGameOrderList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'b_time',
        isAsc: 'desc',
        searchValue: null,
        type: null,
        status: null,
        platformId: null,
        stateList:[],
        selectDate: [this.parseTime(new Date,'{y}-{m}-{d}'), this.parseTime(new Date,'{y}-{m}-{d}')]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  watch:{
    allStatus:function(val,oldval){

    }
  },
  created() {
    this.getList()
    this.getListGame()
  },
  methods: {
    formatterType(row) {
      if (row.type == 1) {
        return '上分'
      } else if (row.type == 2) {
        return '下分'
      } else {
        return '未知'
      }
    },
    formatterStatus(row) {
      const scoreName = row.type == 1 ? '上分' :'下分';
      if (row.status == -1) {
        return '失败' + (row.type == 1 ? '入厅' : '出厅');
      }else if (row.status == 0) {
        return '开始' + (row.type == 1 ? '入厅' : '出厅');
      }else if (row.status == 1) {
        return '注册失败'
      } else if (row.status == 2) {
        return '成功' + scoreName
      } else if (row.status == 3) {
        return '异常' + '上分扣款异常'
      } else if (row.status == 4) {
        return '异常' + '上分扣款失败'
      } else if (row.status == 5) {
        return '失败' + scoreName
      } else if (row.status == 6) {
        return '超时' + scoreName
      } else if (row.status == 7) {
        return '查询余额失败'
      } else if (row.status == 8) {
        return '查询明细失败' + scoreName
      } else if (row.status == 9) {
        return '查询明细超时' + scoreName
      } else if (row.status == 10) {
        return '交易不存在' + scoreName
      } else if (row.status == 11) {
        return '获取游戏失败'
      } else if (row.status == 12) {
        return '未知异常'
      }else if (row.status == 13){
        return '回退' + scoreName
      } else {
        return '未知'
      }
    },
    show(){
      this.visible = true
    },
    /** 查询会员上下分列表 */
    getList() {
      this.loading = true
      this.queryParams.stateList = this.stateList
      listScoreOrder(this.queryParams).then(response => {
        this.scoreList = response.rows
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
        type: null,
        memberId: null,
        userName: null,
        platformId: null,
        status: 0,
        money: null,
        bTime: null,
        eTime: null
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
    /** 上下分按钮操作 */
    handleScore() {
      if (this.scoreList.length == 0) {
        this.$confirm('请选中会员', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }else {
        handleBackScore(this.selectionList).then(response => {
          this.msgSuccess("资金回退成功");
          this.getList()
        })
      }
    },
    handleSelectionChange(selection){
      this.selectionList = selection
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    handleBackScore(row){
      this.selectionList[0] = row
      handleBackScore(this.selectionList).then(response => {
        this.msgSuccess("资金回退成功");
        this.getList()
      })
    },
    getListGame(){
      listGame(this.queryParams).then(response => {
        this.platformList = response.data
        this.loading = false
      })
    }
  }
}
</script>
