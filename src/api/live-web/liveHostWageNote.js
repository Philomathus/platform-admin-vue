import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询主播时长列表
export function listLiveHostWageNote(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/list',
    method: 'get',
    params: query
  })
}

// 查询主播时长列表
export function listFamilyPage(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/familyPage',
    method: 'get',
    params: query
  })
}

// 查询主播时长列表
export function getPage(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/getPage',
    method: 'get',
    params: query
  })
}

// 查询主播时长详细
export function getLiveHostWageNote(id) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/' + id,
    method: 'get'
  })
}

// 新增主播时长
export function addLiveHostWageNote(data) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote',
    method: 'post',
    data: data
  })
}

// 修改主播时长
export function updateLiveHostWageNote(data) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote',
    method: 'put',
    data: data
  })
}

// 删除主播时长
export function delLiveHostWageNote(id) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/' + id,
    method: 'delete'
  })
}

// 导出主播时长
export function exportLiveHostWageNote(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/export',
    method: 'get',
    params: query
  })
}
