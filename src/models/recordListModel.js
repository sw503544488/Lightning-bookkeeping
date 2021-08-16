const localStorageKeyName = 'recordList';
const recordListModel = {
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    },
    save(data) {
        return window.localStorage.setItem('recordList', JSON.stringify(data));
    },
    clone(data) {
        return JSON.parse(JSON.stringify(data));
    }
};
export default recordListModel;
//# sourceMappingURL=recordListModel.js.map