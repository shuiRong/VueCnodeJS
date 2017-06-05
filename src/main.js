import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Icon from 'vue-svg-icon/Icon.vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.component('icon', Icon)

new Vue({
  el: '#app',
  router,
  template:'<App/>',
  render: h => h(App)
})
