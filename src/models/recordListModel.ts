import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.data.push(record2);
    console.log(this.data);
    return this.data;
  }
  ,
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem;

  },
  save(data: RecordItem[]) {
    return window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },


};

export default recordListModel;

