import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询系统公告列表
export function listMessageSystemNotice(query) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice/list',
    method: 'get',
    params: query
  })
}

// 查询系统公告详细
export function getMessageSystemNotice(id) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice/' + id,
    method: 'get'
  })
}

// 新增系统公告
export function addMessageSystemNotice(data) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice',
    method: 'post',
    data: data
  })
}

// 修改系统公告
export function updateMessageSystemNotice(data) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice',
    method: 'put',
    data: data
  })
}

// 删除系统公告
export function delMessageSystemNotice(id) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice/' + id,
    method: 'delete'
  })
}

// 导出系统公告
export function exportMessageSystemNotice(query) {
  return request({
    url: url.platformWeb + '/admin/messageSystemNotice/export',
    method: 'get',
    params: query
  })
}
