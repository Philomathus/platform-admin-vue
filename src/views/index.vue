<template>
  <div>

  </div>
</template>

<script>
  export default {
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
        Interval: {},
        show: {},
      }
    },
    /*监听器,监听单个变量,param就是data的变量*/
    watch: {
      param: function (newVal, oldVal) {

      },
    },
    /*监听器2号,监听多个变量*/
    computed: {
      getValue: function () {
        return ''
      }
    },
    /*组件方法*/
    methods: {
      test(param) {
        console.log(param)
      }
    },
    /*组件的初始化方法*/
    created() {
      this.test('世界威望');
    },
    /*组件的销毁方法*/
    destroyed() {
    },
  }


</script>

<style scoped>

</style>
