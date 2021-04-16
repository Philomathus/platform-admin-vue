import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listLiveGuardConfig(query) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表
export function getProp() {
  return request({
    url: url.platformWeb + '/admin/liveProp/getList',
    method: 'get'
  })
}

// 查询【请填写功能名称】详细
export function getLiveGuardConfig(id) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addLiveGuardConfig(data) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateLiveGuardConfig(data) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delLiveGuardConfig(id) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportLiveGuardConfig(query) {
  return request({
    url: url.platformWeb + '/admin/liveGuardConfig/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
