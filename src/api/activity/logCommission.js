import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询佣金领取日志列表
export function listLogCommission(query) {
  return request({
    url: url.platformWeb + '/admin/logCommission/list',
    method: 'get',
    params: query
  })
}

// 查询佣金领取日志详细
export function getLogCommission(id) {
  return request({
    url: url.platformWeb + '/admin/logCommission/' + id,
    method: 'get'
  })
}

// 新增佣金领取日志
export function addLogCommission(data) {
  return request({
    url: url.platformWeb + '/admin/logCommission',
    method: 'post',
    data: data
  })
}

// 修改佣金领取日志
export function updateLogCommission(data) {
  return request({
    url: url.platformWeb + '/admin/logCommission',
    method: 'put',
    data: data
  })
}

// 删除佣金领取日志
export function delLogCommission(id) {
  return request({
    url: url.platformWeb + '/admin/logCommission/' + id,
    method: 'delete'
  })
}

// 导出佣金领取日志
export function exportLogCommission(query) {
  return request({
    url: url.platformWeb + '/admin/logCommission/export',
    method: 'get',
    params: query
  })
}
