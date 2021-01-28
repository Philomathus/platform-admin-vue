import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentPlatform(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentPlatform(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentPlatform(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentPlatform(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentPlatform(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentPlatform(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/export',
    method: 'get',
    params: query
  })
}
