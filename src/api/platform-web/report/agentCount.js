import request from '@/utils/request'
import {url} from '@/utils/url'
export function liststorage(query) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/storage',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/list',
    method: 'get',
    params: query
  })
}
export function exportReportAgentCount(query) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/export',
    method: 'get',
    params: query
  })
}

