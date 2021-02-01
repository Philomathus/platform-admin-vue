import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentRechargeLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog/' + orderNo,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentRechargeLog(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog/' + orderNo,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeLog/export',
    method: 'get',
    params: query
  })
}
