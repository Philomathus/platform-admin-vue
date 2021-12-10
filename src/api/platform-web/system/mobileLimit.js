import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询手机号限制列表
export function listMobileLimit(query) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit/list',
    method: 'get',
    params: query
  })
}

// 查询手机号限制详细
export function getMobileLimit(id) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit/' + id,
    method: 'get'
  })
}

// 新增手机号限制
export function addMobileLimit(data) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit',
    method: 'post',
    data: data
  })
}

// 修改手机号限制
export function updateMobileLimit(data) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit',
    method: 'put',
    data: data
  })
}

// 删除手机号限制
export function delMobileLimit(id) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit/' + id,
    method: 'delete'
  })
}

// 导出手机号限制
export function exportMobileLimit(query) {
  return request({
    url: url.platformWeb + '/admin/mobileLimit/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
