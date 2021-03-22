import request from '@/utils/request'
import {url} from '@/utils/url'
// 查询【请填写功能名称】列表
export function liststorage(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-games/storage',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function list(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-games/list',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function count(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-games/count',
    method: 'get',
    params: query
  })
}

export function exportReportPlamGames(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-games/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
