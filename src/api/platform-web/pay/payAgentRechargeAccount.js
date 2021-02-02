import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【代充人管理】列表
export function listPayAgentRechargeAccount(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/list',
    method: 'get',
    params: query
  })
}

// 查询【代充人管理】详细
export function getPayAgentRechargeAccount(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/' + id,
    method: 'get'
  })
}

// 新增【代充人管理】
export function addPayAgentRechargeAccount(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount',
    method: 'post',
    data: data
  })
}

// 修改【代充人管理】
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
// 删除【代充人管理】
export function delPayAgentRechargeAccount(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/' + id,
    method: 'delete'
  })
}

// 导出【代充人管理】
export function exportPayAgentRechargeAccount(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccount/export',
    method: 'get',
    params: query
  })
}
