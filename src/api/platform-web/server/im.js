import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询IM即时通讯服务配置列表
export function listIm(query) {
  return request({
    url: url.platformWeb + '/server/im/list',
    method: 'get',
    params: query
  })
}

// 查询IM即时通讯服务配置详细
export function getIm(id) {
  return request({
    url: url.platformWeb + '/server/im/' + id,
    method: 'get'
  })
}

// 新增IM即时通讯服务配置
export function addIm(data) {
  return request({
    url: url.platformWeb + '/server/im',
    method: 'post',
    data: data
  })
}

// 修改IM即时通讯服务配置
export function updateIm(data) {
  return request({
    url: url.platformWeb + '/server/im',
    method: 'put',
    data: data
  })
}

// 删除IM即时通讯服务配置
export function delIm(id) {
  return request({
    url: url.platformWeb + '/server/im/' + id,
    method: 'delete'
  })
}
