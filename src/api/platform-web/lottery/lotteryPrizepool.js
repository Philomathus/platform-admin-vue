import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询奖池配置列表
export function listLotteryPrizepool(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool/list',
    method: 'get',
    params: query
  })
}

// 查询奖池配置详细
export function getLotteryPrizepool(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool/' + id,
    method: 'get'
  })
}

// 新增奖池配置
export function addLotteryPrizepool(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool',
    method: 'post',
    data: data
  })
}

// 修改奖池配置
export function updateLotteryPrizepool(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool',
    method: 'put',
    data: data
  })
}

// 删除奖池配置
export function delLotteryPrizepool(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool/' + id,
    method: 'delete'
  })
}

// 导出奖池配置
export function exportLotteryPrizepool(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizepool/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
