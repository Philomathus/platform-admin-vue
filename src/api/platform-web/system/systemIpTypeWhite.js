import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询IP黑名单或反作弊禁言列表
export function listSystemIpTypeWhite(query) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite/list',
    method: 'get',
    params: query
  })
}

// 查询IP黑名单或反作弊禁言详细
export function getSystemIpTypeWhite(id) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite/' + id,
    method: 'get'
  })
}

// 新增IP黑名单或反作弊禁言
export function addSystemIpTypeWhite(data) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite',
    method: 'post',
    data: data
  })
}

// 修改IP黑名单或反作弊禁言
export function updateSystemIpTypeWhite(data) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite',
    method: 'put',
    data: data
  })
}

// 删除IP黑名单或反作弊禁言
export function delSystemIpTypeWhite(id) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite/' + id,
    method: 'delete'
  })
}

// 导出IP黑名单或反作弊禁言
export function exportSystemIpTypeWhite(query) {
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/systemIpTypeWhite/changeStatus',
    method: 'put',
    data: data
  })
}
