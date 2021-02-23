import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询彩票即时信息列表
export function listLotteryTemp(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryTemp/list',
    method: 'get',
    params: query
  })
}
