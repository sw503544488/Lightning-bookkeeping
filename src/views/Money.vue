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

type Record = {
  tags: string[],
  notes: string,
  type: string,
  amount: number
}


@Component({
  components: {
    Tags, Notes, Types, NumberPad
  }
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '彩票'];
  record: Record = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  };
  recordList: Record[] = [];

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecord() {
    const record2 = JSON.parse(JSON.stringify(this.record));

    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {


    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}


</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse; //从下面开始布局,最上面的界面就可以占据最大空间
}
</style>
