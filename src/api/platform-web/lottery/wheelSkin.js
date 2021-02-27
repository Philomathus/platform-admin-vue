import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘皮肤列列表
export function listWheelSkin(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin/list',
    method: 'get',
    params: query
  })
}

// 查询转盘皮肤列详细
export function getWheelSkin(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin/' + id,
    method: 'get'
  })
}

// 新增转盘皮肤列
export function addWheelSkin(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin',
    method: 'post',
    data: data
  })
}

// 修改转盘皮肤列
export function updateWheelSkin(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin',
    method: 'put',
    data: data
  })
}

// 删除转盘皮肤列
export function delWheelSkin(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin/' + id,
    method: 'delete'
  })
}

// 导出转盘皮肤列
export function exportWheelSkin(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelSkin/export',
    method: 'get',
    params: query
  })
}
