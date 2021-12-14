import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询代充人银行卡列列表
export function listPayAgentCard(query) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard/list',
    method: 'get',
    params: query
  })
}

// 代充账号列表
export function accounts() {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/accounts',
    method: 'get'
  })
}

// 查询代充人银行卡列详细
export function getPayAgentCard(id) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard/' + id,
    method: 'get'
  })
}

// 新增代充人银行卡列
export function addPayAgentCard(data) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard',
    method: 'post',
    data: data
  })
}

// 修改代充人银行卡列
export function updatePayAgentCard(data) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard',
    method: 'put',
    data: data
  })
}

// 删除代充人银行卡列
export function delPayAgentCard(id) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard/' + id,
    method: 'delete'
  })
}

// 导出代充人银行卡列
export function exportPayAgentCard(query) {
  return request({
    url: url.platformWeb + '/admin/payAgentCard/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 支付类型状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/payAgentCard/changeStatus',
    method: 'put',
    data: data
  })
}
