<template>
  <Layout classPrefix="money">
    <NumberPad @update:value="onUpdateAmount"/>

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
import {Component} from 'vue-property-decorator';

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

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
    console.log(this.record);
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  // onUpdateTypes(type: string) {
  //   this.record.type = type;
  // }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
}

</script>

<style lang="scss">
.money-content {
  display: flex;
  flex-direction: column-reverse; //从下面开始布局,最上面的界面就可以占据最大空间
}
</style>
