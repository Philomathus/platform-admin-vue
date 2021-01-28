import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentLog(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/' + id,
    method: 'get'
  })
}
//代付列表
export function agents() {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/effect-pay-agents',
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentLog(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/export',
    method: 'get',
    params: query
  })
}
