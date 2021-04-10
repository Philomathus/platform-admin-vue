import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询主播提现管理列表
export function listLiveUserWithdrawNewlog(query) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/list',
    method: 'get',
    params: query
  })
}

// 查询主播提现管理详细
export function getLiveUserWithdrawNewlog(id) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/' + id,
    method: 'get'
  })
}
// 查询主播提现报告统计信息
export function getCountTotal(query) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/countTotal',
    method: 'get',
    params: query
  })
}

// 新增主播提现管理
export function addLiveUserWithdrawNewlog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog',
    method: 'post',
    data: data
  })
}

// 修改主播提现管理
export function updateLiveUserWithdrawNewlog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog',
    method: 'put',
    data: data
  })
}

// 删除主播提现管理
export function delLiveUserWithdrawNewlog(id) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/' + id,
    method: 'delete'
  })
}
// 主播提现解锁
export function unlockMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/unlock',
    method: 'put',
    data: data
  })
}

// 主播提现拒绝
export function refusedMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/refused',
    method: 'put',
    data: data
  })
}

// 主播提现出款成功
export function withdrawSucc(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/withdrawSucc',
    method: 'put',
    data: data
  })
}

// 主播提现出款拒绝
export function withdrawRefused(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/withdrawRefused',
    method: 'put',
    data: data
  })
}
// 主播提现出款
export function artificialMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/artificial',
    method: 'put',
    data: data
  })
}

// 重新生成订单
export function updateOrder(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/updateOrder',
    method: 'put',
    data: data
  })
}

// 主播提现审核
export function finalAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/finalAudit',
    method: 'put',
    data: data
  })
}

// 主播提现恢复审核状态
export function recoverAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/recoverAudit',
    method: 'put',
    data: data
  })
}


// 导出主播提现管理
export function exportLiveUserWithdrawNewlog(query) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
