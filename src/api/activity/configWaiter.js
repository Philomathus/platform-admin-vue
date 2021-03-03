import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询客服管理列表
export function listConfigWaiter(query) {
  return request({
    url: url.platformWeb + '/admin/configWaiter/list',
    method: 'get',
    params: query
  })
}

// 查询客服管理详细
export function getConfigWaiter(id) {
  return request({
    url: url.platformWeb + '/admin/configWaiter/' + id,
    method: 'get'
  })
}

// 新增客服管理
export function addConfigWaiter(data) {
  return request({
    url: url.platformWeb + '/admin/configWaiter',
    method: 'post',
    data: data
  })
}

// 修改客服管理
export function updateConfigWaiter(data) {
  return request({
    url: url.platformWeb + '/admin/configWaiter',
    method: 'put',
    data: data
  })
}

// 删除客服管理
export function delConfigWaiter(id) {
  return request({
    url: url.platformWeb + '/admin/configWaiter/' + id,
    method: 'delete'
  })
}

// 导出客服管理
export function exportConfigWaiter(query) {
  return request({
    url: url.platformWeb + '/admin/configWaiter/export',
    method: 'get',
    params: query
  })
}

// 状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/configWaiter/changeStatus',
    method: 'put',
    data: data
  })
}
