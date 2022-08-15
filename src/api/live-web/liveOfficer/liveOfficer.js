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

// 新增房管管理
export function addLiveOfficer(data) {
  return request({
    url: url.platformWeb + '/admin/liveOfficer',
    method: 'post',
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
