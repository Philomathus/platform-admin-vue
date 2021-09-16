import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询坐骑领取记录列表
export function listLiveUserMount(query) {
  return request({
    url: url.platformWeb + '/live/liveUserMount/list',
    method: 'get',
    params: query
  })
}

// 查询坐骑领取记录详细
export function getLiveUserMount(id) {
  return request({
    url: url.platformWeb + '/live/liveUserMount/' + id,
    method: 'get'
  })
}

//坐骑名称列表
export function mountNames() {
  return request({
    url: url.platformWeb + '/live/liveUserMount/mountNames',
    method: 'get'
  })
}

// 新增坐骑领取记录
export function addLiveUserMount(data) {
  return request({
    url: url.platformWeb + '/live/liveUserMount',
    method: 'post',
    data: data
  })
}

// 修改坐骑领取记录
export function updateLiveUserMount(data) {
  return request({
    url: url.platformWeb + '/live/liveUserMount',
    method: 'put',
    data: data
  })
}

// 删除坐骑领取记录
export function delLiveUserMount(id) {
  return request({
    url: url.platformWeb + '/live/liveUserMount/' + id,
    method: 'delete'
  })
}

// 导出坐骑领取记录
export function exportLiveUserMount(query) {
  return request({
    url: url.platformWeb + '/live/liveUserMount/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
