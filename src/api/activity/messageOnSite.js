import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询站内信息列表
export function listMessageOnSite(query) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/list',
    method: 'get',
    params: query
  })
}

// 查询站内信息详细
export function getMessageOnSite(id) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/' + id,
    method: 'get'
  })
}

// 新增站内信息
export function addMessageOnSite(data) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite',
    method: 'post',
    data: data
  })
}

// 修改站内信息
export function updateMessageOnSite(data) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite',
    method: 'put',
    data: data
  })
}

// 删除站内信息
export function delMessageOnSite(id) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/' + id,
    method: 'delete'
  })
}

// 导出站内信息
export function exportMessageOnSite(query) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
// 新增站内信息
export function addUserMessage(data) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/addUserMessage',
    method: 'post',
    data: data
  })
}

export function addMultipleUserMessage(data) {
  return request({
    url: url.platformWeb + '/admin/messageOnSite/addMultipleUserMessage',
    method: 'post',
    data: data
  })
}
