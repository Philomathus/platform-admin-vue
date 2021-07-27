import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员信息列表
export function listMemberInfo(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/list',
    method: 'get',
    params: query
  })
}

// 查询资金明细列表
export function memberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/report',
    method: 'get',
    params: query
  })
}
// 会员信息发送
export function sendMsg(msg,memberId) {
  var data = {msg,memberId}
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/sendMsg',
    method: 'post',
    data: data
  })
}
// 会员邀请码修改
export function updateInviterCode(inviterCode,googleAuthCode,memberId) {
  var data = {inviterCode,googleAuthCode,memberId}
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/updateInviterCode',
    method: 'post',
    data: data
  })
}
// 会员手机号码修改
export function updateMobile(data) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/updateMobile',
    method: 'post',
    data: data
  })
}

// 会员完整手机号码查看
export function fullMobile(id) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/fullMobile/' + id,
    method: 'get'
  })
}

// 加分提交接口
export function addScore(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/addScore',
    method: 'post',
    params: query
  })
}

// 重置密码接口
export function resetPassword(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/reset',
    method: 'post',
    params: query
  })
}

// 查询银行卡列表接口
export function cardList(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/card-list/',
    method: 'get',
    params: query
  })
}

// 修改用户状态
export function changeStatus(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/change-status/',
    method: 'put',
    params: query
  })
}

// 禁用用户
export function changeStatusBan(id, status, remark) {
  const data = {
    id: id,
    status: status,
    remark: remark
  }
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/change-statusBan/',
    method: 'put',
    data: data
  })
}

// 重置保险箱
export function resetSafe(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/resetPassword',
    method: 'post',
    params: query
  })
}

// 重置体现
export function resetWithdrawal(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/resettx',
    method: 'post',
    params: query
  })
}

// 查询会员信息详细
export function getMemberInfo(id) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/' + id,
    method: 'get'
  })
}

// 查询会员登录地址
export function getMemberLoginAddress(id) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/getMemberLoginAddress/' + id,
    method: 'get'
  })
}

// 查询会员线上充值历史金额
export function getHistoryRecharge(id) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/getHistoryRecharge/' + id,
    method: 'get'
  })
}

// 新增会员信息
export function addMemberInfo(data) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory',
    method: 'post',
    data: data
  })
}

// 修改会员信息
export function updateMemberInfo(data) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory',
    method: 'put',
    data: data
  })
}

// 导出会员信息
export function exportMemberInfo(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

export function changeSpeak(id, speak, remark) {
  const data = {
    id: id,
    speak: speak,
    remark: remark
  }
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/changeSpeak',
    method: 'put',
    data: data
  })
}
export function unbindCard(id,memberId) {
  const data = {
    id: id,
    memberId:memberId
  }
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/unbindCard',
    method: 'put',
    data: data
  })
}

export function changeBank(data) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/changeBank',
    method: 'put',
    data: data
  })
}

// 修改备注
export function updateEmail(data) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/updateEmail',
    method: 'put',
    data: data
  })
}
// 打码修复
export function memberBcodeRepair(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/memberBcodeRepair',
    method: 'post',
    params: query
  })
}
// 打码修复
export function updateVip(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/updateVip',
    method: 'post',
    params: query
  })
}
// im禁言
export function imDelete(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/imDealBan',
    method: 'post',
    params: query
  })
}

// 查询【请填写功能名称】列表
//不涉及到member_info表
export function listSpeakIpBlackList(query) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList/list',
    method: 'get',
    params: query
  })
}

// 修改【请填写功能名称】
//不涉及到member_info表
export function  updateSpeakIpBlackList(data) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList',
    method: 'put',
    data: data
  })
}

// 查询【请填写功能名称】详细
export function getConfigEnvironment(envCode) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/' + envCode,
    method: 'get'
  })
}

export function userImMute(query) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/imList?userId='+query,
    method: 'get',
  })
}

// 查询会员提现报告信息详细
export function getMemberWithdrawReport(id) {
  return request({
    url: url.platformWeb + '/member/memberInfoHistory/report/' + id,
    method: 'get'
  })
}

// 查询会员游戏积分
export function gameBalance(managerId) {
  return request({
    url: url.platformWeb + '/game/base/balance/' + managerId,
    method: 'get'
  })
}

// 会员游戏人工下分
export function gameEsc(platformId, managerId) {
  return request({
    url: url.platformWeb + '/game/base/esc/' + platformId + '/' + managerId,
    method: 'get'
  })
}
