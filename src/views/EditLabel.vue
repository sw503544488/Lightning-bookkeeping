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
      <Notes :field-name="'标签名'"
             :value="currentTag.name"

             :placeholder="'请输入标签名'"
             @update:value="updateTag"
      />

    </div>
    <div class="button-wrapper">

      <Button class="button" button-style="background:#d75654"
              @click.native="remove"
      >删除标签
      </Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes},
  computed: {}
})
export default class EditLabel extends Vue {

  get currentTag() {
    return this.$store.state.currentTag;
  }

  set currentTag(val) {
    return;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);


    if (!this.currentTag) {
      this.$router.replace('/404');
    }

  }

  updateTag(name: string) {
    if (this.currentTag) {
      // store.updateTag(this.tag.id, name);
      this.$store.commit('updateTag', {id: this.currentTag.id, name: name});
    }

  }

  remove() {
    if (this.currentTag) {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
        this.$router.replace('/labels');

      } else {
        window.alert('删除失败');
      }
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