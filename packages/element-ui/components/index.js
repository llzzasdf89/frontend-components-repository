import FCRFormDialog from './form-dialog'
import imgUploader from './img-uploader'
const components = [FCRFormDialog, imgUploader]
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
