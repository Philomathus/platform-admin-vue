import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询腾讯IM禁言查询列表
export function listImMute(query) {
  return request({
    url: url.platformWeb + '/live-web/ImMute/list',
    method: 'get',
    params: query
  })
}

// 查询腾讯IM禁言查询详细
export function getImMute(id) {
  return request({
    url: url.platformWeb + '/live-web/ImMute/' + id,
    method: 'get'
  })
}

// 新增腾讯IM禁言查询
export function addImMute(data) {
  return request({
    url: url.platformWeb + '/live-web/ImMute',
    method: 'post',
    data: data
  })
}

// 修改腾讯IM禁言查询
export function updateImMute(data) {
  return request({
    url: url.platformWeb + '/live-web/ImMute',
    method: 'put',
    data: data
  })
}

// 删除腾讯IM禁言查询
export function delImMute(id) {
  return request({
    url: url.platformWeb + '/live-web/ImMute/' + id,
    method: 'delete'
  })
}

// 导出腾讯IM禁言查询
export function exportImMute(query) {
  return request({
    url: url.platformWeb + '/live-web/ImMute/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
export function userImMute(query) {
  return request({
    url: url.platformWeb + '/live-web/ImMute/list?userId='+query,
    method: 'get',
  })
}
