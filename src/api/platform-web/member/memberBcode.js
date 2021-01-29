import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员打码数据列表
export function listMemberBcode(query) {
  return request({
    url: url.platformWeb + '/member/memberBcode/list',
    method: 'get',
    params: query
  })
}

// 查询会员打码总数据
export function getTotalData(query) {
  return request({
    url: url.platformWeb + '/member/memberBcode/getTotalData',
    method: 'get',
    params: query
  })
}

// 查询会员打码数据详细
export function getMemberBcode(id) {
  return request({
    url: url.platformWeb + '/member/memberBcode/' + id,
    method: 'get'
  })
}

// 新增会员打码数据
export function addMemberBcode(data) {
  return request({
    url: url.platformWeb + '/member/memberBcode',
    method: 'post',
    data: data
  })
}

// 修改会员打码数据
export function updateMemberBcode(data) {
  return request({
    url: url.platformWeb + '/member/memberBcode',
    method: 'put',
    data: data
  })
}

// 删除会员打码数据
export function delMemberBcode(id) {
  return request({
    url: url.platformWeb + '/member/memberBcode/' + id,
    method: 'delete'
  })
}

// 导出会员打码数据
export function exportMemberBcode(query) {
  return request({
    url: url.platformWeb + '/member/memberBcode/export',
    method: 'get',
    params: query
  })
}
