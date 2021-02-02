import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询游戏类型列表
export function listType(query) {
  return request({
    url: url.platformWeb + '/game/type/list',
    method: 'get',
    params: query
  })
}

// 查询游戏类型详细
export function getType(id) {
  return request({
    url: url.platformWeb + '/game/type/' + id,
    method: 'get'
  })
}

// 新增游戏类型
export function addType(data) {
  return request({
    url: url.platformWeb + '/game/type',
    method: 'post',
    data: data
  })
}

// 修改游戏类型
export function updateType(data) {
  return request({
    url: url.platformWeb + '/game/type',
    method: 'put',
    data: data
  })
}
// 修改游戏类型
export function upddataGameTypeInfo(typeId,type_games) {
  const dataList = {
    typeId,
    type_games
  }
  return request({
    url: url.platformWeb + '/game/type//add-type-games',
    method: 'post',
    data: dataList
  })
}

// 删除游戏类型
export function delType(id) {
  return request({
    url: url.platformWeb + '/game/type/' + id,
    method: 'delete'
  })
}

// 导出游戏类型
export function exportType(query) {
  return request({
    url: url.platformWeb + '/game/type/export',
    method: 'get',
    params: query
  })
}

// 导出游戏类型
export function getRelationGame(id) {
  return request({
    url: url.platformWeb + '/game/type/getRelationGame/'+id,
    method: 'get'
  })
}

export function changeStatus(id,status ) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/game/type/changeStatus',
    method: 'put',
    data: data
  })
}
