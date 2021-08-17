<template>
  <Layout>
    <div class="navBar">
      <router-link to="/labels">
        <Icon class="leftIcon" name="left"/>
      </router-link>
      <span class="title">编辑标签      </span>
      <span class="rightIcon"></span>

    </div>
    <div class="formWrapper">
      <Notes :field-name="'标签名'" :placeholder="'请输入标签名'" :value="``"/>

    </div>
    <div class="button-wrapper">

      <Button class="button" button-style="background:#d75654">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import Notes from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes}
})
export default class EditLabel extends Vue {
  tag=undefined
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0]; //filter返回一个数组,选取第0个
    if (tag) {
      return;
    } else {
      this.$router.replace('/404');
    }

  }
}

</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  background: white;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  .leftIcon {
    width: 24px;
    height: 24px;
  }

  .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.button {
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

.formWrapper {
  margin-top: 8px;
  background: white;
}
</style>