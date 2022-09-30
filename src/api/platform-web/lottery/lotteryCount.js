import request from '@/utils/request'
import {url} from '@/utils/url'

//- > Lottery Count list api
export function listLotteryCount(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryCount/list',
    method: 'get',
    params: query
  })
}
