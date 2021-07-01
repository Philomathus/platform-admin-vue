import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员注单数据列表
export function listMemberGameDataMin(query) {
  return request({
    url: url.platformWeb + '/member/memberGameDataMin/list',
    method: 'get',
    params: query
  })
}
//查询平台列表
export function gameOrderBetStateList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameDataMin/orderBetStateList',
    method: 'get',
    params: query
  })
}
