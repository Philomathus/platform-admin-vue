import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listWheelDiceConfig(query) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getWheelDiceConfig(id) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addWheelDiceConfig(data) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateWheelDiceConfig(data) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delWheelDiceConfig(id) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig/' + id,
    method: 'delete'
  })
}
export function changeLotteryInfoStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig/changeStatus',
    method: 'put',
    data: data
  })
}
// 导出【请填写功能名称】
export function exportWheelDiceConfig(query) {
  return request({
    url: url.platformWeb + '/admin/wheelDiceConfig/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
