import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberInfo(query) {
  return request({
    url: url.platformWeb + '/admin/memberInfo/list',
    method: 'get',
    params: query
  })
}

// 查询积分明细列表
export function gameBalance(query) {
  return request({
    url: url.platformWeb + '/v1.0/game-balance',
    method: 'get',
    params: query
  })
}
// 查询资金明细列表
export function memberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/member-withdraw-log/report',
    method: 'get',
    params: query
  })
}
// 加分提交接口
export function addScore(query) {
  return request({
    url: url.platformWeb + '/member-info/addScore',
    method: 'post',
    params: query
  })
}
// 重置密码接口
export function resetPassword(query) {
  return request({
    url: url.platformWeb + '/member-info/reset/'+query,
    method: 'delete',
    params: query
  })
}
// 查询银行卡列表接口
export function cardList(query) {
  return request({
    url: url.platformWeb + '/member-info/card-list/',
    method: 'get',
    params: query
  })
}
// 重置保险箱
export function resetSafe(query) {
  return request({
    url: url.platformWeb + '/member-info/resetPassword',
    method: 'post',
    params: query
  })
}
// 重置体现
export function resetWithdrawal(query) {
  return request({
    url: url.platformWeb + '/member-info/resettx',
    method: 'post',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberInfo(id) {
  return request({
    url: url.platformWeb + '/admin/memberInfo/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberInfo(data) {
  return request({
    url: url.platformWeb + '/admin/memberInfo',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberInfo(data) {
  return request({
    url: url.platformWeb + '/admin/memberInfo',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberInfo(id) {
  return request({
    url: url.platformWeb + '/admin/memberInfo/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberInfo(query) {
  return request({
    url: url.platformWeb + '/admin/memberInfo/export',
    method: 'get',
    params: query
  })
}
