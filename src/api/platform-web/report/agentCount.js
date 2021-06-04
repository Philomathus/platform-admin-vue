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
    params: query,
    timeout: 30000
  })
}
export function exportReportAgentCount(query) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

export function addPromotionCode(data) {
  console.info(data);
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/add',
    method: 'post',
    data: data
  })
}

export function delPromotionCode(data) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/del',
    method: 'delete',
    data: data
  })
}

// 查询【请填写功能名称】列表
export function list(query) {
  return request({
    url: url.platformWeb + '/admin/reportAgentcount/memberAgentList',
    method: 'get',
    params: query
  })
}
