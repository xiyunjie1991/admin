import request from '@/utils/request'
const url = process.env.BASE_API

export function FindUsers(data) {
  return request({
    url: url + '/admin/Account/FindUsers',
    method: 'post',
    data
  })
}

export function GetUserInfo(id) {
  return request({
    url: url + '/admin/Account/GetUserInfo',
    method: 'post',
    data:{
      id
    }
  })
}

export function RemoveUser(user_id) {
  return request({
    url: url + '/admin/User/RemoveUser',
    method: 'post',
    data:{
      user_id
    }
  })
}
