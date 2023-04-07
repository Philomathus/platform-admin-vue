<template>

  <el-switch  v-model="switchValue"
              style="padding-top: 13px"
              active-value="ON"
              inactive-value="OFF"
              @change="turnOnNotification"

  />
</template>

<script>
import withdrawAudio from '../../assets/audio/notif_sound_withdraw.wav';

const SW_ON = "ON";
const SW_OFF = "OFF";

export default {
  data(){
    return {
      switchValue: SW_ON,
      withdrawAudio: null,
      hasWithdraw: false
    };
  },
  mounted(){
    this.withdrawAudio = new Audio(withdrawAudio)
  },
  methods: {
    turnOnNotification(){
      this.hasWithdraw = true;
      if ( this.switchValue === SW_ON && this.hasWithdraw ){
        //Everytime someone do deposit, play sound...



        this.withdrawAudio.play();
        console.log( "Withdraw Notification Sound is Playing ... " );
      }
    }
  }
}

</script>

<style scoped>

</style>
