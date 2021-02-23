import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询下注列表
export function listLotteryGame(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryGame/list',
    method: 'get',
    params: query
  })
}

// 查询下注详细
export function getLotteryGame(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryGame/' + id,
    method: 'get'
  })
}

// 修改下注
export function updateLotteryGame(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryGame',
    method: 'put',
    data: data
  })
}
