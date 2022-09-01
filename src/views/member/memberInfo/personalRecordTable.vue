<template>
<!-- Personal Record popup page -->
  <el-dialog :close-on-click-modal="false" title="个人报表" :visible.sync="open" width="1000px" append-to-body>

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item label="日期范围" prop="regTime">
        <el-date-picker type="datetimerange" v-model="date.dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '90%'}" start-placeholder="开始时间"
                        end-placeholder="开始时间"
                        range-separator="至" clearable :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="initData()">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
        <td>****</td>
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
        <td></td>
        <th class="bold">投注游戏</th>
        <th class="bold">有效投注</th>
        <th class="bold">盈亏</th>
      </tr>
      <tr>
        <td></td>
        <td class="bold">彩票</td>
        <td>****</td>
        <td>****</td>
      </tr>
      <tr>
        <td></td>
        <td class="bold">开元</td>
        <td>****</td>
        <td>****</td>
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
      data: {},
      showSearch: true,
      personRecordList : [],

      /** recharge data */
      onlineRecharge : 0,
      totalRechargeCount : 0,
      income : 0,

      queryParams:{},
      date:{
        dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },
      pickerOptions: {shortcuts: pickerDateTimeShortcuts},
    }
  },


  methods: {
    showPersonReport(data) {

      /** 线上充值 = personalOnlineRecharge + personalAgentRecharge + personalUsdtRecharge */
        this.onlineRecharge = data.personalOnlineRecharge + data.personalAgentRecharge + data.personalUsdtRecharge ;

      /** 合计充值 = 线上充值+线下充值*/
         this.totalRechargeCount = this.onlineRecharge + data.personalRecharge;

      /**  盈亏 = 提款 - 合计充值*/
         this.income = data.personalWithdrawRecharge - this.totalRechargeCount;

        this.data = data;
        this.open = true
      },


    initData(){
       let userId = "7700_73768"
       var date = this.date

       getPersonalReport(userId).then((res) => {
         this.personRecordList = res.data
         console.info(this.personRecordList)
         // this.$refs.tableShow.show(res.data);
       })
    },

    resetQuery(){}

  },
  /*组件的初始化方法*/
  created() {
    this.initData();
  },
  /*组件的销毁方法*/
  destroyed() {
  },
}

function initData(){

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
