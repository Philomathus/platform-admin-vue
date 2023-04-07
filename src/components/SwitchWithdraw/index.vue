<template>

  <el-switch  v-model="notifyOnWithdraw"
              style="padding-top: 13px"
              @change="scheduleReminder"
  />

</template>

<script>
import withdrawAudio from '../../assets/audio/notif_sound_withdraw.wav';
import { getCountTotal as memberWithdrawLogListCount } from '@/api/platform-web/pay/memberWithdrawLog';


export default {
  data(){
    return {
      notifyOnWithdraw: true,
      totals: {
        memberWithdrawLogListCount: 0
      },
      audio: new Audio( withdrawAudio ),
      query: {
        searchTime: [ this.parseTime( this.getTodayStartTime() ), this.parseTime( this.getTodayEndTime() ) ]
      },
      reminderInterval: null
    };
  },
  mounted(){
    memberWithdrawLogListCount( this.query ).then( res => {
      this.totals.memberWithdrawLogListCount = res.data.total;
    })
    this.scheduleReminder();
  },
  methods: {
    scheduleReminder() {
      if( this.notifyOnWithdraw ) {
        this.reminderInterval = setInterval(() => {
          memberWithdrawLogListCount( this.query ).then( res => {
          if( res.data.total > this.totals.memberWithdrawLogListCount ) {
            this.totals.memberWithdrawLogListCount = res.data.total;
            console.log(this.totals.memberWithdrawLogListCount);
          }
        }
    );
  }, 3000);
} else {
  clearInterval( this.reminderInterval );
}
}
  }
}

</script>

<style scoped>

</style>
