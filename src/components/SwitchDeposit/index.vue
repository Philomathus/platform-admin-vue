<template>

  <el-switch  v-model="switchValue"
              style="padding-top: 13px"
              active-value="ON"
              inactive-value="OFF"
              @change="turnOnNotification"

  />
</template>

<script>
import depositAudio from '../../assets/audio/notif_sound_deposit.wav';
const SW_ON = "ON";
const SW_OFF = "OFF";


export default {
  data(){
    return {
      switchValue: SW_ON,
      depositAudio: null,
      hasDeposit: false
    };
  },
  mounted(){
    this.depositAudio  = new Audio(depositAudio)
  },
  methods: {
    turnOnNotification(){
      this.hasDeposit = true;
      if ( this.switchValue === SW_ON && this.hasDeposit ){
        //Everytime someone do deposit, play sound...


        this.depositAudio.play();
        console.log( "Deposit Notification Sound is Playing ... " );
      }
    }
  }
}

</script>

<style scoped>

</style>
