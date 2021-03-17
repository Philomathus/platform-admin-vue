import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询家族直播时长列表
export function listFamilyWageNotePage(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/familyPage',
    method: 'get',
    params: query
  })
}

// 查询主播统计时长列表
export function listHostWageNotePage(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/hostPage',
    method: 'get',
    params: query
  })
}

// 导出家族直播时长
export function exportFamilyWageNote(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/exportFamily',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 导出主播统计时长
export function exportHostWageNote(query) {
  return request({
    url: url.platformWeb + '/admin/liveHostWageNote/exportHost',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

