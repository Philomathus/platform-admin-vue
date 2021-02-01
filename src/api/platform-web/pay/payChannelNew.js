import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayChannelNew(query) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayChannelNew(id) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayChannelNew(data) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayChannelNew(data) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew',
    method: 'put',
    data: data
  })
}
// 状态修改
export function changePayTypeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/payChannelNew/changeStatus',
    method: 'put',
    data: data
  })
}

//支付平台列表
export function platforms() {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/effect-pay-platform',
    method: 'get'
  })
}

//支付通道列表
export function paychannels() {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/effect-pay-Channels',
    method: 'get'
  })
}

//支付类型列表
export function payTypes() {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/effect-pay-type',
    method: 'get'
  })
}


// 回调修改
export function callbackStatusChange(id, isCanCallback) {
  const data = {
    id,
    isCanCallback
  }
  return request({
    url: url.platformWeb + '/pay/payChannelNew/changeStatus',
    method: 'put',
    data: data
  })
}
// 删除【请填写功能名称】
export function delPayChannelNew(id) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayChannelNew(query) {
  return request({
    url: url.platformWeb + '/pay/payChannelNew/export',
    method: 'get',
    params: query
  })
}
