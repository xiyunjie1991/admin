import request from '@/utils/request'
const url = process.env.BASE_API
export function FindGoods(query, page, pageSize, tingType) {
  return request({
    url: url + '/goods/getGoods',
    method: 'post',
    data: {
      query,
      page,
      pageSize,
      tingType
    }
  })
}

export function getGoodByQuery(data) {
  return request({
    url: url + '/goods/getGoodByQuery',
    method: 'post',
    data
  })
}

export function getBigType() {
  return request({
    url: url + '/goods/getBigType',
    method: 'post',
    data: {}
  })
}

export function getMiniType() {
  return request({
    url: url + '/goods/getMiniType',
    method: 'post',
    data: {}
  })
}

export function getTinyType() {
  return request({
    url: url + '/goods/getTinyType',
    method: 'post',
    data: {}
  })
}

export function updateGoods(data) {
  return request({
    url: url + '/goods/updateGoods',
    method: 'post',
    data
  })
}

export function selectByPrimaryKey(id) {
  return request({
    url: url + '/goods/selectByPrimaryKey',
    method: 'get',
    params: { id: id }
  })
}

