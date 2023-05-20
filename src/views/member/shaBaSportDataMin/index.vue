<template>
  <div class="app-container">

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item :label=" $t('global.selectDataPlaceholder') " prop="selectDate">
        <el-date-picker type="datetimerange" v-model="queryParams.selectDate" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" :start-placeholder=" $t('global.dateTimePickerStartTimePlaceholder') "
                        :end-placeholder=" $t('global.dateTimePickerEndTimePlaceholder') "
                        :range-separator=" $t('global.dateTimePickerRangeSeparator') " clearable :default-time="['12:00:00', '11:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="account">
        <el-input
          v-model="queryParams.account"
          :placeholder=" $t('members.shaBaSportDataMin.pem') "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="gameId">
        <el-input
          v-model="queryParams.gameId"
          :placeholder=" $t('members.shaBaSportDataMin.pegb') "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item prop="platformId">
        <el-select v-model="queryParams.betState" :placeholder=" $t('members.shaBaSportDataMin.psbs') ">
          <el-option
            v-for="(item,index) in orderStateList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ $t('global.searchButton') }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ $t('global.resetButton') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table stripe v-loading="loading" :data="memberGameDataMinList">
      <el-table-column :label=" $t('members.shaBaSportDataMin.mid') " align="center" prop="vendor_member_id"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.pid') " align="center" prop="agent"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.ton') " align="center"  min-width="180px" prop="trans_id">
      </el-table-column>
      <el-table-column :label=" $t('members.shaBaSportDataMin.ton') " align="center"  min-width="180px" :show-overflow-tooltip="true" prop="gameRound">
        <template v-slot="{row}">
          <a style="color: #00afff"  @click="handleDetail(row)">{{ row.trans_id }}</a>
        </template>
      </el-table-column>
      <el-table-column :label=" $t('members.shaBaSportDataMin.bs') " align="center" prop="ticket_status"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.pn') " align="center" prop="platformName"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.sub') " align="center" prop="sport_type"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.vb') " align="center" prop="stake"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.tb') " align="center" prop="stake"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.prof') " align="center" prop="winlost_amount"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.pyb') " align="center" width="150px" prop="transaction_time"/>
      <el-table-column :label=" $t('members.shaBaSportDataMin.pbt') " v-if="false" align="center" width="150px" prop="bet_type"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page-sizes="[15,50,100]"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="detailOpen"
      width="800px"
      top="5vh"
      @close="reset()"
      append-to-body
    >
      <el-form ref="form" :model="messageText" style="white-space: pre">
        <el-form-item>
          <el-input v-model="messageText" placeholder=""  type="textarea" :rows="20"/>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>
</template>

<script>
import {
  listMemberGameDataMin,
  gameOrderBetStateList,
  listMemberGameDataMinDetail
} from '@/api/platform-web/member/shaBaSportDataMin'
import { pickerDateTimeMeiDong } from "@/utils/dateUtils";
import { messageCode, messageVal } from '../../../utils/sportCode'

export default {
  name: 'ShaBaSportDataMin',
  components: {  },
  data() {
    return {
      pickerOptions: { shortcuts: pickerDateTimeMeiDong },
      // 遮罩层
      visible: false,
      // 遮罩层
      loading: false,
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
      //显示明细
      detailOpen: false,
      //对局地址
      detailLink: null,
      betData: [],
      // 会员注单数据表格数据
      memberGameDataMinList: [],
      // 注单详情列表
      messageText: null,
      // 平台列表
      orderStateList: [],
      // 弹出层标题
      title: '',
      //游戏参数
      gameId: null,
      gameRound: null,
      // 是否显示弹出层
      open: false,
      // 游戏局号
      trans_id: null,
      //账号
      vendor_member_id: null,
      //对局地址
      recordLink: null,
      //游戏类型
      betType: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 15,
        gameId: null,
        gameRound: null,
        platformId: 12,
        account: null,
        gameEndTime: null,
        betType: 0,
        betState: null,
        gameStartTime: null,
        selectDate: [this.parseTime(this.getMeiDongTodayStartTime()), this.parseTime(this.getMeiDongTodayEndTime())],
        orderByColumn: 'game_end_time',
        isAsc: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        gameId: [
          { required: true, message: this.$t('members.shaBaSportDataMin.non') , trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  activated(){
    this.init()
  },
  methods: {
    init(){
      let createTime = this.$route.query.createTime
      if (createTime) {
        this.queryParams.selectDate = [createTime,this.parseTime(this.getMeiDongTodayEndTime())]
      }

      this.getOrderStateList()
    },
    /** 查询会员注单数据列表 */
    getList() {
      this.loading = true
      listMemberGameDataMin(this.queryParams).then(response => {
        this.memberGameDataMinList = response.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /** 查询平台列表 */
    getOrderStateList() {
      gameOrderBetStateList(this.queryParams).then(response => {
          this.orderStateList = response.data
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
        gameId: null,
        account: null,
        kindId: null,
        cellScore: null,
        allBet: null,
        profit: null,
        revenue: null,
        gameEndTime: null,
        platformId: null,
        agent: null,
        platformType: null,
        status: 0,
        gameStartTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.queryParams.account){
        const reg = '^[0-9a-zA-Z_]{1,}$'
        let flag = this.queryParams.account.match(reg)
        if(!flag){
          this.msgError( this.$t('members.shaBaSportDataMin.menu') )
          return
        }
      }
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 获取游戏局号 */
    handleDetail(row){
      this.queryParams.gameId = row.trans_id
      this.queryParams.gameRound = row.trans_id
      this.queryParams.account = row.vendor_member_id
      this.queryParams.betType = row.bet_type
      this.loading = true
      listMemberGameDataMinDetail(this.queryParams).then(response => {
        let strings = response.data;
        let buffer = "";
        for (let key in strings){
            if (strings[key] != undefined && strings[key] != "" && strings[key] != null){
              buffer = buffer + (messageCode(key) + ":" +messageVal(key,strings[key]) + "\n");
            }
        }
        this.messageText = buffer;
        this.detailOpen = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.sonPlatformName = null;
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
