import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员资金信息列表
export function listLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/list',
    method: 'get',
    params: query
  })
}

// 行为类型统计
export function listCount(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/listCount',
    method: 'get',
    params: query
  })
}

// 查询会员资金信息统计
export function totalCount(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/totalCount',
    method: 'get',
    params: query
  })
}

// 导出会员资金信息
export function exportLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
