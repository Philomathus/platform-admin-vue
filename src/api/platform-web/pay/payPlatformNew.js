import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询支付平台列表
export function listPayPlatformNew(query) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/list',
    method: 'get',
    params: query
  })
}

// 查询支付平台详细
export function getPayPlatformNew(id) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/' + id,
    method: 'get'
  })
}

// 新增支付平台
export function addPayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'post',
    data: data
  })
}

// 修改支付平台
export function updatePayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'put',
    data: data
  })
}

// 删除支付平台
export function delPayPlatformNew(id) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/' + id,
    method: 'delete'
  })
}

// 导出支付平台
export function exportPayPlatformNew(query) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/export',
    method: 'get',
    params: query
  })
}

// 人工补单线上充值信息
export function patchOrderPayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/payPatchOrder',
    method: 'put',
    data: data
  })
}
