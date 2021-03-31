import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员提现信息列表
export function listMemberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/list',
    method: 'get',
    params: query
  })
}

// 查询会员提现信息详细
export function getMemberWithdrawLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/' + id,
    method: 'get'
  })
}

// 查询会员提现报告信息详细
export function getMemberWithdrawReport(id) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/report/' + id,
    method: 'get'
  })
}

// 查询会员提现报告统计信息
export function getCountTotal(query) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/countTotal',
    method: 'get',
    params: query
  })
}

// 新增会员提现信息
export function addMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog',
    method: 'post',
    data: data
  })
}

// 修改会员提现信息
export function updateMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog',
    method: 'put',
    data: data
  })
}

// 导出会员提现信息
export function exportMemberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 120000
  })
}

// 会员提现拒绝
export function refusedMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/refused',
    method: 'put',
    data: data
  })
}

// 会员提现拒绝
export function refusedsMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/refuseds',
    method: 'put',
    data: data
  })
}

// 会员提现锁定
export function lockMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/lock',
    method: 'put',
    data: data
  })
}

// 会员提现解锁
export function unlockMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/unlock',
    method: 'put',
    data: data
  })
}

// 会员提现人工出款
export function artificialMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/artificial',
    method: 'put',
    data: data
  })
}

// 会员出款异常
export function abnormalWithdrawal(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/abnormalWithdrawal',
    method: 'put',
    data: data
  })
}

// 会员人工出款中
export function manualWithdrawal(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/manualWithdrawal',
    method: 'put',
    data: data
  })
}
