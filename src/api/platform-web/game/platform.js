import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询游戏平台列表
export function listGamePlatform(query) {
  return request({
    url: url.platformWeb + '/game/platform/list',
    method: 'get',
    params: query
  })
}

// 查询游戏平台详细
export function getGamePlatform(id) {
  return request({
    url: url.platformWeb + '/game/platform/' + id,
    method: 'get'
  })
}

// 新增游戏平台
export function addGamePlatform(data) {
  return request({
    url: url.platformWeb + '/game/platform',
    method: 'post',
    data: data
  })
}

// 修改游戏平台
export function updateGamePlatform(data) {
  return request({
    url: url.platformWeb + '/game/platform',
    method: 'put',
    data: data
  })
}

// 删除游戏平台
export function delGamePlatform(id) {
  return request({
    url: url.platformWeb + '/game/platform/' + id,
    method: 'delete'
  })
}
// 导出游戏平台
export function exportGamePlatform(query) {
  return request({
    url: url.platformWeb + '/game/platform/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
// 用户状态修改
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/game/platform/changeStatus',
    method: 'put',
    data: data
  })
}
export function getGameTpyeList() {
  return request({
    url: url.platformWeb + '/game/type/list' ,
    method: 'get'
  })
}
