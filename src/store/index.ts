import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const localStorageKeyNameRecord = 'recordList';
const localStorageKeyNameTag = 'tagList';
const store = new Vuex.Store({
  state: {              //data
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {//methods
    createRecord(state, record) {

      const record2: RecordItem = clone(record);
      record2.createdAt =record2.createdAt|| new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');

    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageKeyNameRecord, JSON.stringify(state.recordList));
      if (store.state.createRecordError === null) {
        window.alert('已保存');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyNameRecord) || '[]') as RecordItem[];

    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyNameTag) || '[]');
      if ((!state.tagList) || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');

      }
    },

    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];

    },
    createTag(state, name) {


      if (name) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
          return;
        }
        const id = createId().toString();
        state.tagList.push({id, name: name});
        store.commit('saveTags');
        store.commit('fetchTags');


      }

    },
    saveTags(state) {
      window.localStorage.setItem(localStorageKeyNameTag, JSON.stringify(state.tagList));
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < store.state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    },
    updateTag(state, object: { id: string, name: string }) {
      const {id, name} = object;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);

        names.splice(idList.indexOf(id), 1);

        if (names.indexOf(name) >= 0) {
          return 'duplicated';
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    }
  },
  // actions: {},
  // modules: {}
});
export default store;