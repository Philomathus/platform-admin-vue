import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询派送彩金暂存表列表
export function listMemberMoney(query) {
  return request({
    url: url.platformWeb + '/admin/memberMoney/list',
    method: 'get',
    params: query
  })
}

export function handleClean() {
  return request({
    url: url.platformWeb + '/admin/memberMoney/handleClean',
    method: 'get'
  })
}

// 查询派送彩金暂存表详细
export function getMemberMoney(memberId) {
  return request({
    url: url.platformWeb + '/admin/memberMoney/' + memberId,
    method: 'get'
  })
}

export function starSend(moneydes,googleAuthCode) {
  const data = {
    moneydes,
    googleAuthCode
  }
  return request({
    url: url.platformWeb + '/admin/memberMoney/starSend',
    method: 'post',
    data: data,
    timeout: 1000000
  })
}

// 新增派送彩金暂存表
export function addMemberMoney(data) {
  return request({
    url: url.platformWeb + '/admin/memberMoney',
    method: 'post',
    data: data
  })
}

// 修改派送彩金暂存表
export function updateMemberMoney(data) {
  return request({
    url: url.platformWeb + '/admin/memberMoney',
    method: 'put',
    data: data
  })
}

// 删除派送彩金暂存表
export function delMemberMoney(memberId) {
  return request({
    url: url.platformWeb + '/admin/memberMoney/' + memberId,
    method: 'delete'
  })
}

// 导出派送彩金暂存表
export function exportMemberMoney(query) {
  return request({
    url: url.platformWeb + '/admin/memberMoney/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

//import Member Money temporary table-导入红利支付临时表
export function uploadFileUrl(){
  return url.platformWeb + '/member/memberInfo/batchInsertShops'
}

export function count() {
  return request({
    url: url.platformWeb + '/admin/memberMoney/count' ,
    method: 'get'
  })
}
