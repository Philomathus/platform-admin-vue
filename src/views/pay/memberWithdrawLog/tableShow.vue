<template>

  <el-dialog :close-on-click-modal="false" title="资金明细" :visible.sync="open" width="800px" append-to-body>
    <div class="memberInfo">
      <div class="title">会员基本信息</div>
      <div class="mount" style="width: 12%">
        <div class="font">会员Id</div>
        <div class="font">注册时间</div>
        <!--        <div class="font">电话号码</div>-->
        <div class="font">用户类型</div>
        <div class="font">会员打码</div>
        <div class="font">会员IP</div>
      </div>
      <div class="mount" style="width: 28%">
        <div class="font">{{ data.会员编号 }}</div>
        <div class="font">{{ data.会员注册时间 }}</div>
        <!--        <div class="font" @click="showPhone" style="background-color: #cccc77">{{ data.会员名称 }}</div>-->
        <div class="font">{{ data.用户类型 }}</div>
        <div class="font">{{ data.会员打码 }}</div>
        <div class="font">{{ data.登陆IP }}</div>
      </div>
      <div class="mount" style="width: 12%">
        <div class="font">当前余额</div>
        <div class="font">登录时间</div>
        <div class="font">VIP等级</div>
        <div class="font">会员注单</div>
        <div class="font">登录地址</div>
      </div>
      <div class="mount" style="width: 28%">
        <div class="font">{{ data.会员积分 }}</div>
        <div class="font">{{ data.登录时间 }}</div>
        <div class="font">{{ data.会员VIP }}</div>
        <div class="font">{{ data.会员注单 }}</div>
        <div class="font" @click="showAddress" style="background-color: #cccc77">{{ address }}</div>
      </div>
    </div>
    <div class="fundsInfo">
      <div class="title">会员资金信息</div>
      <div class="mount" style="width: 80%">

        <div style="display: flex;justify-content: flex-start;">
          <div class="mount" style="width: 43%">
            <div class="font">线上充值金额(一月内): {{ data.线上金额 }}</div>
          </div>
          <div class="mount" style="width: 45%">
            <div class="font">线上历史充值金额:{{ historyRecharge || 0.00 }}</div>
          </div>
          <div class="mount" style="width: 12%">
            <el-button type="primary" plain @click="getHistoryRecharge()">查询</el-button>
          </div>
        </div>
        <div class="font">线下充值金额: {{ data.线下充值金额 }}</div>
        <div class="font">USDT充值金额: {{ data.USDT充值金额 }}</div>
        <div class="font">代充金额: {{ data.人工代充金额 }}</div>
        <div class="font">手工上分金额: {{ data.手动增加金额 }}</div>
        <div class="font">平台赠送金额: {{ data.平台赠送金额 }}</div>
        <div class="font">充值总金额: {{ totalRecharge || 0.00 }}</div>
        <div class="font">提现次数: {{ data.会员提现次数 }}</div>
        <div class="font">提现金额: {{ data.会员提现金额 }}</div>
      </div>
    </div>
    <div class="lotteryInfo">
      <div class="title">会员备注</div>
      <div class="mount" style="width: 80%">
        <div class="member-note-field">
          <el-input type="textarea" id="text-area" class="font" style="height: auto" v-model.trim="email" maxlength="50" show-word-limit></el-input>
          <el-button class="renew-btn2" type="primary" plain @click="updateEmail(email,data.会员编号)">更新</el-button>
        </div>
      </div>
    </div>
    <div class="lotteryInfo">
      <div class="title">彩票检测</div>
      <div class="mount" style="width: 80%">
        <div class="font">异常投注次数: {{ data.彩票异常投注次数 }}</div>
      </div>
    </div>
    <div class="playInfo">
      <div class="title" style="border-right:  1px solid rgba(0, 0, 0, 0.10);">游戏盈利(一月内)</div>
      <div class="mount" style="width: 80%">
        <div class="font" v-for="item in playData">{{ item }}</div>
      </div>
    </div>
  </el-dialog>
</template>
member
<script>
import {checkTwoLogin} from "@/utils/permission";
import {
  getMemberInfo, updateEmail, getMemberLoginAddress, getHistoryRecharge
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
      address: '******',
      historyRecharge: "",
      totalRecharge: "",
      data: {},
      playData: [],
      email: '',
    }
  },
  /*组件方法*/
  methods: {
    validateTextLength(value) {
      // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
      let mat = value.match(cnReg)
      let length
      if (mat) {
        length = (mat.length + (value.length - mat.length) * 0.5)
        return length
      } else {
        return value.length * 0.5
      }
    },

    updateEmail(email, id) {
      if (this.validateTextLength(this.email) > 50) {
        this.$message.error("最多输入50个汉字")
      } else {
        updateEmail({id: id, email: email}).then((res) => {
          this.$notify.success("修改成功")
        })
      }
    },
    showPhone() {
      if (this.data['会员名称'] === null) {
        this.$message.error("此会员无手机号");
      } else {
        if (checkTwoLogin()) {
          //获取会员的手机号
          getMemberInfo(this.data['会员编号']).then((res) => {
            this.data['会员名称'] = res.data.phone
            this.$forceUpdate();
          });
        }
      }
    },
    showAddress() {
      //获取会员的登录地址
      getMemberLoginAddress(this.data['会员编号']).then((res) => {
        this.address = res.msg;
      });
    },
    getHistoryRecharge() {
      getHistoryRecharge(this.data['会员编号']).then((res) => {
        this.historyRecharge = res.msg;
        if (this.historyRecharge !== null) {
          this.totalRecharge = (parseFloat(this.totalRechargeOriginal) + parseFloat(this.historyRecharge)).toFixed(2)
        }
      });
    },
    show(data) {
      this.address = '******'
      this.data['会员名称'] = null;
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
      this.historyRecharge = ''
      // this.data = data;
      this.email = this.data.会员备注;
      this.totalRechargeOriginal = this.data.充值总的金额;
      this.totalRecharge = this.data.充值总的金额;
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

.member-note-field{
  display: flex;
  justify-content: flex-start;
  height: 57px;
  padding-bottom: 5px;
  overflow: hidden;
}

.el-textarea .el-input__count {
  bottom: -10px !important;
}

.font {
  height: 40px;
  text-align: center;
}
#text-area{
  height: 50px;
  width: 100%;
  text-align: center;
}

.renew-btn2{
  height: 53px;
}

.title {
  width: 20%;
  margin: 0 0 0 0;
  border: 0px solid rgba(0, 0, 0, 0.10);
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
