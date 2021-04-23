import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listBankCardAddress(query) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getBankCardAddress(id) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addBankCardAddress(data) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateBankCardAddress(data) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delBankCardAddress(id) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportBankCardAddress(query) {
  return request({
    url: url.platformWeb + '/admin/bankCardAddress/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
export function changeBankAddressStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/bankCardAddress/changeBankAddressStatus',
    method: 'put',
    data: data
  })
}
