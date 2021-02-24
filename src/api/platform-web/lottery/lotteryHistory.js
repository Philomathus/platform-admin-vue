import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询开奖历史列表
export function listLotteryHistory(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/list',
    method: 'get',
    params: query
  })
}
