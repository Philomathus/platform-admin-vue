import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listLotteryPrize(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getLotteryPrize(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addLotteryPrize(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateLotteryPrize(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delLotteryPrize(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportLotteryPrize(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryPrize/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
