import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
Vue.use(Vuex);
const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
    state: {
        recordList: [],
    },
    mutations: {
        createRecord(state, record) {
            const record2 = clone(record);
            record2.createdAt = new Date();
            console.log(record2);
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.recordList));
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        },
    },
});
export default store;
//# sourceMappingURL=index.js.map