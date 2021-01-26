import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询活动信息列表
export function listActivityInfo(query) {
  return request({
    url: url.platformWeb + '/admin/activityInfo/list',
    method: 'get',
    params: query
  })
}

// 查询活动信息详细
export function getActivityInfo(id) {
  return request({
    url: url.platformWeb + '/admin/activityInfo/' + id,
    method: 'get'
  })
}

// 新增活动信息
export function addActivityInfo(data) {
  return request({
    url: url.platformWeb + '/admin/activityInfo',
    method: 'post',
    data: data
  })
}

// 修改活动信息
export function updateActivityInfo(data) {
  return request({
    url: url.platformWeb + '/admin/activityInfo',
    method: 'put',
    data: data
  })
}

// 删除活动信息
export function delActivityInfo(id) {
  return request({
    url: url.platformWeb + '/admin/activityInfo/' + id,
    method: 'delete'
  })
}

// 导出活动信息
export function exportActivityInfo(query) {
  return request({
    url: url.platformWeb + '/admin/activityInfo/export',
    method: 'get',
    params: query
  })
}
