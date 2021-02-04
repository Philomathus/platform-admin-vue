import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询直播列表
export function listLiveVideo(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/list',
    method: 'get',
    params: query
  })
}

// 查询直播详细
export function getLiveVideo(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/' + id,
    method: 'get'
  })
}

export function close(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/close/' + id,
    method: 'get'
  })
}

// 新增直播
export function addLiveVideo(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideo',
    method: 'post',
    data: data
  })
}

// 修改直播
export function updateLiveVideo(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideo',
    method: 'put',
    data: data
  })
}

// 修改直播
export function updateLivePay(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/livePay',
    method: 'put',
    data: data
  })
}
// 删除直播
export function delLiveVideo(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/' + id,
    method: 'delete'
  })
}

// 导出直播
export function exportLiveVideo(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/export',
    method: 'get',
    params: query
  })
}
