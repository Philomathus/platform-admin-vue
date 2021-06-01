<template>

  <el-dialog v-dialogDrag :close-on-click-modal="false" title="资金明细" :visible.sync="open" width="800px"
             append-to-body
  >
    <div class="memberInfo">
      <div class="title">会员基本信息</div>
      <div class="mount" style="width: 20%">
        <div class="font">会员Id</div>
        <div class="font">注册时间</div>
        <div class="font">电话号码</div>
        <div class="font">会员打码</div>
        <div class="font">会员IP</div>
      </div>
      <div class="mount" style="width: 20%">
        <div class="font">{{data.会员编号}}</div>
        <div class="font">{{data.会员注册时间}}</div>
        <div class="font" @click="showPhone" style="background-color: #cccc77">{{data.会员名称}}</div>
        <div class="font">{{data.会员打码}}</div>
        <div class="font">{{data.登陆IP}}</div>
      </div>
      <div class="mount" style="width: 20%">
        <div class="font">当前余额</div>
        <div class="font">登录时间</div>
        <div class="font">VIP等级</div>
        <div class="font">会员注单</div>
        <div class="font">登录地址</div>
      </div>
      <div class="mount" style="width: 20%">
        <div class="font">{{data.会员积分}}</div>
        <div class="font">{{data.登录时间}}</div>
        <div class="font">{{data.会员VIP}}</div>
        <div class="font">{{data.会员注单}}</div>
        <div class="font">{{data.登陆地址}}</div>
      </div>
    </div>
    <div class="fundsInfo">
      <div class="title">会员资金信息</div>
      <div class="mount" style="width: 80%">
        <div class="font">线下充值金额: {{data.线下充值金额}}</div>
        <div class="font">线上充值金额(一月内): {{data.线上金额}}</div>
        <div class="font">代充金额: {{data.人工代充金额}}</div>
        <div class="font">手工上分金额: {{data.平台赠送金额}}</div>
        <div class="font">充值总金额: {{data.充值总的金额}}</div>
        <div class="font">提现次数: {{data.会员提现次数}}</div>
        <div class="font">提现金额: {{data.会员提现金额}}</div>
      </div>
    </div>
    <div class="lotteryInfo">
      <div class="title">彩票检测</div>
      <div class="mount" style="width: 80%">
        <div class="font">异常投注次数: {{data.彩票异常投注次数}}</div>
      </div>
    </div>
    <div class="playInfo">
      <div class="title" style="border-right:  1px solid rgba(0, 0, 0, 0.10);">游戏盈利</div>
      <div class="mount" style="width: 80%">
        <div class="font" v-for="item in playData">{{item}}</div>
      </div>
    </div>
  </el-dialog>
</template>
member
<script>
  import {checkTwoLogin} from "@/utils/permission";
  import {
    getMemberInfo,
  } from '@/api/platform-web/member/memberInfo'

  export default {
    name: "TableShow",
    props: {
      propC: {
        type: String,
        required: false,
        default: '100',
      },
    },
    /*组件值*/
    data() {
      return {
        open: false,
        data: {},
        playData: []
      }
    },
    /*组件方法*/
    methods: {
      showPhone() {
        if (checkTwoLogin()) {
          //获取会员的手机号
          getMemberInfo(this.data['会员编号']).then((res) => {
            console.log(res)
            this.data['会员名称'] = res.data.phone
            this.$forceUpdate();
          });

        }
      },
      show(data) {
        this.playData = []
        data.forEach((value, index, array) => {
          var classTwoname = value.class_twoname;
          var tValue = value.t_value;
          if (tValue && tValue.indexOf('投注:') >= 0) {
            this.playData.push(classTwoname + tValue)
          } else {
            this.data[classTwoname] = tValue
          }
        });
        this.open = true
        // this.data = data;
      }
    },
    /*组件的初始化方法*/
    created() {

    },
    /*组件的销毁方法*/
    destroyed() {
    },
  }


</script>

<style scoped>

  div {
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.10);
    font-size: 14px;
    line-height: 300%;
    text-align: center;
    /*align-items:center; display: flex;*/
  }

  .font {
    height: 40px;
    text-align: center;
  }

  .title {
    width: 20%;
    margin: 0 0 0 0;
    border:  0px solid rgba(0, 0, 0, 0.10);
    /*height: 100%;*/
  }

  .memberInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .fundsInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .lotteryInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .playInfo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .mount {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
