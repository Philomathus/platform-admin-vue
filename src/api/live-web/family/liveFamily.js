import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询家族列表
export function listLiveFamily(query) {
  return request({
    url: url.platformWeb + '/admin/liveFamily/list',
    method: 'get',
    params: query
  })
}

// 查询家族详细
export function getLiveFamily(id) {
  return request({
    url: url.platformWeb + '/admin/liveFamily/' + id,
    method: 'get'
  })
}

// 新增家族
export function addLiveFamily(data) {
  return request({
    url: url.platformWeb + '/admin/liveFamily',
    method: 'post',
    data: data
  })
}

// 修改家族
export function updateLiveFamily(data) {
  return request({
    url: url.platformWeb + '/admin/liveFamily',
    method: 'put',
    data: data
  })
}

// 删除家族
export function delLiveFamily(id) {
  return request({
    url: url.platformWeb + '/admin/liveFamily/' + id,
    method: 'delete'
  })
}

// 导出家族
export function exportLiveFamily(query) {
  return request({
    url: url.platformWeb + '/admin/liveFamily/export',
    method: 'get',
    params: query
  })
}
