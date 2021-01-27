import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询推广设置列表
export function listConfigRecommend(query) {
  return request({
    url: url.platformWeb + '/admin/configRecommend/list',
    method: 'get',
    params: query
  })
}

// 查询推广设置详细
export function getConfigRecommend(id) {
  return request({
    url: url.platformWeb + '/admin/configRecommend/' + id,
    method: 'get'
  })
}

// 新增推广设置
export function addConfigRecommend(data) {
  return request({
    url: url.platformWeb + '/admin/configRecommend',
    method: 'post',
    data: data
  })
}

// 修改推广设置
export function updateConfigRecommend(data) {
  return request({
    url: url.platformWeb + '/admin/configRecommend',
    method: 'put',
    data: data
  })
}

// 删除推广设置
export function delConfigRecommend(id) {
  return request({
    url: url.platformWeb + '/admin/configRecommend/' + id,
    method: 'delete'
  })
}

// 导出推广设置
export function exportConfigRecommend(query) {
  return request({
    url: url.platformWeb + '/admin/configRecommend/export',
    method: 'get',
    params: query
  })
}
