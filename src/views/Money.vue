<template>
  <Layout classPrefix="money">
    <NumberPad @submit="saveRecord" :value.sync="record.amount"/>

    <Types :value.sync="record.type"
    />
    <div class="notesWrapper">
      <Notes @update:value="onUpdateNotes"
             :field-name="'备注'"
             placeholder="请输入备注"
      />
      <!--      :watch-record-list="recordList"-->


    </div>

    <Tags :data-source.sync="tags" @update:selected="onUpdateTags"/>
    {{ record }}

  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index2';
// eslint-disable-next-line no-undef

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);


// const recordList = store.recordList;

@Component({
  components: {
    Tags, Notes, Types, NumberPad
  }
})
export default class Money extends Vue {
  tags = store.tagList();
  // eslint-disable-next-line no-undef
  // recordList = window.recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [''], notes: '', type: '-', amount: 0

  };


  public beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.updateThisTags();
    });
  }

  updateThisTags() {
    // tagListModel.fetch()
    this.tags = store.tagList();
  }

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    store.createRecrod(this.record);
  }
}
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse; //从下面开始布局,最上面的界面就可以占据最大空间
}

.notesWrapper {
  padding: 12px 0;
}
</style>
