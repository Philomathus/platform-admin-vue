import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询游戏字典列表
export function listConfigGametype(query) {
  return request({
    url: url.platformWeb + '/game/config-gametype/list',
    method: 'get',
    params: query
  })
}

// 查询游戏字典详细
export function getConfigGametype(id) {
  return request({
    url: url.platformWeb + '/game/config-gametype/' + id,
    method: 'get'
  })
}

// 新增游戏字典
export function addConfigGametype(data) {
  return request({
    url: url.platformWeb + '/game/config-gametype',
    method: 'post',
    data: data
  })
}

// 修改游戏字典
export function updateConfigGametype(data) {
  return request({
    url: url.platformWeb + '/game/config-gametype',
    method: 'put',
    data: data
  })
}

// 删除游戏字典
export function delConfigGametype(id) {
  return request({
    url: url.platformWeb + '/game/config-gametype/' + id,
    method: 'delete'
  })
}

export function getGameTypeInfo() {
  return request({
    url: url.platformWeb + '/game/config-gametype/listGameType',
    method: 'get'

  })
}
