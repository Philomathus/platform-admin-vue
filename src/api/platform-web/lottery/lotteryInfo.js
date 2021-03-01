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

//彩票种类类型
export function listLotteryRuleName() {
  return request({
    url: url.platformWeb + '/admin/lotteryInfo/lotteryType',
    method: 'get'
  })
}
