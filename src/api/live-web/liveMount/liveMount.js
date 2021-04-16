import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询礼物列列表
export function listLiveMount(query) {
  return request({
    url: url.platformWeb + '/admin/liveMount/list',
    method: 'get',
    params: query
  })
}

// 查询礼物列详细
export function getLiveMount(id) {
  return request({
    url: url.platformWeb + '/admin/liveMount/' + id,
    method: 'get'
  })
}

// 新增礼物列
export function addLiveMount(data) {
  return request({
    url: url.platformWeb + '/admin/liveMount',
    method: 'post',
    data: data
  })
}

// 修改礼物列
export function updateLiveMount(data) {
  return request({
    url: url.platformWeb + '/admin/liveMount',
    method: 'put',
    data: data
  })
}

// 删除礼物列
export function delLiveMount(id) {
  return request({
    url: url.platformWeb + '/admin/liveMount/' + id,
    method: 'delete'
  })
}

// 导出礼物列
export function exportLiveMount(query) {
  return request({
    url: url.platformWeb + '/admin/liveMount/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
