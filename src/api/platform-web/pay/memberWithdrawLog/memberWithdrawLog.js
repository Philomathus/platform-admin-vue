import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberWithdrawLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberWithdrawLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberWithdrawLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberWithdrawLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberWithdrawLog/export',
    method: 'get',
    params: query
  })
}
