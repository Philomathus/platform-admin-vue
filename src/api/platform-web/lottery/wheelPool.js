import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询wheel pool 列表 - > wheel pool list api
export function listWheelPool(query) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/list',
    method: 'get',
    params: query
  })
}

// wheel pool 通过 id 获取 get by id api
export function getWheelPool(id) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/' + id,
    method: 'get'
  })
}

// 更新 update wheel pool api
export function updateWheelPool(data) {
  return request({
    url: url.platformWeb + '/admin/wheelPool/edit',
    method: 'put',
    data: data
  })
}
