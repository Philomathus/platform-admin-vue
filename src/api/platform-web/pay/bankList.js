import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询出款银行列表列表
export function listBankList(query) {
  return request({
    url: url.platformWeb + '/admin/bankList/list',
    method: 'get',
    params: query
  })
}

export function changeConfigBankStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/bankList/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询出款银行列表详细
export function getBankList(id) {
  return request({
    url: url.platformWeb + '/admin/bankList/' + id,
    method: 'get'
  })
}

// 新增出款银行列表
export function addBankList(data) {
  return request({
    url: url.platformWeb + '/admin/bankList',
    method: 'post',
    data: data
  })
}

// 修改出款银行列表
export function updateBankList(data) {
  return request({
    url: url.platformWeb + '/admin/bankList',
    method: 'put',
    data: data
  })
}

// 删除出款银行列表
export function delBankList(id) {
  return request({
    url: url.platformWeb + '/admin/bankList/' + id,
    method: 'delete'
  })
}

// 导出出款银行列表
export function exportBankList(query) {
  return request({
    url: url.platformWeb + '/admin/bankList/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
