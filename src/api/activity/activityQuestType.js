import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询任务类型列表
export function listActivityQuestType(query) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType/list',
    method: 'get',
    params: query
  })
}

// 查询任务类型详细
export function getActivityQuestType(id) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType/' + id,
    method: 'get'
  })
}

// 新增任务类型
export function addActivityQuestType(data) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType',
    method: 'post',
    data: data
  })
}

// 修改任务类型
export function updateActivityQuestType(data) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType',
    method: 'put',
    data: data
  })
}

// 删除任务类型
export function delActivityQuestType(id) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType/' + id,
    method: 'delete'
  })
}

// 导出任务类型
export function exportActivityQuestType(query) {
  return request({
    url: url.platformWeb + '/admin/activityQuestType/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
