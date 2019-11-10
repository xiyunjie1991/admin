import request from '@/utils/request'
const url = process.env.BASE_API

export function loginAccount(data) {
  return request({
    url: url + '/account/Account/Login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/acount/Account/GetAccount',
    method: 'get',
    params: { token }
  })
}

