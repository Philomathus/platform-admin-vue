import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询金币市场列表
export function listOrder(query) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order/list',
    method: 'get',
    params: query
  })
}

// 查询金币市场详细
export function getOrder(orderId) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order/' + orderId,
    method: 'get'
  })
}

// 新增金币市场
export function addOrder(data) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order',
    method: 'post',
    data: data
  })
}

// 修改金币市场
export function updateOrder(data) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order',
    method: 'put',
    data: data
  })
}

// 删除金币市场
export function delOrder(orderId) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order/' + orderId,
    method: 'delete'
  })
}

// 导出金币市场
export function exportOrder(query) {
  return request({
    url: url.goldMarketWeb + '/orderAdmin/order/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
