<template>
  <transition name="rj-loading-fade">
    <div class="rj-loading" v-show="visible">
      <div class="rj-loading-box" >
          {{msg}}
      </div>
    </div>
  </transition>
</template>
<script type="es6">
export default {
  data () {
    return {
      visible: false,
        msg: null
    };
  },
  components: {},
  computed: {},
  methods: {},
  mounted () {

  }
};
</script>
<style lang="scss" scoped>
  .rj-loading{
    position: absolute;
    /*margin-top: 240px;*/
    /*margin-left: calc(100vh - 80px);*/
    /*margin-left: 200px;*/
    width: 100%;
    height: 100%;
    min-height: 20vh;
    background: rgba(23, 23, 23, 0.62);
    z-index: 10000;
    top: 0;
    left: 0;
    transition: opacity 0.3s;
  }
  .rj-loading-box{
    width: 150px;
    height: 130px;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%);
    background-color: #fff;
    background-image:url("./fish3.gif");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: 130% auto;
    font-size: 16px;
    font-weight: bold;
    color: #ff12ee;
    line-height: 32px;
    text-align: center;
  }
  .rj-loading-fade-enter,
  .rj-loading-fade-leave-active {
    opacity: 0;
  }
</style>
