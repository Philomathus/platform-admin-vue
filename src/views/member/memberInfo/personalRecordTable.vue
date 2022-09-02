<template>
<!-- Personal Record popup page -->
  <el-dialog :close-on-click-modal="false" title="个人报表" :visible.sync="open" width="1000px" append-to-body>

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="date.dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间" :clearable="false"
                        range-separator="至" :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="initData()">搜索</el-button>
      </el-form-item>
    </el-form>

    <table style="width:100%;margin-bottom: 40px">

      <tr>
        <th class="bold">会员ID</th>
        <td>{{data.memberId}}</td>
        <th class="bold">提款</th>
        <td>{{data.personalWithdrawRecharge}}</td>
      </tr>
      <tr>
        <th class="bold">线上充值</th>
        <td>{{this.onlineRecharge}}</td>
        <th class="bold">线下充值</th>
        <td>{{data.personalRecharge}}</td>
      </tr>
      <tr>
        <th>合计充值</th>
        <td>{{this.totalRechargeCount}}</td>
        <th class="bold">打码量</th>
        <td>{{ this.aBet }}</td>
      </tr>
      <tr>
        <td class="bold">送礼</td>
        <td>{{data.personalLiverVideoProp}}</td>
        <td class="bold">盈亏</td>
        <td>{{this.income}}</td>
      </tr>
      <tr>
        <td colspan="8"></td>
      </tr>
      <tr>
        <th class="bold" colspan="2">投注游戏</th>
        <th class="bold">有效投注</th>
        <th class="bold">盈亏</th>
      </tr>
      <tr v-for="bcList in bCodeList">
        <td colspan="2">{{bcList.platformName}}</td>
        <td>{{bcList.cellScore}}</td>
        <td>{{bcList.profit}}</td>
      </tr>

    </table>

    <el-button type="primary" plain @click="open=false"  style="float: right;margin-top: -20px">
      关闭
    </el-button>


  </el-dialog>
</template>
<script>
import {getPersonalReport} from "@/api/platform-web/member/memberInfo";
import {pickerDateTimeShortcuts} from "@/utils/dateUtils";

export default {
  name: "PersonalRecordTable",
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
      memberId: '',
      data: {
        personalOnlineRecharge : 0,
        personalAgentRecharge : 0,
        personalUsdtRecharge : 0,
        personalWithdrawRecharge:0,
        personalRecharge:0,
        personalLiverVideoProp:0,
      },
      showSearch: true,
      personRecordList : [],
      bCodeList : [],

      /** recharge data */
      onlineRecharge : 0,
      totalRechargeCount : 0,
      income : 0,
      aBet : 0,

      queryParams:{},

      date:{
        dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },

      pickerOptions: {shortcuts: pickerDateTimeShortcuts},

    }
  },

  methods: {

    /** personal report start here 个人报告从这里开始 */
    showPersonReport(data) {

      /** 线上充值 = personalOnlineRecharge + personalAgentRecharge + personalUsdtRecharge */
        this.onlineRecharge = data.personalOnlineRecharge + data.personalAgentRecharge + data.personalUsdtRecharge ;

      /** 合计充值 = 线上充值+线下充值 this.onlineRecharge + data.personalRecharge */
         this.totalRechargeCount = this.onlineRecharge + data.personalRecharge;

      /**  盈亏 = 提款 - 合计充值 income  =  data.personalWithdrawRecharge - this.totalRechargeCount*/
         this.income = data.personalWithdrawRecharge - this.totalRechargeCount;

        this.data = data;
        this.open = true
        this.bCodeList = this.data.bCodeList;

        this.aBet = 0;
        this.bCodeList.forEach((aBet)=>{
          this.aBet += aBet.allBet;
        })
      },

    initData(){
       var date = this.date
        if(!date.dateRange){
          this.msgError("搜索时间不允许为空");
          return
        }
       getPersonalReport(this.memberId,date).then((res) => {
         this.showPersonReport(res.data);
       })
    },

    /** getting show(id) method from memberInfo */
    show(memberId){
      this.memberId = memberId;
      this.open = true;
      this.initData();
    }
   /** Personal report end here 个人报告到此结束*/

  },
}
</script>

<style scoped>

table, th, td {
  border: 2px solid rgba(0, 0, 0, 0.10);
  border-collapse: collapse;
}

td{
  height: 40px;
  text-align: center;
}

.bold{
  font-weight: bold;
}

</style>
