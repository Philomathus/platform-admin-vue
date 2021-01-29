import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询直播流服务配置列表
export function listLive(query) {
  return request({
    url: url.platformWeb + '/server/live/list',
    method: 'get',
    params: query
  })
}

// 查询直播流服务配置详细
export function getLive(id) {
  return request({
    url: url.platformWeb + '/server/live/' + id,
    method: 'get'
  })
}

// 新增直播流服务配置
export function addLive(data) {
  return request({
    url: url.platformWeb + '/server/live',
    method: 'post',
    data: data
  })
}

// 修改直播流服务配置
export function updateLive(data) {
  return request({
    url: url.platformWeb + '/server/live',
    method: 'put',
    data: data
  })
}

// 删除直播流服务配置
export function delLive(id) {
  return request({
    url: url.platformWeb + '/server/live/' + id,
    method: 'delete'
  })
}

export function effectLive(id, status) {
  return request({
    url: url.platformWeb + '/server/live/changeStatus/' + id + '/' + status,
    method: 'put'
  })
}
