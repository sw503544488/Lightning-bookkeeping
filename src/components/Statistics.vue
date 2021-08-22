<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <ECharts class="xxx" :options="x"/>
    <div>

    </div>
    <ol v-if="groupedList.length>0">
      <li class="li" v-for="group in groupedList" :key="group.title">
        <h3 class="title">{{ beautify(group.title) }}<span>￥{{ group.total }}</span></h3>
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
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';

// import ECharts from 'vue-echarts';

// Vue.component('v-chart', VueECharts);

const ECharts: any = require('vue-echarts').default;
console.log('EChart');
console.log(ECharts);

@Component({
  components: {Tabs, ECharts}
})
export default class Statistics extends Vue {


  get x() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }
    return {
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [
        {
          coordinateSystem: 'polar',
          name: 'line',
          type: 'line',
          showSymbol: false,
          data: data
        }
      ],
      animationDuration: 2000
    };
  }


  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}

    // eslint-disable-next-line no-undef
    const filterList = clone(recordList).filter((r: RecordItem) => r.type === this.type);
    if (filterList.length === 0) {return []; }
    // eslint-disable-next-line no-undef
    const newList = filterList.sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    // eslint-disable-next-line no-undef
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [
      {title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), total: 0, items: [newList[0]]}
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result [result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.forEach(group => {
          group.total = group.items.reduce((sum, items) => sum + (items.amount - 1 + 1), 0);
        }
    )
    ;


    return result;
  }

  beautify(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
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
.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep .type-tabs-item {
  background: darken(#c4c4c4, 15%);

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }

  }
}

::v-deep .tabs {
  position: relative;

  .tabs-item {
    position: sticky;
    top: 0;
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

.li {
  position: relative;
}

.title {
  @extend %item;
  position: sticky;
  top: 0;
  background: #f5f5f5;

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

.echarts {
  width: 100%;
  height: 100%;
}

::v-deep .xxx {
  width: 100%;
  height: 100%;
}
</style>


