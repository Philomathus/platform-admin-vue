import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【充值返现】列表
export function listActivityCashBack(query) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack/list',
    method: 'get',
    params: query
  })
}

// 查询【充值返现】详细
export function getActivityCashBack(id) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack/' + id,
    method: 'get'
  })
}
export function changeActivityInfoStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/activityCashBack/changeStatus',
    method: 'put',
    data: data
  })
}

// 新增【充值返现】
export function addActivityCashBack(data) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack',
    method: 'post',
    data: data
  })
}

// 修改【充值返现】
export function updateActivityCashBack(data) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack',
    method: 'put',
    data: data
  })
}

// 删除【充值返现】
export function delActivityCashBack(id) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack/' + id,
    method: 'delete'
  })
}

// 导出【充值返现】
export function exportActivityCashBack(query) {
  return request({
    url: url.platformWeb + '/admin/activityCashBack/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
