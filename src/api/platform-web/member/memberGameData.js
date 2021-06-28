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

// 查询KY注单数据统计
export function getKYgameResReport(row) {
  return request({
    url: url.platformWeb + '/member/memberGameData/getKYgameResReport',
    method: 'put',
    params: row
  })
}

// 导出会员注单数据
export function exportMemberGameData(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
//查询对局详情列表
export function gameRecordList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/recordList',
    method: 'get',
    params: query
  })
}

//查询对局详情列表
export function gameDetailList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/detailList',
    method: 'get',
    params: query
  })
}
//查询平台列表
export function gamePlatformList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameData/platformList',
    method: 'get',
    params: query
  })
}
