import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import '@/js/html.js'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/common.scss' // common css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import '@/utils/directives' // 弹窗拖拽

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from '@/api/platform-web/system/dict/data'
import { getConfigKey } from '@/api/platform-web/system/config'
import {
  resetForm,
  selectDictLabel,
  selectDictLabels,
  download,
  handleTree,
  copyCommand
} from '@/utils/common'
import {
  parseTime,
  getTodayStartTime,
  getTodayEndTime,
  getDateStartTime,
  getDateEndTime,
  addDateRange
} from '@/utils/dateUtils'
import Pagination from '@/components/Pagination'
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'
// 引入 vue-ele-form
import EleForm from 'vue-ele-form'
import * as numberUtil from '@/utils/number.js'

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey

Vue.prototype.resetForm = resetForm
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.copyCommand = copyCommand

Vue.prototype.parseTime = parseTime
Vue.prototype.getTodayStartTime = getTodayStartTime
Vue.prototype.getTodayEndTime = getTodayEndTime
Vue.prototype.getDateStartTime = getDateStartTime
Vue.prototype.getDateEndTime = getDateEndTime
Vue.prototype.addDateRange = addDateRange

Vue.prototype.numberUtil = numberUtil

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgWarning = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'warning' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
// 注册 vue-ele-form
Vue.use(EleForm)
Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

window.vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
