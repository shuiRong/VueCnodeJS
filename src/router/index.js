import Vue from 'vue';
import Router from 'vue-router';

import ArticleCom from '@/components/ArticleCom';
import MainSec from '@/components/MainSec';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootPath',
        component: MainSec,
    }, {
        path: '/topic/:id',
        name: 'ArticleRoute',
        component: ArticleCom,
    }],
});
