<template>
  <div>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="visible"
      width="550px"
      top="5vh"
      @close="reset()"
      append-to-body
    >
      <div v-model="memberGameDataDetail">
        <ele-form-textarea>
          print(memberGameDataDetail)
        </ele-form-textarea>
      </div>
    </el-dialog>
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
      // 对局详情列表
      memberGameDataDetail: [],
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
      //椅子号
      chairId: null,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10000,
        platformId: null,
        agent: null,
        kindId: null,
        recordId: null,
        account: null
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
      this.queryParams.account = row.account
      this.queryParams.recordId = row.recordID
      this.queryParams.kindId = row.kindID
      this.queryParams.agent = row.agent
      this.queryParams.platformId = row.platformId
      this.chairId = row.chairId
      this.getDetailList();
      this.visible = true
    },
    // 查询表数据
    getDetailList() {
      this.loading = true
      gameDetailList(this.queryParams).then(response => {
        let result = response.data
        let newMes = result.replace("chairId",this.chairId);
        this.memberGameDataDetail = newMes
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    print(val) {
      return (val + '').replace(/\n/g,"<br/>")
    },
    /** 重置按钮操作 */
    reset() {
      this.memberGameDataDetail = []
    },
  }
}
</script>
