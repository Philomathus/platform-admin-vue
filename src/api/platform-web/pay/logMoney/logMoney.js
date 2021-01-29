import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getLogMoney(id) {
  return request({
    url: url.platformWeb + '/pay/logMoney/' + id,
    method: 'get'
  })
}

export function configMoneydes() {
  return request({
    url: url.platformWeb + '/pay/configMoneydes/moneydes',
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addLogMoney(data) {
  return request({
    url: url.platformWeb + '/pay/logMoney',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateLogMoney(data) {
  return request({
    url: url.platformWeb + '/pay/logMoney',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delLogMoney(id) {
  return request({
    url: url.platformWeb + '/pay/logMoney/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/export',
    method: 'get',
    params: query
  })
}
