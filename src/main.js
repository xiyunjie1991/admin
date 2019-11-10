import Vue from 'vue'
import $ from 'jquery'
window.$ = $
window.jQuery = $
export default $
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import VueDND from 'awe-dnd'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'vue-croppa/dist/vue-croppa.css'
import Croppa from 'vue-croppa'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import Viewer from 'v-viewer'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VueClipboard from 'vue-clipboard2'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'viewerjs/dist/viewer.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'font-awesome/css/font-awesome.css'
import 'froala-editor/css/froala_style.min.css'
import './styles/myStyle.css'
require('froala-editor/js/languages/zh_cn')
import VueFroala from 'vue-froala-wysiwyg'
import CKEditor from '@ckeditor/ckeditor5-vue'
import getImg from './utils/getImg'

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueDND)
Vue.use(CKEditor)
Vue.use(Croppa)
Vue.use(Viewer)
Vue.use(getImg)
Vue.use(VueFroala)
Vue.use(VueClipboard)
Vue.use(preview)
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})
Vue.config.errorHandler = function(err, vm, info) {
  console.info('vue error info', info)
  console.info('vue error err', err)
  console.info('vue error vm', vm)
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}

new Vue({
  el: '#app',
  router,
  store,
  getImg,
  render: h => h(App)
})
