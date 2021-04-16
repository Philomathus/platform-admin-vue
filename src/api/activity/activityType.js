import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询活动类型列表
export function listActivityType(query) {
  return request({
    url: url.platformWeb + '/admin/activityType/list',
    method: 'get',
    params: query
  })
}

// 查询活动类型详细
export function getActivityType(id) {
  return request({
    url: url.platformWeb + '/admin/activityType/' + id,
    method: 'get'
  })
}

// 新增活动类型
export function addActivityType(data) {
  return request({
    url: url.platformWeb + '/admin/activityType',
    method: 'post',
    data: data
  })
}

// 修改活动类型
export function updateActivityType(data) {
  return request({
    url: url.platformWeb + '/admin/activityType',
    method: 'put',
    data: data
  })
}

// 删除活动类型
export function delActivityType(id) {
  return request({
    url: url.platformWeb + '/admin/activityType/' + id,
    method: 'delete'
  })
}

// 导出活动类型
export function exportActivityType(query) {
  return request({
    url: url.platformWeb + '/admin/activityType/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
