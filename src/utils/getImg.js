
function getImg(url, size) {
  return process.env.FILE_ACTION + url + '?x-oss-process=image/resize,w_' + size.toString()
}

export default {
  install: function(Vue) {
    Vue.prototype.getImg = (url, size) => getImg(url, size)
  }
}
