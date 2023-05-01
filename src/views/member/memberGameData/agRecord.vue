<template>
  <div>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="1500px"
      top="5vh"
      @close="resetRecord()"
      append-to-body
    >
      <el-table stripe v-loading="loading" :data="memberGameDataRecordList">
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.ordNum') " align="center" prop="gameId"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.userName') " align="center" prop="playName"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.buNum') " align="center" prop="gameRound"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.payAmt') " align="center" prop="netAmount"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.plBets') " align="center" prop="betTime"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.gType') " align="center" prop="gameType">
          <template slot-scope="scope">
            <span v-if="scope.row.gametype == 'BAC'">{{ $t('members.memberGameData.agRecord.table.gTypes.bacc') }}</span>
            <span v-if="scope.row.gametype == 'DT'">{{ $t('members.memberGameData.agRecord.table.gTypes.dt') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.tBet') " align="center" prop="betAmount"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.vBet') " align="center" prop="validBetAmount"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.oStat') " align="center" prop="flag">
          <template slot-scope="scope">
            <span v-if="scope.row.flag == '0'">{{ $t('members.memberGameData.agRecord.table.anom') }}</span>
            <span v-if="scope.row.flag == '1'">{{ $t('members.memberGameData.agRecord.table.pout') }}</span>
            <span v-if="scope.row.flag == '8'">{{ $t('members.memberGameData.agRecord.table.canc') }}</span>
            <span v-if="scope.row.flag == '9'">{{ $t('members.memberGameData.agRecord.table.canc') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.howTo') " align="center" prop="playType">
          <template slot-scope="scope">
            <span v-if="scope.row.playType === '1'">{{ $t('members.memberGameData.agRecord.table.howtos.banker') }}</span>
            <span v-if="scope.row.playType === '2'">{{ $t('members.memberGameData.agRecord.table.howtos.casual') }}</span>
            <span v-if="scope.row.playType === '3'">{{ $t('members.memberGameData.agRecord.table.howtos.sum') }}</span>
            <span v-if="scope.row.playType === '21'">{{ $t('members.memberGameData.agRecord.table.howtos.dragon') }}</span>
            <span v-if="scope.row.playType === '22'">{{ $t('members.memberGameData.agRecord.table.howtos.tiger') }}</span>
            <span v-if="scope.row.playType === '23'">{{ $t('members.memberGameData.agRecord.table.howtos.sum') }}</span>
          </template>
        </el-table-column>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.tNum') " align="center" prop="tableCode"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.pTime') " align="center" prop="recalcuTime"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.bal') " align="center" prop="beforeCredit"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.betIp') " align="center" prop="betIP"/>
        <el-table-column :label=" $t('members.memberGameData.agRecord.table.det') " align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              icon="el-icon-menu"
              size="small"
              @click="handleDetail(scope.row)"
              v-hasPermi="['member:memberGameData:detailList']"
            >{{ $t('members.memberGameData.agRecord.buttons.more') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <detail ref="detail" :record-id="gameRound"/>

    <!--会员Ag视讯注单数据详情-->
    <el-dialog
      title=" $t('members.memberGameData.agRecord.table.titles') "
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="agVisible"
      width="600px"
      top="5vh"
      @close="reset()"
      append-to-body
    >
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="messageText" placeholder=""  type="textarea" :rows="20"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>

import { gameDetailList, gameRecordList } from '../../../api/platform-web/member/memberGameData'
import detail from './detail'
import { messageCode, messageVal } from '../../../utils/sportCode'

export default {
  props: {

  },
  components: {
    detail

  },
  data() {
    return {
      msg: '',
      // 遮罩层
      loading: true,
      //弹出框标题
      title: this.$t('members.memberGameData.agRecord.data.title') ,
      //页面编码
      index: 1,
      // 遮罩层
      visible: false,
      //游戏id
      gameId: null,
      // 选中数组值
      tables: [],
      //ag视讯详情
      messageText: null,
      agVisible: false,
      // 对局详情列表
      memberGameDataRecordList: [],
      //加分提交的数据
      form: {},
      //日期开始时间
      game_start_time: null,
      //日期结束时间
      game_end_time: null,
      //明细id
      gameRound: null,
      //平台ID
      platformId: null,
      //椅子号
      chairId: null,
      //h会员账号
      account: null,
      //显示明细
      detailOpen: false,
      //对局地址
      detailLink: null,
      // 查询参数
      queryParams: {
        platformId: null,
        agent: null,
        gameId: null,
        gameRound: null,
        gameStartTime: null,
        gameEndTime: null,
        chairId: null,
        account: null,
        serverId: null,
        gameUserNo: null,
        recordId: null
      }
    }
  },
  /*监听器,监听单个变量,param就是data的变量*/
  watch: {
    vip: function(newVal, oldVal) {
      if (newVal < this.oldVip) {
        this.$notify.error( this.$t('members.memberGameData.agRecord.data.vipLvl') )
        this.showVipDisabled = true
      } else {
        this.showVipDisabled = false
      }
    }
  },
  created() {
    this.getDicts('member_msg').then(response => {
      this.msgList = response.data
    })
  },
  methods: {
    // 显示弹框
    show(row) {
      this.platformId = row.platformId
      this.queryParams.gameId = row.gameId;
      this.queryParams.kindId = row.kindId;
      this.queryParams.gameRound = row.gameRound;
      this.queryParams.agent = row.agent;
      this.queryParams.gameStartTime = row.game_start_time
      this.queryParams.gameEndTime = row.game_end_time
      this.queryParams.platformId = row.platformId
      this.queryParams.account = row.account;
      this.account = row.account;
      this.getRecordList();
      this.visible = true
    },
    // 查询表数据
    getRecordList() {
      this.loading = true
      gameRecordList(this.queryParams).then(response => {
        this.memberGameDataRecordList = response.data
        if (response.data[0] != null && response.data[0] != undefined){
          this.chairId = response.data[0].chairID
        }
        this.total = response.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    //查看明细
    handleDetail(row){
      this.queryParams.gameId = row.gameId;
      this.queryParams.gameRound = row.gameRound;
      this.queryParams.kindId = row.gametype
      this.queryParams.gametype = row.gametype
      this.loading = true
      gameDetailList(this.queryParams).then(response => {
        if (response.data != null && response.data != undefined){
          let strings = response.data[0];
          let buffer = "";
          for (let key in strings){
            buffer = buffer + (messageCode(key) + ":" +messageVal(key,strings[key]) + "\n");
          }
          this.messageText = buffer;
        }
        this.agVisible = true
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    /** 重置按钮操作 */
    resetRecord() {
      this.memberGameDataRecordList = []
    },
    reset(){
      this.messageText = null
    }
  }
}
</script>
