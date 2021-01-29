import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listGamePlatform(query) {
  return request({
    url: url.platformWeb + '/web/game-platform/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getGamePlatform(id) {
  return request({
    url: url.platformWeb + '/web/game-platform/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addGamePlatform(data) {
  return request({
    url: url.platformWeb + '/web/game-platform',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateGamePlatform(data) {
  return request({
    url: url.platformWeb + '/web/game-platform',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delGamePlatform(id) {
  return request({
    url: url.platformWeb + '/web/game-platform/' + id,
    method: 'delete'
  })
}
// 导出【请填写功能名称】
export function exportGamePlatform(query) {
  return request({
    url: url.platformWeb + '/web/game-platform/export',
    method: 'get',
    params: query
  })
}
// 用户状态修改
export function changeUserStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/web/game-platform/changeStatus',
    method: 'put',
    data: data
  })
}
// 查询用户详细
export function getGameTpyeList() {
  return request({
    url: url.platformWeb + '/game/type/list' ,
    method: 'get'
  })
}
