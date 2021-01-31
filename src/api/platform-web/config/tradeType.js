import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询资金交易类型列表
export function listTradeType(query) {
  return request({
    url: url.platformWeb + '/config/tradeType/list',
    method: 'get',
    params: query
  })
}

// 查询资金交易类型列表
export function allTradeType() {
  return request({
    url: url.platformWeb + '/config/tradeType/all',
    method: 'get'
  })
}

// 查询资金交易类型详细
export function getTradeType(type) {
  return request({
    url: url.platformWeb + '/config/tradeType/' + type,
    method: 'get'
  })
}

// 新增资金交易类型
export function addTradeType(data) {
  return request({
    url: url.platformWeb + '/config/tradeType',
    method: 'post',
    data: data
  })
}

// 修改资金交易类型
export function updateTradeType(data) {
  return request({
    url: url.platformWeb + '/config/tradeType',
    method: 'put',
    data: data
  })
}

// 删除资金交易类型
export function delTradeType(type) {
  return request({
    url: url.platformWeb + '/config/tradeType/' + type,
    method: 'delete'
  })
}
