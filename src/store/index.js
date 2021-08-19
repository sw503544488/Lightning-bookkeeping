import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
Vue.use(Vuex);
const localStorageKeyNameRecord = 'recordList';
const localStorageKeyNameTag = 'tagList';
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    },
    mutations: {
        createRecord(state, record) {
            const record2 = clone(record);
            record2.createdAt = new Date().toISOString();
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem(localStorageKeyNameRecord, JSON.stringify(state.recordList));
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyNameRecord) || '[]');
        },
        fetchTags(state) {
            return state.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyNameTag) || '[]');
        },
        setCurrentTag(state, id) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        createTag(state) {
            const name = window.prompt('请输入标签名字');
            if (name) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                }
                const id = createId().toString();
                state.tagList.push({ id, name: name });
                store.commit('saveTags');
                store.commit('fetchTags');
                window.alert('添加成功');
            }
        },
        saveTags(state) {
            window.localStorage.setItem(localStorageKeyNameTag, JSON.stringify(state.tagList));
        },
        removeTag(state, id) {
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
        updateTag(state, object) {
            const { id, name } = object;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                names.splice(idList.indexOf(id), 1);
                if (names.indexOf(name) >= 0) {
                    console.log('hi');
                    return 'duplicated';
                }
                else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        }
    },
});
export default store;
//# sourceMappingURL=index.js.map