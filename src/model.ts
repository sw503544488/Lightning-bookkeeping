const localStorageKeyName = 'recordList';
const model = {
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem;

    },
    save(data: RecordItem[] |RecordItem) {
        return window.localStorage.setItem('recordList', JSON.stringify(data));

    },
    clone(data:RecordItem[]){
        return JSON.parse(JSON.stringify(data))
    }
};
export default model;