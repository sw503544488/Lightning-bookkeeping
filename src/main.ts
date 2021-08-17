import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', icon);
//record store
window.recordList = recordListModel.fetch();

window.createRecrod = (record: RecordItem) => {
  return recordListModel.create(record);
};

//tag store
window.tagList = () => {
  return tagListModel.fetch();
};
window.findTag = (id: string) => {

  return window.tagList().filter(t => t.id === id)[0];
};
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === 'duplicated') {
    window.alert('标签名重复');
  }
  if (message === 'number') {
    window.alert('单数字不能作为标签名');
  } else if (message === 'success') {
    window.alert('标签添加成功');
  }
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};
new Vue({
  router, //渲染的时候需要将router传给渲染器
  store,
  render: h => h(App)
}).$mount('#app');
