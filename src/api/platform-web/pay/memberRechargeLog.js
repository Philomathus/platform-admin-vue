import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询公司入款信息列表
export function listMemberRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/list',
    method: 'get',
    params: query
  })
}

// 统计公司入款信息列表
export function listCount(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/listCount',
    method: 'get',
    params: query
  })
}

// 查询公司入款信息详细
export function getMemberRechargeLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/' + id,
    method: 'get'
  })
}

// 导出公司入款信息
export function exportMemberRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/export',
    method: 'get',
    params: query
  })
}

// 公司入款信息初审
export function firstAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/firstAudit',
    method: 'put',
    data: data
  })
}

// 公司入款信息终审
export function finalAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/finalAudit',
    method: 'put',
    data: data
  })
}

// 公司入款信息拒绝审核
export function refusedAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/refusedAudit',
    method: 'put',
    data: data
  })
}

// 公司入款信息恢复审核
export function recoverAuditMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/recoverAudit',
    method: 'put',
    data: data
  })
}
