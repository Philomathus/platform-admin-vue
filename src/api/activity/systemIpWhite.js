import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询IP白名单列表
export function listSystemIpWhite(query) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite/list',
    method: 'get',
    params: query
  })
}

// 查询IP白名单详细
export function getSystemIpWhite(ipId) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite/' + ipId,
    method: 'get'
  })
}

// 新增IP白名单
export function addSystemIpWhite(data) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite',
    method: 'post',
    data: data
  })
}

// 修改IP白名单
export function updateSystemIpWhite(data) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite',
    method: 'put',
    data: data
  })
}

// 删除IP白名单
export function delSystemIpWhite(ipId) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite/' + ipId,
    method: 'delete'
  })
}

// 导出IP白名单
export function exportSystemIpWhite(query) {
  return request({
    url: url.platformWeb + '/admin/systemIpWhite/export',
    method: 'get',
    params: query
  })
}

// IP白名单状态修改
export function changeStatus(ipId, ipStatus) {
  const data = {
    ipId,
    ipStatus
  }
  return request({
    url: url.platformWeb + '/admin/systemIpWhite/changeStatus',
    method: 'put',
    data: data
  })
}
