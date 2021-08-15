const localStorageKeyName = 'recordList';
const model = {
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
export default model;
//# sourceMappingURL=model.js.map