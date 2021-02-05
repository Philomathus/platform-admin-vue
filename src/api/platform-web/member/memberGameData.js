import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员注单数据列表
export function listMemberGameData(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/list',
    method: 'get',
    params: query
  })
}

// 查询会员注单数据统计
export function getCount(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/getCount',
    method: 'get',
    params: query
  })
}
// 查询会员注单数据统计
export function getLotteryBetData(agent,gameId) {
  const data = {
    agent,
    gameId
  }
  return request({
    url: url.platformWeb + '/member/memberGameData/getLotteryBetData',
    method: 'put',
    params: data
  })
}
// 查询会员注单数据详细
export function getMemberGameData(id) {
  return request({
    url: url.platformWeb + '/member/memberGameData/' + id,
    method: 'get'
  })
}

// 新增会员注单数据
export function addMemberGameData(data) {
  return request({
    url: url.platformWeb + '/member/memberGameData',
    method: 'post',
    data: data
  })
}

// 修改会员注单数据
export function updateMemberGameData(data) {
  return request({
    url: url.platformWeb + '/member/memberGameData',
    method: 'put',
    data: data
  })
}

// 删除会员注单数据
export function delMemberGameData(id) {
  return request({
    url: url.platformWeb + '/member/memberGameData/' + id,
    method: 'delete'
  })
}

// 导出会员注单数据
export function exportMemberGameData(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/export',
    method: 'get',
    params: query
  })
}
