import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询转盘彩票列表
export function listWheelLottery(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery/list',
    method: 'get',
    params: query
  })
}

// 查询转盘彩票详细
export function getWheelLottery(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery/' + id,
    method: 'get'
  })
}

// 新增转盘彩票
export function addWheelLottery(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery',
    method: 'post',
    data: data
  })
}

// 修改转盘彩票
export function updateWheelLottery(data) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery',
    method: 'put',
    data: data
  })
}

// 删除转盘彩票
export function delWheelLottery(id) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery/' + id,
    method: 'delete'
  })
}

// 导出转盘彩票
export function exportWheelLottery(query) {
  return request({
    url: url.platformWeb + '/lottery/wheelLottery/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
