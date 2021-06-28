import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询代付平台列表
export function listPayAgentPlatform(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/list',
    method: 'get',
    params: query
  })
}

// 激活中代付列表
export function effectListPayAgentPlatform() {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/effect-pay-agents',
    method: 'get'
  })
}

// 查询代付平台详细
export function getPayAgentPlatform(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/' + id,
    method: 'get'
  })
}

// 新增代付平台
export function addPayAgentPlatform(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform',
    method: 'post',
    data: data
  })
}

// 修改代付平台
export function updatePayAgentPlatform(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform',
    method: 'put',
    data: data
  })
}

export function changePayAgentStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除代付平台
export function delPayAgentPlatform(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/' + id,
    method: 'delete'
  })
}

// 导出代付平台
export function exportPayAgentPlatform(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 代付下单
export function payAgentOrder(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/payAgentOrder',
    method: 'post',
    data: data
  })
}

// 批量代付
export function payAgentOrders(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentPlatform/payAgentOrders',
    method: 'post',
    data: data
  })
}
