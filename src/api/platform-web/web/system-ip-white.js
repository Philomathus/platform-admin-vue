import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询IP白名单列表
export function listSystem_ip_white(query) {
  return request({
    url: url.platformWeb + '/web/system_ip_white/list',
    method: 'get',
    params: query
  })
}

// 查询IP白名单详细
export function getSystem_ip_white(ipId) {
  return request({
    url: url.platformWeb + '/web/system_ip_white/' + ipId,
    method: 'get'
  })
}

// 新增IP白名单
export function addSystem_ip_white(data) {
  return request({
    url: url.platformWeb + '/web/system_ip_white',
    method: 'post',
    data: data
  })
}

// 修改IP白名单
export function updateSystem_ip_white(data) {
  return request({
    url: url.platformWeb + '/web/system_ip_white',
    method: 'put',
    data: data
  })
}

// 删除IP白名单
export function delSystem_ip_white(ipId) {
  return request({
    url: url.platformWeb + '/web/system_ip_white/' + ipId,
    method: 'delete'
  })
}

// 导出IP白名单
export function exportSystem_ip_white(query) {
  return request({
    url: url.platformWeb + '/web/system_ip_white/export',
    method: 'get',
    params: query
  })
}
