import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询线上充值信息列表
export function listMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/list',
    method: 'get',
    params: query
  })
}

// 统计线上充值信息列表
export function listCount(query) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/listCount',
    method: 'get',
    params: query
  })
}

// 查询线上充值信息详细
export function getMemberPayJour(id) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/' + id,
    method: 'get'
  })
}

// 导出线上充值信息
export function exportMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/export',
    method: 'get',
    params: query
  })
}
