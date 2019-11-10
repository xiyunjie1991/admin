import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import msgUtil from '@/utils/msgUtil'
import router from '@/router/index'

// create an axios instance
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['X-Source'] = '1d58f014-3903-484e-99be-3948126f9da9'
    config.headers['X-Version'] = '0.2.0'
    config.headers['X-Device'] = 'fireFox'
    config.headers['Content-Type'] = 'application/json'
    const token = getToken()

    if (token) {
      config.headers['X-Authorization'] = token
    } else {
      config.headers['X-Authorization'] = ''
    }
    return config
  },
  error => {
    // Do something with request error
    console.info('request error', error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.status === -3) {
      msgUtil.warning('登陆过期')
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }

    return response
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
