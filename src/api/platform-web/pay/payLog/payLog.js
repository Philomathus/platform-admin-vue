import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayLog(query) {
  return request({
    url: url.platformWeb + '/pay/payLog/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayLog(id) {
  return request({
    url: url.platformWeb + '/pay/payLog/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayLog(data) {
  return request({
    url: url.platformWeb + '/pay/payLog',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayLog(data) {
  return request({
    url: url.platformWeb + '/pay/payLog',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayLog(id) {
  return request({
    url: url.platformWeb + '/pay/payLog/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayLog(query) {
  return request({
    url: url.platformWeb + '/pay/payLog/export',
    method: 'get',
    params: query
  })
}
