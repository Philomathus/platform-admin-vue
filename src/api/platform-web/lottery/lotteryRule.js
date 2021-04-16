import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询开奖规则说明列表
export function listLotteryRule(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule/list',
    method: 'get',
    params: query
  })
}

// 查询开奖规则说明详细
export function getLotteryRule(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule/' + id,
    method: 'get'
  })
}

// 新增开奖规则说明
export function addLotteryRule(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule',
    method: 'post',
    data: data
  })
}

// 修改开奖规则说明
export function updateLotteryRule(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule',
    method: 'put',
    data: data
  })
}

// 删除开奖规则说明
export function delLotteryRule(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule/' + id,
    method: 'delete'
  })
}

// 导出开奖规则说明
export function exportLotteryRule(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryRule/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
