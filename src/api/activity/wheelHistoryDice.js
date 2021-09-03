import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询博饼中奖记录列表
export function listWheelHistoryDice(query) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice/list',
    method: 'get',
    params: query
  })
}

// 查询博饼中奖记录详细
export function getWheelHistoryDice(id) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice/' + id,
    method: 'get'
  })
}

// 新增博饼中奖记录
export function addWheelHistoryDice(data) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice',
    method: 'post',
    data: data
  })
}

// 修改博饼中奖记录
export function updateWheelHistoryDice(data) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice',
    method: 'put',
    data: data
  })
}

// 删除博饼中奖记录
export function delWheelHistoryDice(id) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice/' + id,
    method: 'delete'
  })
}

// 导出博饼中奖记录
export function exportWheelHistoryDice(query) {
  return request({
    url: url.platformWeb + '/admin/wheelHistoryDice/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
