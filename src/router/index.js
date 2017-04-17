import Vue from 'vue';
import Router from 'vue-router';

import ArticleCom from '@/components/ArticleCom';
import UserCom from '@/components/UserCom';
import MainSec from '@/components/MainSec';
import SideSec from '@/components/SideSec';
import AboutCom from '@/components/AboutCom';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'RootPath',
        components: {
            main: MainSec,
        },
    }, {
        path: '/topic/:id',
        name: 'ArticleRoute',
        components: {
            main: ArticleCom,
            side: SideSec,
        },
    }, {
        path: '/user/:name',
        name: 'UserRoute',
        components: {
            main: UserCom,
        },
    }, {
        path: '/user/:name',
        redirect: '/user:name',
    }, {
        path: '/about',
        name: 'AboutRoute',
        components: {
            main: AboutCom,
        },
    }],
});
