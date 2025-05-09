import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
import FCR from '../dist/FCR-components.mjs'
import '../dist/FCR-components.css'
Vue.use(ElementUI)
Vue.use(FCR)
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
})
