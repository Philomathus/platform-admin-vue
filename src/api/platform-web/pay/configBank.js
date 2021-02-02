import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【公司入款银行】列表
export function listConfigBank(query) {
  return request({
    url: url.platformWeb + '/pay/configBank/list',
    method: 'get',
    params: query
  })
}

// 查询【公司入款银行】详细
export function getConfigBank(id) {
  return request({
    url: url.platformWeb + '/pay/configBank/' + id,
    method: 'get'
  })
}

export function changeConfigBankStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/configBank/changeStatus',
    method: 'put',
    data: data
  })
}
// 新增【公司入款银行】
export function addConfigBank(data) {
  return request({
    url: url.platformWeb + '/pay/configBank',
    method: 'post',
    data: data
  })
}

// 修改【公司入款银行】
export function updateConfigBank(data) {
  return request({
    url: url.platformWeb + '/pay/configBank',
    method: 'put',
    data: data
  })
}

// 删除【公司入款银行】
export function delConfigBank(id) {
  return request({
    url: url.platformWeb + '/pay/configBank/' + id,
    method: 'delete'
  })
}

// 导出【公司入款银行】
export function exportConfigBank(query) {
  return request({
    url: url.platformWeb + '/pay/configBank/export',
    method: 'get',
    params: query
  })
}
