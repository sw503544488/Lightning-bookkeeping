const localStorageKeyName = 'tagList';
const tagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name) {
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        }
        if ('0123456789'.indexOf(name) >= 0) {
            return 'number';
        }
        this.data.push(name);
        this.save();
        return 'success';
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default tagListModel;
//# sourceMappingURL=tagListModel.js.map