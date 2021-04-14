import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询游戏注单修复列表
export function listMemberGameDatafix(query) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix/list',
    method: 'get',
    params: query
  })
}

// 查询游戏注单修复详细
export function getMemberGameDatafix(id) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix/' + id,
    method: 'get'
  })
}
// 查询游戏平台
export function getGameInfo() {
  return request({
    url: url.platformWeb + '/game/info/listGame' ,
    method: 'get'
  })
}

// 新增游戏注单修复
export function addMemberGameDatafix(data) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix',
    method: 'post',
    data: data
  })
}

// 修改游戏注单修复
export function updateMemberGameDatafix(data) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix',
    method: 'put',
    data: data
  })
}

// 删除游戏注单修复
export function delMemberGameDatafix(id) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix/' + id,
    method: 'delete'
  })
}

// 导出游戏注单修复
export function exportMemberGameDatafix(query) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
