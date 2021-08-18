import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
const localStorageKeyNameRecord = 'recordList';
const localStorageKeyNameTag = 'tagList';
const store = new Vuex.Store({
  state: {              //data
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },

  mutations: {//methods
    createRecord(state, record) {

      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      console.log(record2);
      state.recordList.push(record2);
      store.commit('saveRecords');

    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageKeyNameRecord,
        JSON.stringify(state.recordList));
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyNameRecord) || '[]') as RecordItem[];

    },
    fetchTags(state) {

      return state.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyNameTag) || '[]');
    },
    // findTag(id: string) {
    //   return store.state.tagList.filter(t => t.id === id)[0];
    // },
    createTag(state) {
      const name = window.prompt('请输入标签名字');
      if (name) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
          return 'duplicated';
        }
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTags');
        store.commit('fetchTags');
        console.log(store.state.tagList);
        window.alert('添加成功');
        return 'success';
        // this.tagList1 = store.fetchTags();


      }

    },
    saveTags(state) {
      window.localStorage.setItem(localStorageKeyNameTag, JSON.stringify(state.tagList));
    },
    //  removeTag(state) {
    //    let index = -1;
    //    for (let i = 0; i < this.tagList.length; i++) {
    //      if (state.tagList[i].id === id) {
    //        index = i;
    //        break;
    //      }
    //    }
    // state.tagList.splice(index, 1);
    //    store.commit('saveTags')
    //    return true;
    //  },
    // updateTag(id: string, name: string) {
    //   const idList = this.tagList.map(item => item.id);
    //   if (idList.indexOf(id) >= 0) {
    //     const names = this.tagList.map(item => item.name);
    //     if (names.indexOf(name) >= 0) {
    //       return 'duplicated';
    //     } else {
    //       const tag = this.tagList.filter(item => item.id === id)[0];
    //       tag.name = name;
    //       this.saveTags();
    //       return 'success';
    //     }
    //   } else {
    //     return 'not found';
    //   }
    // }
  },
  // actions: {},
  // modules: {}
});
export default store;