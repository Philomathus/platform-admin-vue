import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listLotteryDiceConfig(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getLotteryDiceConfig(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addLotteryDiceConfig(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateLotteryDiceConfig(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delLotteryDiceConfig(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportLotteryDiceConfig(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/lotteryDiceConfig/changeStatus',
    method: 'put',
    data: data
  })
}
