import formDialog from './src'
formDialog.install = function (Vue) {
  Vue.component(Vue.name, formDialog)
}
export const formDialog = formDialog
export default formDialog
