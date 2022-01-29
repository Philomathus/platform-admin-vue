import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listLotteryHistoryDice(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getLotteryHistoryDice(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addLotteryHistoryDice(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateLotteryHistoryDice(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delLotteryHistoryDice(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportLotteryHistoryDice(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistoryDice/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
