import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询系统公告列表
export function listHomeNotice(query) {
  return request({
    url: url.platformWeb + '/activity/homeNotice/list',
    method: 'get',
    params: query
  })
}

// 查询系统公告详细
export function getHomeNotice(id) {
  return request({
    url: url.platformWeb + '/activity/homeNotice/' + id,
    method: 'get'
  })
}

// 新增系统公告
export function addHomeNotice(data) {
  return request({
    url: url.platformWeb + '/activity/homeNotice',
    method: 'post',
    data: data
  })
}

// 修改系统公告
export function updateHomeNotice(data) {
  return request({
    url: url.platformWeb + '/activity/homeNotice',
    method: 'put',
    data: data
  })
}

// 删除系统公告
export function delHomeNotice(id) {
  return request({
    url: url.platformWeb + '/activity/homeNotice/' + id,
    method: 'delete'
  })
}

// 导出系统公告
export function exportHomeNotice(query) {
  return request({
    url: url.platformWeb + '/activity/homeNotice/export',
    method: 'get',
    params: query
  })
}
