import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询用户送礼日志列表
export function listLiveProplog(query) {
  return request({
    url: url.platformWeb + '/admin/liveProplog/list',
    method: 'get',
    params: query
  })
}

// 查询用户送礼日志详细
export function getLiveProplog(id) {
  return request({
    url: url.platformWeb + '/admin/liveProplog/' + id,
    method: 'get'
  })
}

// 新增用户送礼日志
export function addLiveProplog(data) {
  return request({
    url: url.platformWeb + '/admin/liveProplog',
    method: 'post',
    data: data
  })
}

// 修改用户送礼日志
export function updateLiveProplog(data) {
  return request({
    url: url.platformWeb + '/admin/liveProplog',
    method: 'put',
    data: data
  })
}

// 删除用户送礼日志
export function delLiveProplog(id) {
  return request({
    url: url.platformWeb + '/admin/liveProplog/' + id,
    method: 'delete'
  })
}

// 导出用户送礼日志
export function exportLiveProplog(query) {
  return request({
    url: url.platformWeb + '/admin/liveProplog/export',
    method: 'get',
    params: query
  })
}

// 查询会员注单数据统计
export function getCount(query) {
  return request({
    url: url.platformWeb + '/admin/liveProplog/getCount',
    method: 'get',
    params: query
  })
}
