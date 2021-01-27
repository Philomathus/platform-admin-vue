import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询游戏公告列表
export function listMessageGameNotice(query) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice/list',
    method: 'get',
    params: query
  })
}

// 查询游戏公告详细
export function getMessageGameNotice(id) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice/' + id,
    method: 'get'
  })
}

// 新增游戏公告
export function addMessageGameNotice(data) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice',
    method: 'post',
    data: data
  })
}

// 修改游戏公告
export function updateMessageGameNotice(data) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice',
    method: 'put',
    data: data
  })
}

// 删除游戏公告
export function delMessageGameNotice(id) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice/' + id,
    method: 'delete'
  })
}

// 导出游戏公告
export function exportMessageGameNotice(query) {
  return request({
    url: url.platformWeb + '/admin/messageGameNotice/export',
    method: 'get',
    params: query
  })
}
