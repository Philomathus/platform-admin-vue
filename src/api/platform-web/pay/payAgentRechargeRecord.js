import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【代充存提】列表
export function listPayAgentRechargeRecord(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/list',
    method: 'get',
    params: query
  })
}

// 查询【代充存提】统计
export function getCount(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/getCount',
    method: 'get',
    params: query
  })
}

// 查询【代充存提】详细
export function getPayAgentRechargeRecord(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/' + orderNo,
    method: 'get'
  })
}

// 新增【代充存提】
export function addPayAgentRechargeRecord(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord',
    method: 'post',
    data: data
  })
}

// 修改【代充存提】
export function updatePayAgentRechargeRecord(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord',
    method: 'put',
    data: data
  })
}

// 删除【代充存提】
export function delPayAgentRechargeRecord(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/' + orderNo,
    method: 'delete'
  })
}

// 导出【代充存提】
export function exportPayAgentRechargeRecord(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/export',
    method: 'get',
    params: query
  })
}

//人工存入
export function deposit(query) {
  console.info(query)
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/deposit',
    method: 'put',
    params: query
  })
}

//人工提出
export function proposed(query) {
  console.info(query)
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/proposed',
    method: 'put',
    params: query
  })
}
