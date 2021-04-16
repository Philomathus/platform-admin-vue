import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员发言列表
export function listLiveVideoChat(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat/list',
    method: 'get',
    params: query
  })
}

// 查询会员发言详细
export function getLiveVideoChat(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat/' + id,
    method: 'get'
  })
}

// 新增会员发言
export function addLiveVideoChat(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat',
    method: 'post',
    data: data
  })
}

// 修改会员发言
export function updateLiveVideoChat(data) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat',
    method: 'put',
    data: data
  })
}

// 删除会员发言
export function delLiveVideoChat(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat/' + id,
    method: 'delete'
  })
}

// 导出会员发言
export function exportLiveVideoChat(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoChat/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
