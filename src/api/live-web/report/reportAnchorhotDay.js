import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询贡献榜列表
export function listReportAnchorhotDay(query) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay/list',
    method: 'get',
    params: query
  })
}

// 查询贡献榜详细
export function getReportAnchorhotDay(repId) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay/' + repId,
    method: 'get'
  })
}

// 新增贡献榜
export function addReportAnchorhotDay(data) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay',
    method: 'post',
    data: data
  })
}

// 修改贡献榜
export function updateReportAnchorhotDay(data) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay',
    method: 'put',
    data: data
  })
}

// 删除贡献榜
export function delReportAnchorhotDay(repId) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay/' + repId,
    method: 'delete'
  })
}

// 导出贡献榜
export function exportReportAnchorhotDay(query) {
  return request({
    url: url.platformWeb + '/admin/reportAnchorhotDay/export',
    method: 'get',
    params: query
  })
}
