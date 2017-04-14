import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'rootPath',
        component: App,
    }],
});
