import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【支付类型】列表
export function listPayType(query) {
  return request({
    url: url.platformWeb + '/pay/payType/list',
    method: 'get',
    params: query
  })
}

// 查询【支付类型】详细
export function getPayType(id) {
  return request({
    url: url.platformWeb + '/pay/payType/' + id,
    method: 'get'
  })
}

// 支付类型状态修改
export function changePayTypeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/pay/payType/changeStatus',
    method: 'put',
    data: data
  })
}
// 支付类型是否推荐修改
export function changeRecommendStatus(id, isRecommend) {
  const data = {
    id,
    isRecommend
  }
  return request({
    url: url.platformWeb + '/pay/payType/changeStatus',
    method: 'put',
    data: data
  })
}


// 新增【支付类型】
export function addPayType(data) {
  return request({
    url: url.platformWeb + '/pay/payType',
    method: 'post',
    data: data
  })
}

// 修改【支付类型】
export function updatePayType(data) {
  return request({
    url: url.platformWeb + '/pay/payType',
    method: 'put',
    data: data
  })
}

// 删除【支付类型】
export function delPayType(id) {
  return request({
    url: url.platformWeb + '/payType/' + id,
    method: 'delete'
  })
}

// 导出【支付类型】
export function exportPayType(query) {
  return request({
    url: url.platformWeb + '/payType/export',
    method: 'get',
    params: query
  })
}
