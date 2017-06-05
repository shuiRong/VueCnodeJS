import Vue from 'vue';
import Router from 'vue-router';

const MainSec = resolve => require(['@/components/MainSec.vue'], resolve);
const UserCom = resolve => require(['@/components/UserCom.vue'], resolve);
const ArticleCom = resolve => require(['@/components/ArticleCom.vue'], resolve);
const SideSec = resolve => require(['@/components/SideSec.vue'], resolve);

// import MainSec from '@/components/MainSec'
// import UserCom from '@/components/UserCom'
// import ArticleCom from '@/components/ArticleCom'
// import SideSec from '@/components/SideSec'

Vue.use(Router)

export default new Router({
    // mode: 'history', 这个模式在生成的dist文件打开有问题
    routes : [
        {
            path : '/',
            name:'RootPath',
            components:{
                main:MainSec
            }
        },
        {
            path:'/user/:name',
            name: 'UserRoute',
            components :{
                main:UserCom
            }

        },
        {
            path:'/topic/:topic',
            name: 'ArticleRoute',
            components :{
                main:ArticleCom,
                side:SideSec
            }

        }
    ]
})
