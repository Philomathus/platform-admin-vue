<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item :label=" $t('global.selectDate') " prop="selectDate" label-width="120">
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
        <el-select v-model="queryParams.platformId" :placeholder=" $t('members.logGameOrder.analyze.plat') " clearable size="small" style="width: 110px;">
          <el-option v-for="item in platformList" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="queryParams.type" :placeholder=" $t('members.logGameOrder.analyze.types') " @change="handleType()"  clearable size="small" style="width: 110px;">
          <el-option v-for="item in typeList" :label="item.label" :value="item.value"/>
        </el-select>
        <span>-</span>
      </el-form-item>
      <el-form-item prop="status">
        <el-select clearable multiple collapse-tags  v-model="stateList" :placeholder=" $t('members.logGameOrder.index.allStat') " clearable size="small" style="width: 150px;">
          <el-option v-for="item in statusList" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('members.logGameOrder.analyze.search') }}</el-button>
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
          @click="handleScore(1)"
          v-hasPermi="['member:logGameOrder:analyze']"
        >{{ $t('members.logGameOrder.index.analysis') }}
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
        >{{ $t('members.logGameOrder.index.expo') }}
        </el-button>
      </el-col>

<!-- Missing points for adding members - click on button to get member game money -->
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="memberGameMoney()"
          >{{ $t('members.logGameOrder.index.addMem') }}
        </el-button>
      </el-col>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table stripe v-loading="loading" :data="logGameOrderList">
      <el-table-column :label=" $t('members.logGameOrder.analyze.memId') " align="center" prop="memberId" min-width="120"/>
      <el-table-column :label=" $t('members.logGameOrder.analyze.orderId') " align="center" prop="id" min-width="320" />
      <el-table-column :label=" $t('members.logGameOrder.analyze.gamePlat') " align="center" prop="platformName" min-width="120"/>
      <el-table-column :label=" $t('members.logGameOrder.analyze.amt') " align="center" prop="money"/>
      <el-table-column :label=" $t('members.logGameOrder.index.stTime') " align="center" prop="bTime" min-width="160"/>
      <el-table-column :label=" $t('members.logGameOrder.index.endTime') " align="center" prop="eTime" min-width="160"/>
      <el-table-column :label=" $t('members.logGameOrder.analyze.type') " align="center" prop="type" min-width="60" :formatter="formatterType"/>
      <el-table-column :label=" $t('members.logGameOrder.index.status') "  align="center" prop="status" min-width="120" :formatter="formatterStatus">
        <template v-slot="{row}">
          <el-select v-model="row.stateName" label-in-value :value="formatterStatus(row)" @change="initChange($event,row)" @focus="formatterStatus(row)" placeholder="请选择" filterable allow-create>
            <el-option v-for="item in stateCollection[row.type -1] " :key="item.label" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.logGameOrder.index.numRet') " align="center" prop="retryCount" min-width="180"/>
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
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="title" :visible.sync="memberGameMoneyShow" width="450px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label=" $t('members.logGameOrder.analyze.memId') " prop="memberId">
          <el-input v-model="form.memberId" :placeholder=" $t('members.logGameOrder.index.plsMemId') " />
        </el-form-item>

        <el-form-item prop="platformId" :label=" $t('members.logGameOrder.analyze.gamePlat') "  label-width="80px">
          <el-select v-model="form.platformId" :placeholder=" $t('members.logGameOrder.index.plsPlat') " clearable size="small" style="width: 328px">
            <el-option v-for="item in platformList" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ $t('members.logGameOrder.index.determ') }}</el-button>
        <el-button @click="cancelMemberGameMoney">{{ $t('members.logGameOrder.index.cancel') }}</el-button>
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
                        { label: this.$t('members.logGameOrder.analyze.fHall') , value: '-1' },
                        { label: this.$t('members.logGameOrder.analyze.eHall') , value: '0' },
                        { label: this.$t('members.logGameOrder.analyze.regFail') , value: '1' },
                        { label: this.$t('members.logGameOrder.analyze.scoreSuc') , value: '2' },
                        { label: this.$t('members.logGameOrder.analyze.credEx') , value: '3' },
                        { label: this.$t('members.logGameOrder.analyze.scoreDec') , value: '4' },
                        { label: this.$t('members.logGameOrder.analyze.failScr') , value: '5' },
                        { label: this.$t('members.logGameOrder.analyze.tmoutScr') , value: '6' },
                        { label: this.$t('members.logGameOrder.analyze.blncInq'), value: '7' },
                        { label: this.$t('members.logGameOrder.analyze.failUpscr') , value: '8' },
                        { label: this.$t('members.logGameOrder.analyze.tmoutUpscr') , value: '9' },
                        { label: this.$t('members.logGameOrder.analyze.upScrnotex') , value: '10' },
                        { label: this.$t('members.logGameOrder.analyze.getGfail') , value: '11' },
                        { label: this.$t('members.logGameOrder.analyze.unkAnom') , value: '12' },
                        { label: this.$t('members.logGameOrder.index.retFunds') ,value: '13'}

      ],[
        { label: this.$t('members.logGameOrder.analyze.fexHall') , value: '-1' },
        { label: this.$t('members.logGameOrder.analyze.sNextscr') , value: '0' },
        { label: this.$t('members.logGameOrder.analyze.dScoresucc') , value: '2' },
        { label: this.$t('members.logGameOrder.analyze.fScore') , value: '5' },
        { label: this.$t('members.logGameOrder.analyze.dTime') , value: '6' },
        { label: this.$t('members.logGameOrder.analyze.bInqf') , value: '7' },
        { label: this.$t('members.logGameOrder.analyze.fQuery') , value: '8' },
        { label: this.$t('members.logGameOrder.analyze.tmoutQuery') , value: '9' },
        { label: this.$t('members.logGameOrder.analyze.lScore') , value: '10' },
        { label: this.$t('members.logGameOrder.analyze.unkAnom') , value: '12' }
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
        return this.$t('members.logGameOrder.analyze.tScore')
      } else if (row.type == 2) {
        return this.$t('members.logGameOrder.analyze.lDiv')
      } else {
        return this.$t('members.logGameOrder.analyze.unk')
      }
    },
    formatterStatus(row) {
      const scoreName = row.type == 1 ? this.$t('members.logGameOrder.analyze.tScore') : this.$t('members.logGameOrder.analyze.lDiv');
      if (row.status == -1) {
        return this.$t('members.logGameOrder.analyze.failure') + (row.type == 1 ? this.$t('members.logGameOrder.analyze.enHall') : this.$t('members.logGameOrder.analyze.exHall'));
      }else if (row.status == 0) {
        return this.$t('members.logGameOrder.analyze.start') + (row.type == 1 ? this.$t('members.logGameOrder.analyze.enHall') : this.$t('members.logGameOrder.analyze.exHall') );
      }else if (row.status == 1) {
        return this.$t('members.logGameOrder.analyze.regFail')
      } else if (row.status == 2) {
        return this.$t('members.logGameOrder.analyze.success') + scoreName
      } else if (row.status == 3) {
        return this.$t('members.logGameOrder.analyze.anom') + this.$t('members.logGameOrder.analyze.credEx')
      } else if (row.status == 4) {
        return this.$t('members.logGameOrder.analyze.anom') + this.$t('members.logGameOrder.analyze.scoreDec')
      } else if (row.status == 5) {
        return scoreName + this.$t('members.logGameOrder.analyze.failure')
      } else if (row.status == 6) {
        return scoreName + this.$t('members.logGameOrder.analyze.tmOut')
      } else if (row.status == 7) {
        return this.$t('members.logGameOrder.analyze.bInqf')
      } else if (row.status == 8) {
        return scoreName + this.$t('members.logGameOrder.analyze.fChk')
      } else if (row.status == 9) {
        return scoreName + this.$t('members.logGameOrder.analyze.tmOutQueryDetails')
      } else if (row.status == 10) {
        return scoreName+ this.$t('members.logGameOrder.analyze.trnsctNot')
      } else if (row.status == 11) {
        return this.$t('members.logGameOrder.analyze.getGame')
      } else if (row.status == 12) {
        return this.$t('members.logGameOrder.analyze.unkAnom')
      } else if (row.status == 13) {
        return this.$t('members.logGameOrder.index.retFunds')
      } else {
        return this.$t('members.logGameOrder.analyze.unk')
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
          this.msgError( this.$t('members.logGameOrder.index.conf') )
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
      this.$confirm(this.$t('members.logGameOrder.index.confEx'), this.$t('members.logGameOrder.index.warn'), {
        confirmButtonText: this.$t('members.logGameOrder.index.confirm'),
        cancelButtonText: this.$t('members.logGameOrder.index.cancellation'),
        type: 'warning'
      }).then(function() {
        return exportLogGameOrder(queryParams)
      }).then(response => {
        this.downloadExcel(response, this.$t('members.logGameOrder.index.mUpdown'))
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
          this.$confirm(this.$t('members.logGameOrder.index.confStat') + this.formatterStatus(row) + '"吗?', this.$t('members.logGameOrder.index.warn'), {
            confirmButtonText: this.$t('members.logGameOrder.index.determ'),
            cancelButtonText: this.$t('members.logGameOrder.index.cancellation'),
            type: 'warning'
          }).then(function () {
            row.status = selectOption
            return updateLogGameOrder(row)
          }).then(() => {
            this.getList()
            this.msgSuccess(this.$t('members.logGameOrder.index.modSuc'))
            this.loading = false
          })
      }
    },

    memberGameMoney(){
      this.memberGameMoneyShow = true;
      this.title = this.$t('members.logGameOrder.index.addScore')
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
              this.msgSuccess(this.$t('members.logGameOrder.index.addSucc'));
              this.memberGameMoneyShow = false;
            });
          }
        }
      });
    }

  }
}
</script>
