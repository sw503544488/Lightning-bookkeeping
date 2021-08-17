import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  //record store
  recordList: recordListModel.fetch(),

  createRecrod: (record: RecordItem) => {
    return recordListModel.create(record);
  },

  //tag store
  tagList: () => {
    return tagListModel.fetch();
  },
  findTag(id: string) {

    return this.tagList().filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复');
    }
    if (message === 'number') {
      window.alert('单数字不能作为标签名');
    } else if (message === 'success') {
      window.alert('标签添加成功');
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
};
export default store;