import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询主播提现管理列表
export function listLiveUserWithdrawNewlog(query) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/list',
    method: 'get',
    params: query
  })
}

// 查询主播提现管理详细
export function getLiveUserWithdrawNewlog(id) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/' + id,
    method: 'get'
  })
}

// 新增主播提现管理
export function addLiveUserWithdrawNewlog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog',
    method: 'post',
    data: data
  })
}

// 修改主播提现管理
export function updateLiveUserWithdrawNewlog(data) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog',
    method: 'put',
    data: data
  })
}

// 删除主播提现管理
export function delLiveUserWithdrawNewlog(id) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/' + id,
    method: 'delete'
  })
}

// 导出主播提现管理
export function exportLiveUserWithdrawNewlog(query) {
  return request({
    url: url.platformWeb + '/live-web/liveUserWithdrawNewlog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
