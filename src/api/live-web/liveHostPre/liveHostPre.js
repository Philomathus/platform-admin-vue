import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询主播开播时间预约列表
export function listLiveHostPre(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre/list',
    method: 'get',
    params: query
  })
}

// 查询主播开播时间预约详细
export function getLiveHostPre(id) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre/' + id,
    method: 'get'
  })
}

// 新增主播开播时间预约
export function addLiveHostPre(data) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre',
    method: 'post',
    data: data
  })
}

// 修改主播开播时间预约
export function updateLiveHostPre(data) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre',
    method: 'put',
    data: data
  })
}

// 删除主播开播时间预约
export function delLiveHostPre(id) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre/' + id,
    method: 'delete'
  })
}

// 导出主播开播时间预约
export function exportLiveHostPre(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostPre/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
