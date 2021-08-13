import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
new Vue({
    router, //渲染的时候需要将router传给渲染器
    store,
    render: h => h(App)
}).$mount('#app');
