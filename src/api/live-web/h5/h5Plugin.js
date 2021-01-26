import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listH5Plugin(query) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getH5Plugin(id) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addH5Plugin(data) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateH5Plugin(data) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delH5Plugin(id) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportH5Plugin(query) {
  return request({
    url: url.platformWeb + '/admin/h5Plugin/export',
    method: 'get',
    params: query
  })
}
