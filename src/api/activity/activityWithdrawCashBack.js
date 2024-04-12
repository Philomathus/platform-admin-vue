import request from '@/utils/request'
import {url} from '@/utils/url'

export function listActivityWithdrawCashBack(query) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack/list',
    method: 'get',
    params: query
  })
}

export function getActivityWithdrawCashBack(bankCode) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack/' + bankCode,
    method: 'get'
  })
}

export function addActivityWithdrawCashBack(data) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack',
    method: 'post',
    data: data
  })
}

export function updateActivityWithdrawCashBack(data) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack',
    method: 'put',
    data: data
  })
}

export function deleteActivityWithdrawCashBack(bankCodes) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack/' + bankCodes,
    method: 'delete'
  })
}


export function changeStatus(bankCode, status) {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack/changeStatus',
    method: 'put',
    data: {
      bankCode: bankCode,
      status: status
    }
  })
}

export function getConfigBankList() {
  return request({
    url: url.platformWeb + '/admin/activityWithdrawCashBack/getConfigBankList',
    method: 'get',
  })
}
