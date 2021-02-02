import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentRechargeRecord(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentRechargeRecord(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/' + orderNo,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentRechargeRecord(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentRechargeRecord(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentRechargeRecord(orderNo) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/' + orderNo,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentRechargeRecord(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeRecord/export',
    method: 'get',
    params: query
  })
}
