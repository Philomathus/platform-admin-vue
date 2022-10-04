<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="日期范围" prop="selectDate">
        <el-date-picker type="daterange" v-model="queryParams.selectDate" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        range-separator="-" clearable
                        :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="searchValue">
        <el-input
          v-model.trim="queryParams.searchValue"
          placeholder="会员ID/会员账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="platformId">
        <el-select v-model="queryParams.platformId" placeholder="请选择平台" clearable size="small" style="width: 110px;">
          <el-option v-for="item in platformList" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" placeholder="全部类型" @change="handleType()"  clearable size="small" style="width: 110px;">
          <el-option v-for="item in typeList" :label="item.label" :value="item.value"/>
        </el-select>
        <span>-</span>
      </el-form-item>
      <el-form-item prop="status">
        <el-select clearable multiple collapse-tags  v-model="stateList" placeholder="全部状态" clearable size="small" style="width: 150px;">
          <el-option v-for="item in statusList" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleScore(1)"
          v-hasPermi="['member:logGameOrder:analyze']"
        >分析上下分
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['member:logGameOrder:export']"
        >导出
        </el-button>
      </el-col>

<!-- Missing points for adding members - click on button to get member game money -->
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="memberGameMoney()"
          >添加会员上分缺少
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="logGameOrderList">
      <el-table-column label="会员ID" align="center" prop="memberId" min-width="120"/>
      <el-table-column label="订单ID" align="center" prop="id" min-width="320" />
      <el-table-column label="游戏平台" align="center" prop="platformName" min-width="120"/>
      <el-table-column label="金额" align="center" prop="money"/>
      <el-table-column label="开始时间" align="center" prop="bTime" min-width="160"/>
      <el-table-column label="结束时间" align="center" prop="eTime" min-width="160"/>
      <el-table-column label="类型" align="center" prop="type" min-width="60" :formatter="formatterType"/>
      <el-table-column label="状态" align="center" prop="status" min-width="120" :formatter="formatterStatus">
        <template v-slot="{row}">
          <el-select v-model="row.stateName" label-in-value :value="formatterStatus(row)" @change="initChange($event,row)" @focus="formatterStatus(row)" placeholder="请选择" filterable allow-create>
            <el-option v-for="item in stateCollection[row.type -1] " :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="重试次数" align="center" prop="retryCount" min-width="80"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[20,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

<!-- pop up add member game money form dialog box 添加会员游戏金钱表格对话框 -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="memberGameMoneyShow" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员ID" />
        </el-form-item>

        <el-form-item prop="platformId" label="游戏平台"  label-width="100px">
          <el-select v-model="form.platformId" placeholder="请选择平台" clearable size="small">
            <el-option v-for="item in platformList" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancelMemberGameMoney">取 消</el-button>
      </div>
    </el-dialog>

    <analyze ref="analyze"></analyze>
  </div>
</template>

<script>
import {
  listLogGameOrder,
  exportLogGameOrder,
  updateLogGameOrder,
  listGame, addLogGameOrder, addMemberGameMoney
} from '@/api/platform-web/member/logGameOrder'
import { pickerDateShortcuts } from '@/utils/dateUtils'
import analyze from './analyze'
import {updateWheelPool} from "@/api/platform-web/lottery/wheelPool";

export default {
  name: 'LogGameOrder',
  components: {analyze},
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
                        { label: '资金回退',value: '13'}

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
      //状态列表
      stateList: [],
      // 遮罩层
      loading: true,
      //列表
      ids: [],
      // 选中数组
      scoreList: [],
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
      //状态名称
      stateName: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        orderByColumn: 'b_time',
        isAsc: 'desc',
        searchValue: null,
        type: null,
        stateId: null,
        platformId: null,
        stateList:[],
        selectDate: [this.parseTime(new Date,'{y}-{m}-{d}'), this.parseTime(new Date,'{y}-{m}-{d}')]
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      //颜色
      colClass: null,

      memberGameMoneyShow : false,

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
        return scoreName + '失败'
      } else if (row.status == 6) {
        return scoreName + '超时'
      } else if (row.status == 7) {
        return '查询余额失败'
      } else if (row.status == 8) {
        return scoreName + '查询明细失败'
      } else if (row.status == 9) {
        return scoreName + '查询明细超时'
      } else if (row.status == 10) {
        return scoreName+ '交易不存在'
      } else if (row.status == 11) {
        return '获取游戏失败'
      } else if (row.status == 12) {
        return '未知异常'
      } else if (row.status == 13) {
        return '资金回退'
      } else {
        return '未知'
      }
    },
    /** 查询会员上下分列表 */
    getList() {
      this.loading = true
      this.queryParams.stateList = this.stateList
      listLogGameOrder(this.queryParams).then(response => {
        let templateList = response.rows
        for (const row of templateList){
          row.stateName = this.formatterStatus(row)
        }
        this.logGameOrderList = templateList
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
      if(this.queryParams.searchValue){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.searchValue.match(reg)
        if(!flag){
          this.msgError("会员ID/会员账号只能输入数字及下划线")
          return
        }
      }
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
      this.$confirm('确认处理Excel并下载，数据量大的时候会延迟，请耐心等待...', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return exportLogGameOrder(queryParams)
      }).then(response => {
        this.downloadExcel(response, '会员上下分')
      }).catch(() => {
      })
    },
    /** 上下分按钮操作 */
    handleScore() {
      this.$refs.analyze.show()
    },
    handleType(){
      let count = this.queryParams.type -1
      let list = this.stateCollection[ count ]
      this.statusList = list
    },
    getListGame(){
      listGame(this.queryParams).then(response => {
        this.platformList = response.data
        this.loading = false
      })
    },
    initChange(selectOption,row){
      if(selectOption) {
          //修改状态
          this.$confirm('确认要修改状态为"' + this.formatterStatus(row) + '"吗?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            row.status = selectOption
            return updateLogGameOrder(row)
          }).then(() => {
            this.getList()
            this.msgSuccess('修改成功')
            this.loading = false
          })
      }
    },

    memberGameMoney(){
      this.memberGameMoneyShow = true;
      this.title = "添加会员上分缺少"
    },


    // 取消按钮
    cancelMemberGameMoney() {
      this.memberGameMoneyShow = false;
      this.reset();
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.memberId != null) {
            addMemberGameMoney(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.memberGameMoneyShow = false;
              // this.getList();
            });
          }
        }
      });
    }

  }
}
</script>
