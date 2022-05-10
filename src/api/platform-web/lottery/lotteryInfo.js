import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询彩票名称列表
export function listLotteryInfo(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryInfo/list',
    method: 'get',
    params: query
  })
}

// 查询彩票名称详细
export function getLotteryInfo(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryInfo/' + id,
    method: 'get'
  })
}

// 修改彩票名称
export function updateLotteryInfo(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryInfo',
    method: 'put',
    data: data
  })
}

// 修改主播禁播状态- Lottery Status Handler Url
export function statusDetail(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryInfo/statusDetail',
    method: 'put',
    params: query
  })
}
