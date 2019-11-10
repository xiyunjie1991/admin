import Vue from 'vue'
const msgUtil = {

}
msgUtil.warning = function(msg) {
  Vue.prototype.$message({
    message: msg,
    type: 'warning'
  })
}
msgUtil.show = function(msg) {
  Vue.prototype.$message({
    message: msg,
    type: 'success'
  })
}

msgUtil.nitifySuccess = function(msg) {
  Vue.prototype.$notify({
    message: msg,
    type: 'success'
  })
}

msgUtil.nitifyWarning = function(msg) {
  Vue.prototype.$notify({
    message: msg,
    type: 'warning'
  })
}


export default msgUtil
