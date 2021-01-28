import request from '@/utils/request'
import {url} from '@/utils/url'
import { praseStrEmpty } from "@/utils/common";

// 查询用户列表
export function listUser(query) {
  return request({
    url: url.platformWeb + '/web/game-info/list',
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
    url: url.platformWeb + '/web/game-info/changeStatus',
    method: 'put',
    data: data
  })
}
// 用户状态修改
export function changeIsWh(id,isWh ) {
  const data = {
    id,
    isWh
  }
  return request({
    url: url.platformWeb + '/web/game-info/changeIsWh',
    method: 'put',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateGameInfo(data) {
  return request({
    url: url.platformWeb + '/web/game-info',
    method: 'put',
    data: data
  })
}
// 查询用户详细
export function getInfo(id) {
  return request({
    url: url.platformWeb + '/web/game-info/' + praseStrEmpty(id),
    method: 'get'
  })
}

// 查询用户详细
export function getGameInfo() {
  return request({
    url: url.platformWeb + '/web/game-info/listGame' ,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function  addGameInfoOne(data) {
  return request({
    url: url.platformWeb + '/web/game-info/add',
    method: 'post',
    data: data
  })
}



// 删除【请填写功能名称】
export function delGameInfo(id) {
  return request({
    url: url.platformWeb + '/web/game-info/' + id,
    method: 'delete'
  })
}








