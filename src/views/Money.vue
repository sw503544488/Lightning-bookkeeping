<template>
  <Layout classPrefix="money">
    <NumberPad @submit="saveRecordAll" :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <div class="notesWrapper">
      <Notes @update:value="onUpdateNotes"
             :field-name="'备注'"
             placeholder="请输入备注"
      />
    </div>
    <Tags :data-source.sync="tags" @update:selected="onUpdateTags"/>

  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import oldStore from '@/store/index2';
import store from '@/store/index.ts';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);


@Component({
  components: {
    Tags, Notes, Types, NumberPad
  },
  computed: {
    count() {
      return store.state.count;
    }
  }
})
export default class Money extends Vue {
  tags = oldStore.fetchTags();
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [''], notes: '', type: '-', amount: 0
  };


  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  saveRecordAll() {
    oldStore.createRecord(this.record);
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
