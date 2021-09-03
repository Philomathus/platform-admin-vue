import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询推广图
export function listRecommonPic(query) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/listRecommonPic',
    method: 'get',
    params: query
  })
}

// 查询推广图
export function getRecommonPic(id) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/getRecommonPic/' + id,
    method: 'get'
  })
}

// 修改推广图
export function updateRecommonPic(data) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/updateRecommonPic',
    method: 'put',
    data: data
  })
}
