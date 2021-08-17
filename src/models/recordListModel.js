import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';
const recordListModel = {
    data: [],
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    },
    create(record) {
        const record2 = clone(record);
        record2.createdAt = new Date();
        this.data.push(record2);
        console.log(this.data);
        return this.data;
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    },
    save(data) {
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    },
};
export default recordListModel;
//# sourceMappingURL=recordListModel.js.map