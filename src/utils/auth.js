import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export default function setTitle(title) {
  document.title = title; const userAgent = window.navigator.userAgent.toLowerCase()
  const isiOS = userAgent.indexOf('applewebkit') >= 0
  const isWechat = userAgent.indexOf('micromessenger') >= 0
  if (isiOS && isWechat) {
    const iframe = document.createElement('iframe')
    iframe.src = 'https://www.baidu.com/favicon.ico'; iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.onload = function() { setTimeout(function() { iframe.remove() }, 0) }
  }
}

/*
 * 获取浏览器版本信息
 */
export function getBrowerInfo() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  let browserType = ''
  let browserVersion = ''
  const isIE = userAgent.match(/msie/) != null || userAgent.match(/trident/) != null
  // 浏览器类型-IE
  if (userAgent.match(/msie/) != null || userAgent.match(/trident/) != null) {
    browserType = 'IE'
    browserVersion = this.getIeVersion()
  }
  // 欧朋
  else if (window.opera || (userAgent.indexOf('opr') > 0)) {
    browserType = '欧朋'
    browserVersion = this.getOperaVersion(userAgent)
  }
  // UC
  else if (userAgent.indexOf('ubrowser') > 0) {
    browserType = 'UC'
    browserVersion = userAgent.match(/ubrowser\/([\d.]+)/)[1]
  }
  // 百度
  else if (userAgent.indexOf('bidubrowser') > 0) {
    browserType = '百度'
    browserVersion = userAgent.match(/bidubrowser\/([\d.]+)/)[1]
  }
  // 搜狗
  else if (userAgent.indexOf('metasr') > 0 || userAgent.indexOf('se 2.x') > 0) {
    browserType = '搜狗'
    // browserVersion =  userAgent.match(/metasr\/([\d.]+)/)[1]
  }
  // QQ
  else if (userAgent.indexOf('tencenttraveler') > 0) {
    browserType = 'QQ'
    browserVersion = userAgent.match(/tencenttraveler\/([\d.]+)/)[1]
  }
  // QQ
  else if (userAgent.indexOf('qqbrowser') > 0) {
    browserType = 'QQ'
    browserVersion = userAgent.match(/qqbrowser\/([\d.]+)/)[1]
  }
  // 遨游
  else if (userAgent.indexOf('maxthon') > 0) {
    browserType = '遨游'
    browserVersion = userAgent.match(/maxthon\/([\d.]+)/)[1]
  }
  // 火狐
  else if (userAgent.indexOf('firefox') > 0) {
    browserType = '火狐'
    browserVersion = userAgent.match(/firefox\/([\d.]+)/)[1]
  }
  // edge
  else if (userAgent.indexOf('edge') > 0) {
    browserType = 'Edge'
    browserVersion = userAgent.match(/edge\/([\d.]+)/)[1]
  }
  // 谷歌/360
  else if (userAgent.indexOf('chrome') > 0) {
    if (this.validate360('type', 'application/x360mmplugin')) {
      browserType = '360'
      // browserVersion =  userAgent.match(/chrome\/([\d.]+)/)[1]
    } else {
      browserType = '谷歌'
      browserVersion = userAgent.match(/chrome\/([\d.]+)/)[1]
    }
  }
  // 苹果
  else if (userAgent.indexOf('Safari') > -1) {
    browserType = 'Safari'
    browserVersion = userAgent.match(/version\/([\d.]+)/)[1]
  }
  return browserType + ' ' + browserVersion
}
