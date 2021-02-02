import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【代充人入款】列表
export function listPayAgentRechargeAccountLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/list',
    method: 'get',
    params: query
  })
}

// 查询【代充人入款】详细
export function getPayAgentRechargeAccountLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/' + orderNo,
    method: 'get'
  })
}

// 新增【代充人入款】
export function addPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog',
    method: 'post',
    data: data
  })
}

// 修改【代充人入款】
export function updatePayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog',
    method: 'put',
    data: data
  })
}

// 删除【代充人入款】
export function delPayAgentRechargeAccountLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/' + orderNo,
    method: 'delete'
  })
}
// 会员提现拒绝
export function refusedPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/refused',
    method: 'put',
    data: data
  })
}

// 会员提现锁定
export function lockPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/lock',
    method: 'put',
    data: data
  })
}

// 会员提现解锁
export function unlockPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/unlock',
    method: 'put',
    data: data
  })
}

// 会员提现人工出款
export function artificialPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/artificial',
    method: 'put',
    data: data
  })
}

// 导出【代充人入款】
export function exportPayAgentRechargeAccountLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/export',
    method: 'get',
    params: query
  })
}

// 统计
export function agentStatistic(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/statistic',
    method: 'get',
    params: query
  })
}
