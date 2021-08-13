import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询会员上下分列表
export function listLogGameOrder(query) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/list',
    method: 'get',
    params: query
  })
}

// 查询会员上下分详细
export function getLogGameOrder(id) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/' + id,
    method: 'get'
  })
}

// 新增会员上下分
export function addLogGameOrder(data) {
  return request({
    url: url.platformWeb + '/member/logGameOrder',
    method: 'post',
    data: data
  })
}

// 修改会员上下分
export function updateLogGameOrder(data) {
  return request({
    url: url.platformWeb + '/member/logGameOrder',
    method: 'put',
    data: data
  })
}

// 删除会员上下分
export function delLogGameOrder(id) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/' + id,
    method: 'delete'
  })
}

// 导出会员上下分
export function exportLogGameOrder(query) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 批量校对上下分
export function listGame(query) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/listGame',
    method: 'get',
    params: query
  })
}

// 批量校对上下分
export function handleVaildScore(data) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/vaildScore',
    method: 'post',
    data: data
  })
}

// 批量回退上下分
export function handleBackScore(data) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/backScore',
    method: 'post',
    data: data
  })
}

// 查询会员上下分列表
export function listScoreOrder(query) {
  return request({
    url: url.platformWeb + '/member/logGameOrder/score/list',
    method: 'get',
    params: query
  })
}


