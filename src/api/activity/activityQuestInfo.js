import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询任务信息列表
export function listActivityQuestInfo(query) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo/list',
    method: 'get',
    params: query
  })
}

// 查询任务信息详细
export function getActivityQuestInfo(id) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo/' + id,
    method: 'get'
  })
}

// 新增任务信息
export function addActivityQuestInfo(data) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo',
    method: 'post',
    data: data
  })
}

// 修改任务信息
export function updateActivityQuestInfo(data) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo',
    method: 'put',
    data: data
  })
}

// 删除任务信息
export function delActivityQuestInfo(id) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo/' + id,
    method: 'delete'
  })
}

// 导出任务信息
export function exportActivityQuestInfo(query) {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo/export',
    method: 'get',
    params: query
  })
}

//活动类型
export function activityQuestTypes() {
  return request({
    url: url.platformWeb + '/admin/activityQuestInfo/activityQuestType',
    method: 'get'
  })
}

