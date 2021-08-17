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
        this.save();
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
};
export default recordListModel;
//# sourceMappingURL=recordListModel.js.map