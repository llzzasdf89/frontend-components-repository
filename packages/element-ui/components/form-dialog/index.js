import FormDialog from './src/index.vue'
FormDialog.install = function (Vue) {
  Vue.component(FormDialog.name, FormDialog)
}
export const FCRFormDialog = FormDialog
export default FCRFormDialog
