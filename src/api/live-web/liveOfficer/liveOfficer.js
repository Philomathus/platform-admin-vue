import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询房管管理列表
export function listLiveOfficer(query) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer/list',
    method: 'get',
    params: query
  })
}

// 查询房管管理详细
export function getLiveOfficer(id) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer/' + id,
    method: 'get'
  })
}

// 新增房管管理
export function addLiveOfficer(data) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer',
    method: 'post',
    data: data
  })
}

// 修改房管管理
export function updateLiveOfficer(data) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer',
    method: 'put',
    data: data
  })
}

// 删除房管管理 delete live officer management
export function delLiveOfficer(id) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer/' + id,
    method: 'delete'
  })
}

// 导出房管管理
export function exportLiveOfficer(query) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
