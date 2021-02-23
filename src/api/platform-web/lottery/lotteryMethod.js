import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询彩票种类列表
export function listLotteryMethod(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryMethod/list',
    method: 'get',
    params: query
  })
}
