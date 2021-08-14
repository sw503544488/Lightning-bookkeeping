import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
// import Home from '../views/Home.vue';
import Money from '@/components/Money.vue';
import Labels from '@/components/Labels.vue';
import Statistics from '@/components/Statistics.vue';
import Notfound from '@/components/Notfound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/', //首页
        redirect: 'money'
    },
    {
        path: '/money',
        component: Money
    }, {
        path: '/labels', component: Labels
    },
    {
        path: '/statistics',
        component: Statistics
    }, {
        path: '*',
        component: Notfound //404页面,从上到下,如果没有寻找到匹配页面就直接跳转到这个页面
    }
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    routes
});

export default router;
