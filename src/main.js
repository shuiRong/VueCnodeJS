// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Icon from 'vue-svg-icon/Icon';
import ElementUI from 'element-ui';
import axios from 'axios';
import App from './App';
import router from './router';

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
