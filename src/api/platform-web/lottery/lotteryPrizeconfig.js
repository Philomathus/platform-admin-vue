import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询开奖配置列表
export function listLotteryPrizeconfig(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig/list',
    method: 'get',
    params: query
  })
}

// 查询开奖配置详细
export function getLotteryPrizeconfig(lotteryId) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig/' + lotteryId,
    method: 'get'
  })
}

//全部彩种
export function LotteryInfoName() {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig/lotteryName',
    method: 'get'
  })
}

// 新增开奖配置
export function addLotteryPrizeconfig(data) {
  console.info(data)
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig',
    method: 'post',
    data: data
  })
}

// 修改开奖配置
export function updateLotteryPrizeconfig(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig',
    method: 'put',
    data: data
  })
}

// 删除开奖配置
export function delLotteryPrizeconfig(lotteryId) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig/' + lotteryId,
    method: 'delete'
  })
}

// 导出开奖配置
export function exportLotteryPrizeconfig(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrizeconfig/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
