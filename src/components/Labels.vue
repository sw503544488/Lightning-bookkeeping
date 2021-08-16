<template>
  <Layout>
    <ol class="tagList">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"></Icon>
      </li>

    </ol>
    <div class="createTag-wraaper">
      <button class="createTag" @click="createTag">
        新建标签
      </button>
    </div>

  </Layout>


</template>

<script lang='ts'>


import Vue from 'vue';
import {Component} from 'vue-property-decorator';
// eslint-disable-next-line no-undef
import tagListModel from '@/models/tagListModel';




tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.fetch();

  createTag() {
    const name = window.prompt('请输入标签名字');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复');
      }
      if (message === 'number') {
        window.alert('单数字不能作为标签名');
      } else if (message === 'success') {
        window.alert('标签添加成功');
      }

    }
  }


}


</script>

<style lang="scss" scoped>
.tagList {
  background: white;
  font-size: 16px;

  > li {
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

.createTag {
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