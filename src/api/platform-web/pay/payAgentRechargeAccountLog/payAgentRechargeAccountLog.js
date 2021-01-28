import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentRechargeAccountLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentRechargeAccountLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/' + orderNo,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentRechargeAccountLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentRechargeAccountLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/' + orderNo,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentRechargeAccountLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeAccountLog/export',
    method: 'get',
    params: query
  })
}
