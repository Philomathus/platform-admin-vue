<template>
  <!-- Personal Record popup page -->
  <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="open" width="1000px" append-to-body>

    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" style="margin-top: 20px">
      <el-form-item :label=" $t('global.selectDatePlaceholder') " prop="regTime">
        <el-date-picker type="datetimerange" v-model="date.dateRange" format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss" :style="{width: '95%'}" :start-placeholder=" $t('global.dateTimePickerStartTimePlaceholder') "
                        :end-placeholder=" $t('global.dateTimePickerEndTimePlaceholder') " :clearable="false"
                        :range-separator=" $t('global.dateTimePickerRangeSeparator') " :default-time="['00:00:00', '23:59:59']" :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="initData()">{{ $t('global.searchButton') }}</el-button>
      </el-form-item>
    </el-form>

    <table style="width:100%;margin-bottom: 40px">

      <tr>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.memId') }}</th>
        <td>{{ data.memberId }}</td>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.wFunds') }}</th>
        <td>{{ data.personalWithdrawRecharge }}</td>
      </tr>
      <tr>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.oTop') }}</th>
        <td>{{ this.onlineRecharge }}</td>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.ofTop') }}</th>
        <td>{{ data.personalRecharge }}</td>
      </tr>
      <tr>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.tRech') }}</th>
        <td>{{ this.totalRechargeCount }}</td>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.cVol') }}</th>
        <td>{{ this.aBet.toFixed(2) }}</td>
      </tr>
      <tr>
        <td class="bold">{{ $t('members.memberInfo.personalRecordTable.gGiv') }}</td>
        <td>{{ data.personalLiverVideoProp }}</td>
        <td class="bold">{{ $t('members.memberInfo.personalRecordTable.pnl') }}</td>
        <td>{{ this.income }}</td>
      </tr>
      <tr>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.bal') }}</th>
        <td>{{ data.totalAccount.total_account }}</td>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.sdepB') }}</th>
        <td>{{ data.totalAccount.box_account }}</td>
      </tr>
      <tr>
        <td colspan="8"></td>
      </tr>


      <tr>
        <th class="bold" colspan="2">{{ $t('members.memberInfo.personalRecordTable.bGames') }}</th>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.vBets') }}</th>
        <th class="bold">{{ $t('members.memberInfo.personalRecordTable.pnl') }}</th>
      </tr>
      <tr v-for="bcList in bCodeList">
        <td colspan="2">{{ bcList.platformName }}</td>
        <td>{{ bcList.cellScore.toFixed(2) }}</td>
        <td>{{ bcList.profit.toFixed(2) }}</td>
      </tr>

    </table>

    <el-button type="primary" plain @click="open=false" style="float: right;margin-top: -20px">
      {{ $t('global.close') }}
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
        personalOnlineRecharge: 0,
        personalAgentRecharge: 0,
        personalUsdtRecharge: 0,
        personalWithdrawRecharge: 0,
        personalRecharge: 0,
        personalLiverVideoProp: 0,
      },
      showSearch: true,
      personRecordList: [],
      bCodeList: [],
      title: '',

      /** recharge data */
      onlineRecharge: 0,
      totalRechargeCount: 0,
      income: 0,
      aBet: 0,

      queryParams: {},

      date: {
        dateRange: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },

      pickerOptions: {shortcuts: pickerDateTimeShortcuts},

    }
  },

  methods: {

    /** personal report start here 个人报告从这里开始 */
    showPersonReport(data) {

      /** 线上充值 = personalOnlineRecharge + personalAgentRecharge + personalUsdtRecharge */
      this.onlineRecharge = data.personalOnlineRecharge + data.personalAgentRecharge + data.personalUsdtRecharge;

      /** 合计充值 = 线上充值+线下充值 this.onlineRecharge + data.personalRecharge */
      this.totalRechargeCount = this.onlineRecharge + data.personalRecharge;

      /**  盈亏 = 提款 - 合计充值 income  =  data.personalWithdrawRecharge - this.totalRechargeCount*/

      this.income = (data.personalWithdrawRecharge - this.totalRechargeCount).toFixed(2);

      console.info(this.income)


      this.data = data;
      this.open = true
      this.bCodeList = this.data.bCodeList;

      this.aBet = 0;
      this.bCodeList.forEach((aBet) => {
        this.aBet += aBet.allBet;
      })


    },

    initData() {
      const date = this.date
      if (!date.dateRange) {
        this.msgError( this.$t('members.memberInfo.personalRecordTable.sTime') );
        return
      }
      getPersonalReport(this.memberId, date).then((res) => {
        this.showPersonReport(res.data);
      })
    },

    /** getting show(id) method from memberInfo */
    show(memberId, title) {
      this.memberId = memberId;
      this.open = true;
      this.title = title;
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

td {
  height: 40px;
  text-align: center;
}

.bold {
  font-weight: bold;
}

</style>
