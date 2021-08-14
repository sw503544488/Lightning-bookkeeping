<template>
  <div class="nav">
    <router-link to="/money">
      <Icon name="money"/>

      记账
    </router-link>
    |
    <router-link to="/labels">
      <Icon name="label"/>
      标签
    </router-link>
    |
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计
    </router-link>

  </div>
</template>

<script lang='ts'>
// eslint-disable-next-line no-undef

// import x from '../assets/icon/bar.svg';
// import y from '@/assets/icon/label.svg?inline';
//
// console.log(y);
// console.log(x);
export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>//添加了scoped之后vue会自动给class加随机数,这样可以使用很简单的属性名而不跟其他属性冲突
.nav {
  border: 1px solid red;
}

</style>