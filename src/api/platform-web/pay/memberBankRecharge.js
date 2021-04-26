import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询线上充值信息列表
export function listMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberBankRecharge/lists',
    method: 'get',
    params: query
  })
}

// 统计线上充值信息列表
export function listCounts(query) {
  return request({
    url: url.platformWeb + '/pay/memberBankRecharge/listCounts',
    method: 'get',
    params: query
  })
}


// 导出线上充值信息
export function exportMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberBankRecharge/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 120000
  })
}
