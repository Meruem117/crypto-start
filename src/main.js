import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CryptoJS from 'crypto-js';
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(CryptoJS)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
