<template>

  <video autoplay loop muted>
    <source src="@/assets/新后台主页.mp4" type="video/mp4"  />
  </video>
</template>

<style scoped>
  video{
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/
    /*filter:grayscale(100%); //背景灰度设置*/
    z-index:-11
  }
  source{
    min-width: 100%;
    min-height: 100%;
    height: 100%;
    width: 100%;
  }

</style>
