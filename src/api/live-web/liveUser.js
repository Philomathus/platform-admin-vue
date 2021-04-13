import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询用户信息列表
export function listLiveUser(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getLiveUser(id) {
  return request({
    url: url.platformWeb + '/admin/liveUser/' + id,
    method: 'get'
  })
}

// 开播
export function openLive(data) {
  return request({
    url: url.platformWeb + '/admin/liveUser/openLive',
    method: 'post',
    data: data
  })
}

// 关播
export function closeLive(data) {
  return request({
    url: url.platformWeb + '/admin/liveUser/closeLive',
    method: 'post',
    data: data
  })
}

// 聊天室记录列表
export function chatPage(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat/list',
    method: 'get',
    params: query
  })
}

// 收礼物日志列表
export function receiveProplist(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/list',
    method: 'get',
    params: query
  })
}

// 账户日志
export function logPage(query) {
  return request({
    url: url.platformWeb + '/admin/liveUserLog/list',
    method: 'get',
    params: query
  })
}

// 修改主播禁播状态
export function banDetail(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/banDetail',
    method: 'put',
    params: query
  })
}

// 获取家族信息
export function getFamiily(query) {
  return request({
    url: url.platformWeb + '/admin/liveFamily/' + query,
    method: 'get'
  })
}

// 修改家族id
export function goFamiily(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/gofamiily',
    method: 'put',
    params: query
  })
}

// 新增用户信息
export function addLiveUser(data) {
  return request({
    url: url.platformWeb + '/admin/liveUser',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateLiveUser(data) {
  return request({
    url: url.platformWeb + '/admin/liveUser',
    method: 'put',
    data: data
  })
}

// 删除用户信息
export function delLiveUser(id) {
  return request({
    url: url.platformWeb + '/admin/liveUser/' + id,
    method: 'delete'
  })
}

// 导出用户信息
export function exportLiveUser(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 查询主播派奖
export function listAnchorAward(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/anchorAward',
    method: 'get',
    params: query
  })
}

// 导出主播派奖
export function exportAnchorAward(query) {
  return request({
    url: url.platformWeb + '/admin/liveUser/anchorAward/export',
    method: 'get',
    params: query
  })
}
