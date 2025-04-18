import FCRImageUploader from './src/index.vue'
FCRImageUploader.install = function (Vue) {
  Vue.component(FCRImageUploader.name, FCRImageUploader)
}
export default FCRImageUploader
