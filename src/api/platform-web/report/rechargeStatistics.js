import request from '@/utils/request'
import {url} from '@/utils/url'
export function liststorage(query) {
  return request({
    url: url.platformWeb + '/web/report-moneyinfo/storage',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/web/report-moneyinfo/list',
    method: 'get',
    params: query
  })
}
// 查询【请填写功能名称】列表
export function count(query) {
  return request({
    url: url.platformWeb + '/web/report-moneyinfo/count',
    method: 'get',
    params: query
  })
}

export function exportReportMonwyInfo(query) {
  return request({
    url: url.platformWeb + '/web/report-moneyinfo/export',
    method: 'get',
    params: query
  })
}

