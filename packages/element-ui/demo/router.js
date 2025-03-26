import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: () => import('./Home.vue'),
  },
  {
    path: '/demo-form-table-dialog',
    name: 'demo-form-table-dialog',
    component: () => import('./demo-form-dialog.vue'),
  },
]
export default new VueRouter({
  routes,
})
