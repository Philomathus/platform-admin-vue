import request from '@/utils/request'
import {url} from '@/utils/url'

export function listActivityInfo(query) {
  return request({
    url: url.platformWeb + '/activity/userActivity/list',
    method: 'get',
    params: query
  })
}

export function userActivityById(id) {
  return request({
    url: url.platformWeb + '/activity/userActivity/'+id,
    method: 'get',
  })
}

export function addUserActivity(data) {
  return request({
    url: url.platformWeb + '/activity/userActivity',
    method: 'post',
    data: data
  })
}

export function updateUserActivity(data) {
  return request({
    url: url.platformWeb + '/activity/userActivity',
    method: 'put',
    data: data
  })
}

// 删除活动信息
export function delUserActivity(userId) {
  return request({
    url: url.platformWeb + '/activity/userActivity/delete/' + userId,
    method: 'delete'
  })
}

// 导出活动信息
export function exportUserActivity(query) {
  return request({
    url: url.platformWeb + '/activity/userActivity/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
