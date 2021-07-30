import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询人工加分日志列表
export function listMemberDepositLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog/list',
    method: 'get',
    params: query
  })
}

// 查询人工加分日志详细
export function getMemberDepositLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog/' + id,
    method: 'get'
  })
}

// 新增人工加分日志
export function addMemberDepositLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog',
    method: 'post',
    data: data
  })
}

// 修改人工加分日志
export function updateMemberDepositLog(data) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog',
    method: 'put',
    data: data
  })
}

// 删除人工加分日志
export function delMemberDepositLog(id) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog/' + id,
    method: 'delete'
  })
}

// 导出人工加分日志
export function exportMemberDepositLog(query) {
  return request({
    url: url.platformWeb + '/pay/memberDepositLog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
