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
import { getToken } from '@/utils/auth';
import { checkPermissions } from "@/api/platform-web/system/login";
import { startInterval, killInterval } from "@/utils/scheduledTask";



const StorageKey = 'notifyOnDeposit';
const IntervalMillis = 5000;

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
  mounted() {
    checkPermissions( 'pay:memberPayJour:list','pay:memberWithdrawLog:list','pay:memberRechargeLog:list','admin:payUsdtRecharge:list' )
      .then( hasPermissions => {
        if(!hasPermissions) {
          return;
        }

        let storedNotifyOnDeposit = localStorage.getItem( StorageKey );

        if( storedNotifyOnDeposit !== null ) {
          this.notifyOnDeposit = storedNotifyOnDeposit === "true";
        }

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
      } );
  },
  methods: {
    scheduleReminder() {
      localStorage.setItem( StorageKey, this.notifyOnDeposit.toString() );

      if( this.notifyOnDeposit ) {
        this.reminderInterval = startInterval(() => {
          if( !getToken()  ) {
            return;
          }

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

        }, IntervalMillis );
      } else {
        killInterval( this.reminderInterval );
      }
    }
  }
}

</script>

<style scoped>

</style>
