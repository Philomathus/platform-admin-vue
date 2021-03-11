import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员信息列表
export function listMemberInfo(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/list',
    method: 'get',
    params: query
  })
}

// 查询资金明细列表
export function memberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/report',
    method: 'get',
    params: query
  })
}

// 加分提交接口
export function addScore(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/addScore',
    method: 'post',
    params: query
  })
}

// 重置密码接口
export function resetPassword(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/reset/' + query,
    method: 'delete',
  })
}

// 查询银行卡列表接口
export function cardList(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/card-list/',
    method: 'get',
    params: query
  })
}

// 修改用户状态
export function changeStatus(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/change-status/',
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
    url: url.platformWeb + '/member/memberInfo/change-statusBan/',
    method: 'put',
    data: data
  })
}

// 重置保险箱
export function resetSafe(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/resetPassword',
    method: 'post',
    params: query
  })
}

// 重置体现
export function resetWithdrawal(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/resettx',
    method: 'post',
    params: query
  })
}

// 查询会员信息详细
export function getMemberInfo(id) {
  return request({
    url: url.platformWeb + '/member/memberInfo/' + id,
    method: 'get'
  })
}

// 新增会员信息
export function addMemberInfo(data) {
  return request({
    url: url.platformWeb + '/member/memberInfo',
    method: 'post',
    data: data
  })
}

// 修改会员信息
export function updateMemberInfo(data) {
  return request({
    url: url.platformWeb + '/member/memberInfo',
    method: 'put',
    data: data
  })
}

// 导出会员信息
export function exportMemberInfo(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/export',
    method: 'get',
    params: query
  })
}

export function changeSpeak(id, speak, remark) {
  const data = {
    id: id,
    speak: speak,
    remark: remark
  }
  return request({
    url: url.platformWeb + '/member/memberInfo/changeSpeak',
    method: 'put',
    data: data
  })
}
