import request from "@/utils/request";
import {url} from "@/utils/url";

export function listMonthlyLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoneyMonthly/list',
    method: 'get',
    params: query
  })
}

export function listMonthlyCount(query) {
  return request({
    url: url.platformWeb + '/pay/logMoneyMonthly/listCount',
    method: 'get',
    params: query
  })
}

// 查询会员资金信息统计
export function totalMonthlyCount(query) {
  return request({
    url: url.platformWeb + '/pay/logMoneyMonthly/totalCount',
    method: 'get',
    params: query
  })
}

export function exportMonthlyLogMoney(query) {
  return request({
    url: url.platformWeb + '/pay/logMoneyMonthly/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

