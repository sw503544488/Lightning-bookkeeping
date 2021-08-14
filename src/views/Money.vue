<template>
  <Layout classPrefix="money">

    <NumberPad/>

    <Types/>
    <Notes/>

    <Tags/>

  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

export default {
  name: 'Money',
  components: {Tags, Notes, Types, NumberPad},
};
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse;//从下面开始布局,最上面的界面就可以占据最大空间
}
</style>
