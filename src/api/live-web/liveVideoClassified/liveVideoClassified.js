import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询分类列表
export function listLiveVideoClassified(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified/list',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getLiveVideoClassified(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified/' + id,
    method: 'get'
  })
}

// 新增分类
export function addLiveVideoClassified(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateLiveVideoClassified(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified',
    method: 'put',
    data: data
  })
}

// 删除分类
export function delLiveVideoClassified(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified/' + id,
    method: 'delete'
  })
}

// 导出分类
export function exportLiveVideoClassified(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoClassified/export',
    method: 'get',
    params: query
  })
}
