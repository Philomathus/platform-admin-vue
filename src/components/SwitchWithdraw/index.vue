<template>

  <el-switch v-model="notifyOnWithdraw"
             style="padding-top: 13px"
             @change="scheduleReminder"
  />

</template>

<script>
import withdrawAudio from '@i/audio/withdraw_zh.mp3';
import { getCountAll as memberWithdrawLogListCount } from '@/api/platform-web/pay/memberWithdrawLog';
import { getToken } from "@/utils/auth";
import { checkPermissions } from "@/api/platform-web/system/login";
import { startInterval, killInterval } from "@/utils/scheduledTask";

const StorageKey = 'notifyWithdraw';
const IntervalMillis = 5000;
export default {
  data() {
    return {
      notifyOnWithdraw: true,
      totals: {
        memberWithdrawLogListCount: 0
      },
      audio: new Audio(withdrawAudio),
      query: {
        searchTime: [this.parseTime(this.getTodayStartTime()), this.parseTime(this.getTodayEndTime())]
      },
      reminderInterval: null
    };
  },
  mounted() {
    checkPermissions( 'pay:memberPayJour:list','pay:memberWithdrawLog:list','pay:memberRechargeLog:list','admin:payUsdtRecharge:list' )
      .then( hasPermissions => {
        if (!hasPermissions) {
          return;
        }

        let storedNotifyOnWithdraw = localStorage.getItem(StorageKey);

        if (storedNotifyOnWithdraw !== null) {
          this.notifyOnWithdraw = storedNotifyOnWithdraw === "true";
        }

        memberWithdrawLogListCount().then(res => {
          this.totals.memberWithdrawLogListCount = res.data;
        }).then(this.scheduleReminder);
      } );
  },
  methods: {
    scheduleReminder() {
      localStorage.setItem( StorageKey, this.notifyOnWithdraw.toString() );

      if (this.notifyOnWithdraw) {
        this.reminderInterval = startInterval(() => {
          if( !getToken() ) {
            return;
          }

          memberWithdrawLogListCount().then(res => {
              if (res.data > this.totals.memberWithdrawLogListCount) {
                this.totals.memberWithdrawLogListCount = res.data;
                this.audio.play();
              }
            }
          );

        }, IntervalMillis );
      } else {
        killInterval(this.reminderInterval);
      }
    }
  }
}

</script>

<style scoped>

</style>
