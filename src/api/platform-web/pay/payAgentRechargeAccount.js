import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentRechargeAccount(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentRechargeAccount(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentRechargeAccount(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentRechargeAccount(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount',
    method: 'put',
    data: data
  })
}
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/changeStatus',
    method: 'put',
    data: data
  })
}
// 删除【请填写功能名称】
export function delPayAgentRechargeAccount(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentRechargeAccount(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/export',
    method: 'get',
    params: query
  })
}
