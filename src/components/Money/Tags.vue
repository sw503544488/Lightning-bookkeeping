<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList1" :key="tag.id"
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

import store from '@/store/index2';

@Component({
      computed: {
        tagList() {
          return this.$store.state.tagList;
        }
      }
    }
)
export default class Tags extends Vue {
  @Prop(Array) readonly dataSource?: string[] | undefined;
  selectedTags: string[] = [];
  tagList1 = store.fetchTags();

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
    this.$store.commit('fetchTags');
    this.tagList1 = this.$store.state.tagList;
  }

  createTag() {
    const name = window.prompt('请输入标签名字');
    this.$store.commit('createTag', name);
    store.fetchTags();

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
      $h: 24px;
      background: $bg;
      height: $h;
      line-height: $h;
      border-radius: 12px;
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