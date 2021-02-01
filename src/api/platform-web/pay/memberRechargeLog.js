import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表
export function listCount(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/listCount',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberRechargeLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberRechargeLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberRechargeLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberRechargeLog/export',
    method: 'get',
    params: query
  })
}
