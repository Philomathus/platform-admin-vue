<template>

  <el-switch v-model="notifyOnDeposit"
             style="padding-top: 13px"
             @change="scheduleReminder"
  />

</template>

<script>
import depositAudio from '../../assets/audio/deposit_zh.mp3';
import { listCount as memberPayJourListCount } from '@/api/platform-web/pay/memberPayJour';
import { listCount as memberRechargeLogListCount } from '@/api/platform-web/pay/memberRechargeLog';
import { listCount as payUsdtRechargeListCount } from '@/api/platform-web/pay/payUsdtRecharge';
import { countMoney as payAgentRechargeLogListCount } from '@/api/platform-web/pay/payAgentRechargeLog';


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
      audio: new Audio( depositAudio ),
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
    payAgentRechargeLogListCount( this.query ).then( res => {
      this.totals.payAgentRechargeLogListCount = res.data.countNumber;
    });
    this.scheduleReminder();
  },
  methods: {
    scheduleReminder() {
      if( this.notifyOnDeposit ) {
        let play = false;
        this.reminderInterval = setInterval(() => {
          memberPayJourListCount( this.query ).then( res => {
              if( res.total > this.totals.memberPayJourListCount ) {
                this.totals.memberPayJourListCount = res.total;
                play = true;
              }
            }
          );
          memberRechargeLogListCount( this.query ).then( res => {
              if( res.total > this.totals.memberRechargeLogListCount ) {
                this.totals.memberRechargeLogListCount = res.total;
                play = true;
              }
            }
          );
          payUsdtRechargeListCount( this.query ).then( res => {
              if( res.total > this.totals.payUsdtRechargeListCount ) {
                this.totals.payUsdtRechargeListCount = res.total;
                play = true;
              }
            }
          );
          payAgentRechargeLogListCount( this.query ).then( res => {
              if( res.data.countNumber > this.totals.payAgentRechargeLogListCount ) {
                this.totals.payAgentRechargeLogListCount = res.data.countNumber ;
                play = true;
              }
            }
          );
          if ( play ) {
            this.audio.play();
          }
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
