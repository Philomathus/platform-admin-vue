import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询支付下单日志列表
export function listPayLog(query) {
  return request({
    url: url.platformWeb + '/pay/payLog/list',
    method: 'get',
    params: query
  })
}

// 查询支付下单日志详细
export function getPayLog(id) {
  return request({
    url: url.platformWeb + '/pay/payLog/' + id,
    method: 'get'
  })
}

// 新增支付下单日志
export function addPayLog(data) {
  return request({
    url: url.platformWeb + '/pay/payLog',
    method: 'post',
    data: data
  })
}

// 修改支付下单日志
export function updatePayLog(data) {
  return request({
    url: url.platformWeb + '/pay/payLog',
    method: 'put',
    data: data
  })
}

// 删除支付下单日志
export function delPayLog(id) {
  return request({
    url: url.platformWeb + '/pay/payLog/' + id,
    method: 'delete'
  })
}

// 导出支付下单日志
export function exportPayLog(query) {
  return request({
    url: url.platformWeb + '/pay/payLog/export',
    method: 'get',
    params: query
  })
}
