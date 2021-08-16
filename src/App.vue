<template>
  <div id="app">

    <router-view/>
    <hr/>

  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #f5f5f5;

}


//#app {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//
//  //text-align: center;
//  color: #2c3e50;
//}

</style>
