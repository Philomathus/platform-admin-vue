<template>

  <el-switch v-model="notifyOnWithdraw"
             style="padding-top: 13px"
             @change="scheduleReminder"
  />

</template>

<script>
import withdrawAudio from '@i/audio/withdraw_zh.mp3';
import {getCountAll, getCountAll as memberWithdrawLogListCount} from '@/api/platform-web/pay/memberWithdrawLog';

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
    memberWithdrawLogListCount().then(res => {
      this.totals.memberWithdrawLogListCount = res.data;
    }).then(this.scheduleReminder);
  },
  methods: {
    scheduleReminder() {
      if (this.notifyOnWithdraw) {
        this.reminderInterval = setInterval(() => {

          memberWithdrawLogListCount().then(res => {
              if (res.data > this.totals.memberWithdrawLogListCount) {
                this.totals.memberWithdrawLogListCount = res.data;
                this.audio.play();
              }
            }
          );

        }, 5000);
      } else {
        clearInterval(this.reminderInterval);
      }
    }
  }
}

</script>

<style scoped>

</style>
