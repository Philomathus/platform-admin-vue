<template>

  <div class='border'>
  <video autoplay loop muted width="100%">
    <source src="@/assets/新后台主页.mp4" type="video/mp4"  />
  </video>
  </div>
</template>

<style scoped>
  video{
    position: fixed;
    top: 3%;
    left: 0%;

/*    right: 0px;
    bottom: 0px;*/
    /*height: 100%;*/

    height: 100%;
    width: 100%;
    /*加滤镜*/
    /*filter: blur(15px);*/
    /*-webkit-filter: grayscale(100%);*/
 /*背景灰度设置*/
 /*   filter:grayscale(100%);*/
    z-index:-11
  }
/*
  .border{
    position:relative;
    width:100%;
    height:0;
  !*因为padding和margin等受width影响，父容器固定后，子标签可以进行填充。此处75%是3/4，其他比例可以依照此法。*!
    padding-bottom:75%;
  }
*/

  source{
    min-width: 100%;
    min-height: 100%;
    height: 100%;
    width: 100%;
  }

</style>
