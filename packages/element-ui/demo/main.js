import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
})
Vue.use(ElementUI)
