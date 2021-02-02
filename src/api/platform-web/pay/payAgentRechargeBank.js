import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【代充银行列表】列表
export function listPayAgentRechargeBank(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/list',
    method: 'get',
    params: query
  })
}

// 查询【代充银行列表】详细
export function getPayAgentRechargeBank(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/' + id,
    method: 'get'
  })
}

// 状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/changeStatus',
    method: 'put',
    data: data
  })
}

// 新增【代充银行列表】
export function addPayAgentRechargeBank(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank',
    method: 'post',
    data: data
  })
}

// 修改【代充银行列表】
export function updatePayAgentRechargeBank(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank',
    method: 'put',
    data: data
  })
}

// 删除【代充银行列表】
export function delPayAgentRechargeBank(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/' + id,
    method: 'delete'
  })
}

// 导出【代充银行列表】
export function exportPayAgentRechargeBank(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/export',
    method: 'get',
    params: query
  })
}
