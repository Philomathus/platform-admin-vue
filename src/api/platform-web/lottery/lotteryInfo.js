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
