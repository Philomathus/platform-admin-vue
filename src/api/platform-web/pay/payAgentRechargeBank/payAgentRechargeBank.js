import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayAgentRechargeBank(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayAgentRechargeBank(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayAgentRechargeBank(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayAgentRechargeBank(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayAgentRechargeBank(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayAgentRechargeBank(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentRechargeBank/export',
    method: 'get',
    params: query
  })
}
