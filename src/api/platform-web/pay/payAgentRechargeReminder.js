import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询代充银行提示语列表
export function listPayAgentRechargeReminder(query) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder/list',
    method: 'get',
    params: query
  })
}

// 查询代充银行提示语详细
export function getPayAgentRechargeReminder(id) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder/' + id,
    method: 'get'
  })
}

// 新增代充银行提示语
export function addPayAgentRechargeReminder(data) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder',
    method: 'post',
    data: data
  })
}

// 修改代充银行提示语
export function updatePayAgentRechargeReminder(data) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder',
    method: 'put',
    data: data
  })
}

// 代充银行提示语状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder',
    method: 'put',
    data: data
  })
}

// 删除代充银行提示语
export function delPayAgentRechargeReminder(id) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder/' + id,
    method: 'delete'
  })
}

// 导出代充银行提示语
export function exportPayAgentRechargeReminder(query) {
  return request({
    url: url.platformWeb + '/admin/payAgentRechargeReminder/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
