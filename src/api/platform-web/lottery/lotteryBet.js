import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询用户投资行为列表
export function listLotteryBet0(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0/list',
    method: 'get',
    params: query
  })
}

// 查询用户投资行为详细
export function getLotteryBet0(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0/' + id,
    method: 'get'
  })
}

// 新增用户投资行为
export function addLotteryBet0(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0',
    method: 'post',
    data: data
  })
}

// 修改用户投资行为
export function updateLotteryBet0(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0',
    method: 'put',
    data: data
  })
}

// 删除用户投资行为
export function delLotteryBet0(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0/' + id,
    method: 'delete'
  })
}

// 导出用户投资行为
export function exportLotteryBet0(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryBet0/export',
    method: 'get',
    params: query
  })
}
