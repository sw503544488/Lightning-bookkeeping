import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import icon from '@/components/Icon.vue';
Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', icon);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 100);
    }, 0);
};
//# sourceMappingURL=main.js.map