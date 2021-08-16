<template>
  <Layout classPrefix="money">
    <NumberPad @submit="saveRecord" :value.sync="record.amount"/>

    <Types :value.sync="record.type"
    />
    <Notes @update:value="onUpdateNotes"/>

    <Tags :data-source.sync="tags" @update:selected="onUpdateTags"/>
    {{ record }}

  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '../models/recordListModel';
import tagListModel from '@/models/tagListModel';
// eslint-disable-next-line no-undef

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {
    Tags, Notes, Types, NumberPad
  }
})
export default class Money extends Vue {
  tags = tagList;
  // eslint-disable-next-line no-undef
  recordList: RecordItem[] = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: ['衣服'], notes: '', type: '-', amount: 0,

  };


  // eslint-disable-next-line no-undef

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    // eslint-disable-next-line no-undef
    const record2: RecordItem = recordListModel.clone(this.record);

    record2.createdAt = new Date();
    // record2.createdAt.toTimeString();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onRecordListChange() {
    recordListModel.save(this.recordList);
    // window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  @Watch('$route')
  routechange(to: any, from: any) {
    console.log(to, from);
  }

}
</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse; //从下面开始布局,最上面的界面就可以占据最大空间
}
</style>
