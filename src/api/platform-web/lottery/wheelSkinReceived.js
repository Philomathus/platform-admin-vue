import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘皮肤领取列表
export function listWheelSkinReceived(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived/list',
    method: 'get',
    params: query
  })
}

// 查询转盘皮肤领取详细
export function getWheelSkinReceived(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived/' + id,
    method: 'get'
  })
}

// 新增转盘皮肤领取
export function addWheelSkinReceived(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived',
    method: 'post',
    data: data
  })
}

// 修改转盘皮肤领取
export function updateWheelSkinReceived(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived',
    method: 'put',
    data: data
  })
}

// 删除转盘皮肤领取
export function delWheelSkinReceived(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived/' + id,
    method: 'delete'
  })
}

// 导出转盘皮肤领取
export function exportWheelSkinReceived(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkinReceived/export',
    method: 'get',
    params: query
  })
}
