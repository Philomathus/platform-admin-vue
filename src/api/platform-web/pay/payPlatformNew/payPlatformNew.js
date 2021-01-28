import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listPayPlatformNew(query) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPayPlatformNew(id) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePayPlatformNew(data) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPayPlatformNew(id) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportPayPlatformNew(query) {
  return request({
    url: url.platformWeb + '/pay/payPlatformNew/export',
    method: 'get',
    params: query
  })
}
