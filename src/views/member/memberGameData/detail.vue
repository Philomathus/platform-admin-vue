<template>
  <div>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="1500px"
      top="5vh"
      append-to-body
    >
      <el-table stripe v-loading="loading" :data="memberGameDataDetailList">
        <el-table-column label="游戏局号" align="center" prop="bet"/>
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
        <el-table-column label="游戏开始时间" align="center" prop="gameStartTime"/>
        <el-table-column label="下注分数" align="center" prop="bet"/>
        <el-table-column label="渠道ID" align="center" prop="channelID"/>
        <el-table-column label="所属站点" align="center" prop="lineCode"/>
      </el-table>
    </el-dialog>

    <detail ref="detail" :record-id="recordId"/>
  </div>

</template>

<script>

import { gameDetailList } from '../../../api/platform-web/member/memberGameData'

export default {
  props: {

  },
  components: {

  },
  data() {
    return {
      msg: '',
      // 遮罩层
      loading: true,
      //弹出框标题
      title: '游戏对局详情',
      //页面编码
      index: 1,
      // 遮罩层
      visible: false,
      //游戏id
      gameId: null,
      // 选中数组值
      tables: [],
      // 对局详情列表
      memberGameDataDetailList: [],
      //加分提交的数据
      form: {},
      // 总条数
      total: 0,
      //日期开始时间
      game_start_time: null,
      //日期结束时间
      game_end_time: null,
      //明细id
      recordId: null,
      //游戏 ID
      kindID: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10000,
        platformId: null,
        agent: null,
        kindId: null,
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
      this.queryParams.account = row.accounts
      this.queryParams.recordId = row.recordID
      this.queryParams.kindId = row.kindID
      this.queryParams.agent = row.agent
      this.queryParams.platformId = row.platformId
      this.getDetailList();
      this.visible = true
    },
    // 查询表数据
    getDetailList() {
      this.loading = true
      gameDetailList(this.queryParams).then(response => {
        this.memberGameDataDetailList = response.data.list
        this.total = response.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
