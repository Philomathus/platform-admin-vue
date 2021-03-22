import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listReportStorage(query) {
  return request({
    url: url.platformWeb + '/admin/reportIncomeDay/storage',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/admin/reportIncomeDay/list',
    method: 'get',
    params: query
  })
}


// 查询【请填写功能名称】列表
export function count(query) {
  return request({
    url: url.platformWeb + '/admin/reportIncomeDay/count',
    method: 'get',
    params: query
  })
}
export function exportReportIncomeDay(query) {
  return request({
    url: url.platformWeb + '/admin/reportIncomeDay/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
