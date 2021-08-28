<template>
  <div>
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
      <el-table stripe v-loading="loading" :data="memberGameDataRecordList">
        <el-table-column label="订单号" align="center" prop="gameId"/>
        <el-table-column label="用户名" align="center" prop="playName"/>
        <el-table-column label="局号" align="center" prop="gameRound"/>
        <el-table-column label="派彩额度" align="center" prop="netAmount"/>
        <el-table-column label="下注时间" align="center" prop="betTime"/>
        <el-table-column label="游戏类型" align="center" prop="gameType">
          <template slot-scope="scope">
            <span v-if="scope.row.gameType == 'BAC'">百家乐</span>
            <span v-if="scope.row.gameType == 'DT'">龙虎</span>
          </template>
        </el-table-column>
        <el-table-column label="总投注" align="center" prop="betAmount"/>
        <el-table-column label="有效投注" align="center" prop="validBetAmount"/>
        <el-table-column label="订单状态" align="center" prop="flag">
          <template slot-scope="scope">
            <span v-if="scope.row.flag == '0'">异常</span>
            <span v-if="scope.row.platformId == '1'">已派彩</span>
            <span v-if="scope.row.platformId == '8'">已取消</span>
            <span v-if="scope.row.platformId == '9'">已取消</span>
          </template>
        </el-table-column>
        <el-table-column label="玩法" align="center" prop="playType">
          <template slot-scope="scope">
            <span v-if="scope.row.playType == '1'">庄</span>
            <span v-if="scope.row.playType == '2'">闲</span>
            <span v-if="scope.row.playType == '3'">和</span>
            <span v-if="scope.row.playType == '21'">龙</span>
            <span v-if="scope.row.playType == '22'">虎</span>
            <span v-if="scope.row.playType == '23'">和</span>
          </template>
        </el-table-column>
        <el-table-column label="桌台号" align="center" prop="tableCode"/>
        <el-table-column label="派彩时间" align="center" prop="recalcuTime"/>
        <el-table-column label="余额" align="center" prop="beforeCredit"/>
        <el-table-column label="投注IP" align="center" prop="betIP"/>
        <el-table-column label="桌位号" align="center" prop="Seat"/>
        <el-table-column label="详情" align="center" class-name="small-padding fixed-width" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              icon="el-icon-menu"
              size="small"
              @click="handleDetail(scope.row)"
              v-hasPermi="['member:memberGameData:detailList']"
            >更多
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <detail ref="detail" :record-id="gameRound"/>

    <!-- 游戏对局日志 -->
    <el-dialog title="游戏对局日志" :visible.sync="detailOpen" width="1500px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
      <div v-loading="loading" :style="'height:'+ height">
        <iframe :src="detailLink" frameborder="no" style="width: 100%;height: 650px" scrolling="auto" />
      </div>
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
      title: '游戏对局列表',
      //页面编码
      index: 1,
      // 遮罩层
      visible: false,
      //游戏id
      gameId: null,
      // 选中数组值
      tables: [],
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
        this.$notify.error('vip等级只能大于之前的等级')
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
    reset() {
      this.memberGameDataRecordList = []
    }
  }
}
</script>
