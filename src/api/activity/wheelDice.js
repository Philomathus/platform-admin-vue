import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询中秋博饼列表
export function listWheelDice(query) {
  return request({
    url: url.platformWeb + '/admin/wheelDice/list',
    method: 'get',
    params: query
  })
}

// 查询中秋博饼详细
export function getWheelDice(id) {
  return request({
    url: url.platformWeb + '/admin/wheelDice/' + id,
    method: 'get'
  })
}

// 新增中秋博饼
export function addWheelDice(data) {
  return request({
    url: url.platformWeb + '/admin/wheelDice',
    method: 'post',
    data: data
  })
}

// 修改中秋博饼
export function updateWheelDice(data) {
  return request({
    url: url.platformWeb + '/admin/wheelDice',
    method: 'put',
    data: data
  })
}

// 删除中秋博饼
export function delWheelDice(id) {
  return request({
    url: url.platformWeb + '/admin/wheelDice/' + id,
    method: 'delete'
  })
}

// 导出中秋博饼
export function exportWheelDice(query) {
  return request({
    url: url.platformWeb + '/admin/wheelDice/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
