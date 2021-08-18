// import recordListModel from '@/models/recordListModel';
// //record store
//
// export default {
//   recordList: recordListModel.fetch(),
//
//   createRecrod: (record: RecordItem) => {
//     return recordListModel.create(record);
//   },
//
// };
import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';
const recordStore = {
    recordList: [],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.recordList;
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record) {
        const record2 = clone(record);
        record2.createdAt = new Date();
        this.recordList && this.recordList.push(record2);
        recordStore.saveRecords();
    },
};
recordStore.fetchRecords();
export default recordStore;
//# sourceMappingURL=recordStore.js.map