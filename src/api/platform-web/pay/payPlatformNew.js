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

// 新增支付
export function addPayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'post',
    data: data
  })
}

// 全平台新增支付
export function addPayPlatformNewAll(data, id) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/' + id,
    method: 'post',
    data: data
  })
}

// 新增支付对接配置
export function addPayPlatformConfig(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/addPayPlatformConfig',
    method: 'post',
    data: data
  })
}

// 修改支付
export function updatePayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'put',
    data: data
  })
}

// 修改支付全平台更新
export function updatePayPlatformNewAll(data) {
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
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
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
