import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询主播投诉记录列表
export function listLiveComplaint(query) {
  return request({
    url: url.platformWeb + '/admin/liveComplaint/list',
    method: 'get',
    params: query
  })
}

// 查询主播投诉记录详细
export function getLiveComplaint(id) {
  return request({
    url: url.platformWeb + '/admin/liveComplaint/' + id,
    method: 'get'
  })
}

// 新增主播投诉记录
export function addLiveComplaint(data) {
  return request({
    url: url.platformWeb + '/admin/liveComplaint',
    method: 'post',
    data: data
  })
}

// 修改主播投诉记录
export function updateLiveComplaint(id,comments,status) {
  const data = {
    id : id,
    comments : comments,
    status : status
  }
  return request({
    url: url.platformWeb + '/admin/liveComplaint',
    method: 'put',
    data: data
  })
}

// 删除主播投诉记录
export function delLiveComplaint(id) {
  return request({
    url: url.platformWeb + '/admin/liveComplaint/' + id,
    method: 'delete'
  })
}

// 导出主播投诉记录
export function exportLiveComplaint(query) {
  return request({
    url: url.platformWeb + '/admin/liveComplaint/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
