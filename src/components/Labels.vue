<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">

        <span>{{ tag.name }}</span>
        <Icon name="right"></Icon>
      </router-link>

    </div>
    <div class="button-wraaper">

      <Button @click.native="createTag" class="button">新增标签</Button>
    </div>

  </Layout>


</template>

<script lang='ts'>


import Vue from 'vue';
import {Component} from 'vue-property-decorator';
// eslint-disable-next-line no-undef
import Tags from '@/components/Money/Tags.vue';
import Button from '@/components/Button.vue';


Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
@Component({
  components: {Button, Tags},
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends Vue {
  // tags = store2.fetchTags();

  createTag() {
    const name = window.prompt('请输入标签名字');
    if (!name) {return;}
    this.$store.commit('createTag', name);
    this.$store.commit('fetchTags');
    window.alert('添加成功');

  }

  created() {
    this.$store.commit('fetchTags');
  }

}


</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #666666;
      margin-right: 16px;
      width: 18px;
      height: 18px;
    }
  }
}

.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wraaper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

</style>