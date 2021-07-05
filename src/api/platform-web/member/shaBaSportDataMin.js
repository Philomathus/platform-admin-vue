import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员注单数据列表
export function listMemberGameDataMin(query) {
  return request({
    url: url.platformWeb + '/member/shaBaSportDataMin/list',
    method: 'get',
    params: query
  })
}
//查询平台列表
export function gameOrderBetStateList(query) {
  return request({
    url: url.platformWeb + '/member/shaBaSportDataMin/orderBetStateList',
    method: 'get',
    params: query
  })
}

export function listMemberGameDataMinDetail(query) {
  return request({
    url: url.platformWeb + '/member/shaBaSportDataMin/detail',
    method: 'get',
    params: query
  })
}


