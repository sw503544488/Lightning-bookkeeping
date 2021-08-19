<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>

    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <div>
      type:{{ type }}
      <br/>
      interval:{{ interval }}
    </div>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <hr>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ item.tags[0].name }}</span>
            <span class="notes" :style="{marginRight:'auto'}">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {

  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const {recordList} = this;
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string, items: RecordItem[] }
    // eslint-disable-next-line no-undef
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt?.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      // console.log(hashTable[date]);
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;

  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  typeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords');
    // console.log(this.recordList);
  }
}
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: darken(#c4c4c4, 15%);

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }

  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999999;
}
</style>


