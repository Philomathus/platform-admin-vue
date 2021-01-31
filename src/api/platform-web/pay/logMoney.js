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

// 导出会员资金信息
export function exportLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoney/export',
    method: 'get',
    params: query
  })
}
