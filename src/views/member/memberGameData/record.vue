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
        <el-table-column label="游戏局号" align="center" prop="gameID"/>
        <el-table-column label="玩家帐号" align="center" prop="accounts"/>
        <el-table-column label="房间ID" align="center" prop="serverID"/>
        <el-table-column label="游戏ID" align="center" prop="kindID"/>
        <el-table-column label="桌子号" align="center" prop="tableID"/>
        <el-table-column label="椅子号" align="center" prop="chairID"/>
        <el-table-column label="玩家数量" align="center" prop="userCount"/>
        <el-table-column label="手牌公共牌" align="center" prop="cardValue"/>
        <el-table-column label="有效下注" align="center" prop="cellScore"/>
        <el-table-column label="总下注" align="center" prop="allBet"/>
        <el-table-column label="盈利" align="center" prop="profit"/>
        <el-table-column label="抽水" align="center" prop="revenue"/>
        <el-table-column label="结算时间" align="center" prop="gameEndTime"/>
        <el-table-column label="代理ID" align="center" prop="channelID"/>
        <el-table-column label="所属站点" align="center" prop="lineCode"/>
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
    <detail ref="detail" :record-id="recordID"/>

    <!-- 游戏对局日志 -->
    <el-dialog title="游戏对局日志" :visible.sync="fundsOpen" width="1500px" style="max-height:100%;overflow-y: scroll;"
               append-to-body>
      <div v-loading="loading" :style="'height:'+ height">
        <iframe :src="detailLink" frameborder="no" style="width: 100%;height: 600px" scrolling="auto" />
      </div>
    </el-dialog>
  </div>

</template>

<script>

import { gameDetailList, gameRecordList } from '../../../api/platform-web/member/memberGameData'
import detail from './detail'

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
      recordID: null,
      //平台ID
      platformId: null,
      //椅子号
      chairId: null,
      //h会员账号
      account: null,
      //显示明细
      fundsOpen: false,
      //对局地址
      detailLink: null,
      // 查询参数
      queryParams: {
        platformId: null,
        agent: null,
        gameId: null,
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
        this.memberGameDataRecordList = response.data.list
        if (response.data.list[0] != null && response.data.list[0] != undefined){
          this.chairId = response.data.list[0].chairID
        }
        this.total = response.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    //查看明细
    handleDetail(row){
      if (this.platformId == 17){
        this.queryParams.gameId = row.gameId;
        this.queryParams.agent = row.agent;
        this.queryParams.platformId = this.platformId
        this.queryParams.account = row.accounts;
        this.queryParams.gameUserNo = row.gameID
        this.queryParams.serverId = row.serverID
        this.queryParams.recordId = row.recordID
        this.loading = true
        gameDetailList(this.queryParams).then(response => {
          this.detailLink = response.data.gameLogURL
          this.fundsOpen = true
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }else {
        row.platformId = this.platformId
        row.chairId = this.chairId
        row.accounts = this.accounts
        row.account = this.account
        this.$refs.detail.show(row)
      }
    },
    /** 重置按钮操作 */
    reset() {
      this.memberGameDataRecordList = []
    }
  }
}
</script>
