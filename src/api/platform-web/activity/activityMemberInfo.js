import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员推广管理列表
export function listActivityMemberInfo(query) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo/list',
    method: 'get',
    params: query
  })
}

// 查询会员ip重复
export function ipList(query) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo/ipList',
    method: 'get',
    params: query
  })
}

// 查询会员推广管理详细
export function getActivityMemberInfo(id) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo/' + id,
    method: 'get'
  })
}

// 新增会员推广管理
export function addActivityMemberInfo(data) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo',
    method: 'post',
    data: data
  })
}

// 修改会员推广管理
export function updateActivityMemberInfo(data) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo',
    method: 'put',
    data: data
  })
}

// 删除会员推广管理
export function delActivityMemberInfo(id) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo/' + id,
    method: 'delete'
  })
}

// 导出会员推广管理
export function exportActivityMemberInfo(query) {
  return request({
    url: url.platformWeb + '/activity/activityMemberInfo/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
