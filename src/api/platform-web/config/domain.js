import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询域名配置列表
export function listDomain(query) {
  return request({
    url: url.platformWeb + '/config/domain/list',
    method: 'get',
    params: query
  })
}

// 查询域名配置详细
export function getDomain(id) {
  return request({
    url: url.platformWeb + '/config/domain/' + id,
    method: 'get'
  })
}

// 新增域名配置
export function addDomain(data) {
  return request({
    url: url.platformWeb + '/config/domain',
    method: 'post',
    data: data
  })
}

// 修改域名配置
export function updateDomain(data) {
  return request({
    url: url.platformWeb + '/config/domain',
    method: 'put',
    data: data
  })
}

// 删除域名配置
export function delDomain(id) {
  return request({
    url: url.platformWeb + '/config/domain/' + id,
    method: 'delete'
  })
}
