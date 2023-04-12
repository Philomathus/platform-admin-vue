<template>

  <el-switch v-model="notifyOnDeposit"
             style="padding-top: 13px"
             @change="scheduleReminder"
  />

</template>

<script>
import onlineRecharge from '@i/audio/online_deposit_zh.mp3';
import companyDeposit from '@i/audio/company_deposit_zh.mp3';
import usdtDeposit from '@i/audio/usdt_deposit_zh.mp3';

import { listCount  as memberPayJourListCount }       from '@/api/platform-web/pay/memberPayJour';
import { listCount  as memberRechargeLogListCount }   from '@/api/platform-web/pay/memberRechargeLog';
import { listCount  as payUsdtRechargeListCount }     from '@/api/platform-web/pay/payUsdtRecharge';

export default {
  data(){
    return {
      notifyOnDeposit: true,
      totals: {
        memberPayJourListCount: 0,
        memberRechargeLogListCount: 0,
        payUsdtRechargeListCount: 0,
        payAgentRechargeLogListCount: 0
      },
      audios: {
        online_recharge: new Audio ( onlineRecharge ),
        company_deposit: new Audio ( companyDeposit ),
        usdt_deposit:    new Audio ( usdtDeposit )
      },
      query: {
        selectDate: [ this.parseTime( this.getTodayStartTime() ), this.parseTime( this.getTodayEndTime() ) ]
      },
      reminderInterval: null
    };
  },
  mounted(){
      memberPayJourListCount( this.query ).then( res => {
        this.totals.memberPayJourListCount = res.total;
      });
      memberRechargeLogListCount( this.query ).then( res => {
        this.totals.memberRechargeLogListCount = res.total;
      });
      payUsdtRechargeListCount( this.query ).then( res => {
        this.totals.payUsdtRechargeListCount = res.total;
      });
      this.scheduleReminder();
  },
  methods: {
    scheduleReminder() {
      if( this.notifyOnDeposit ) {
        this.reminderInterval = setInterval(() => {

          memberPayJourListCount( this.query ).then( res => {
              if( res.total > this.totals.memberPayJourListCount ) {
                this.totals.memberPayJourListCount = res.total;
                this.audios.online_recharge.play();
              }
            }
          );
          memberRechargeLogListCount( this.query ).then( res => {
              if( res.total > this.totals.memberRechargeLogListCount ) {
                this.totals.memberRechargeLogListCount = res.total;
                this.audios.company_deposit.play();
              }
            }
          );
          payUsdtRechargeListCount( this.query ).then( res => {
              if( res.total > this.totals.payUsdtRechargeListCount ) {
                this.totals.payUsdtRechargeListCount = res.total;
                this.audios.usdt_deposit.play();
              }
            }
          );

        }, 5000);
      } else {
        clearInterval( this.reminderInterval );
      }
    }
  }
}

</script>

<style scoped>

</style>
