import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘中奖历史列表
export function listWheelHistory(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory/list',
    method: 'get',
    params: query
  })
}

// 查询转盘中奖历史详细
export function getWheelHistory(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory/' + id,
    method: 'get'
  })
}

// 新增转盘中奖历史
export function addWheelHistory(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory',
    method: 'post',
    data: data
  })
}

// 修改转盘中奖历史
export function updateWheelHistory(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory',
    method: 'put',
    data: data
  })
}

// 删除转盘中奖历史
export function delWheelHistory(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory/' + id,
    method: 'delete'
  })
}

// 导出转盘中奖历史
export function exportWheelHistory(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelHistory/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
