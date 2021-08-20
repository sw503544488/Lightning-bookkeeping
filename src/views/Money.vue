<template>
  <Layout classPrefix="money">
    <NumberPad @submit="saveRecord" :value.sync="record.amount"/>

    <div class="notesWrapper">
      <Notes @update:value="onUpdateNotes"
             :field-name="'备注'"
             placeholder="请输入备注"
      />
    </div>
    <Tags :data-source.sync="tags" @update:selected="onUpdateTags"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import oldStore from '@/store/index2';
import store from '@/store/index.ts';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);


@Component({
  components: {
    Tabs,
    Tags, Notes, NumberPad
  },
  computed: {
    recordList() {
      return store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  tags = oldStore.fetchTags();
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [''], notes: '', type: '-', amount: 0
  };
  recordTypeList = recordTypeList;

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
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
