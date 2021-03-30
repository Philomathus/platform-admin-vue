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

//重新派奖
export function changeStatus(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/changeStatus' + id,
    method: 'post',
  })
}


//全部彩种
export function lotteryInfoName() {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/lotteryName',
    method: 'get'
  })
}
