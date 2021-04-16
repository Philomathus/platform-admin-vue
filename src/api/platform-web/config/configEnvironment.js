import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listConfigEnvironment(query) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConfigEnvironment(envCode) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/' + envCode,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConfigEnvironment(data) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConfigEnvironment(data) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment',
    method: 'put',
    data: data
  })
}

// 批量修改【请填写功能名称】
export function updateConfigEnvironmentList(data) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/editList',
    method: 'post',
    data: data
  })
}

// 批量修改【请填写功能名称】
export function getTitleIndex(data) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/getTitleIndex',
    method: 'get',
    params: data
  })
}

// 删除【请填写功能名称】
export function delConfigEnvironment(envCode) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/' + envCode,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportConfigEnvironment(query) {
  return request({
    url: url.platformWeb + '/admin/configEnvironment/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
