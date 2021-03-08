import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘用户列表
export function listWheelUser(query) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser/list',
    method: 'get',
    params: query
  })
}

// 查询转盘用户详细
export function getWheelUser(id) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser/' + id,
    method: 'get'
  })
}

// 新增转盘用户
export function addWheelUser(data) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser',
    method: 'post',
    data: data
  })
}

// 修改转盘用户
export function updateWheelUser(data) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser',
    method: 'put',
    data: data
  })
}

// 删除转盘用户
export function delWheelUser(id) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser/' + id,
    method: 'delete'
  })
}

// 导出转盘用户
export function exportWheelUser(query) {
  return request({
    url: url.platformWeb + '/wheel/wheelUser/export',
    method: 'get',
    params: query
  })
}
