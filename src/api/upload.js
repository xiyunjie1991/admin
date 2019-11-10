import request from '@/utils/request'
const url =  process.env.FILE_API
export function uploadImage(data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
