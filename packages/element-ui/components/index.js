import FCRFormDialog from './form-dialog'
const components = [FCRFormDialog]
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}
export default {
  version: '1.0',
  install,
  FCRFormDialog,
}
