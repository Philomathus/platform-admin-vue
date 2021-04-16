import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘奖励列表
export function listWheelPrize(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize/list',
    method: 'get',
    params: query
  })
}

// 查询转盘奖励详细
export function getWheelPrize(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize/' + id,
    method: 'get'
  })
}

// 新增转盘奖励
export function addWheelPrize(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize',
    method: 'post',
    data: data
  })
}

// 修改转盘奖励
export function updateWheelPrize(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize',
    method: 'put',
    data: data
  })
}

// 删除转盘奖励
export function delWheelPrize(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize/' + id,
    method: 'delete'
  })
}

// 导出转盘奖励
export function exportWheelPrize(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelPrize/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
