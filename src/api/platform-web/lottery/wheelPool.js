import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listWheelPool(query) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getWheelPool(id) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/' + id,
    method: 'get'
  })
}

// 修改【请填写功能名称】
export function updateWheelPool(data) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/edit',
    method: 'put',
    data: data
  })
}
