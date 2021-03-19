<template>


  <video id="v1" autoplay loop muted width="100%" >
    <source src="@/assets/新后台主页.mp4" type="video/mp4"  />
  </video>

</template>

<style scoped>
  *{
    margin: 0px;
    padding: 0px;
  }
  video{
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 91%;

    object-fit: inherit;
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/
    /*filter:grayscale(100%); //背景灰度设置*/
    z-index:-11
  }
  source{
    min-width: 100%;
    min-height: 100%;
    height: auto;
    width: auto;
  }

</style>
