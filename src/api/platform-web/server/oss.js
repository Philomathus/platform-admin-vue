import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询oss文件存储服务配置列表
export function listOss(query) {
  return request({
    url: url.platformWeb + '/server/oss/list',
    method: 'get',
    params: query
  })
}

// 查询oss文件存储服务配置详细
export function getOss(id) {
  return request({
    url: url.platformWeb + '/server/oss/' + id,
    method: 'get'
  })
}

// 新增oss文件存储服务配置
export function addOss(data) {
  return request({
    url: url.platformWeb + '/server/oss',
    method: 'post',
    data: data
  })
}

// 修改oss文件存储服务配置
export function updateOss(data) {
  return request({
    url: url.platformWeb + '/server/oss',
    method: 'put',
    data: data
  })
}

// 删除oss文件存储服务配置
export function delOss(id) {
  return request({
    url: url.platformWeb + '/server/oss/' + id,
    method: 'delete'
  })
}
