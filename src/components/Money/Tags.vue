<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >{{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource?: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags = [tag];
    }
    this.$emit('update:selected', this.selectedTags);
  }
  created() {
    const li: any = document.querySelectorAll('li')[0];

  }

  creat() {
    const name = window.prompt('请输入标签名字');
    if (name === '') {
      window.alert('标签名不能为空');
    } else {
      if (this.dataSource) {
        this.$emit('update:dataSource', [...this.dataSource, {id: name, name: name}]);
      }
    }

  }

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
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 15%);
        color: white;
      }

    }

  }


  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>