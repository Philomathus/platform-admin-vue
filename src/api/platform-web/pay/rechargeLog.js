import request from '@/utils/request'
import {url} from '@/utils/url'

/**
 * 充值日志列表 - recharge log list controller
 */
export function listRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/rechargeLog/list',
    method: 'get',
    params: query
  })
}

export function exportRechargeLog(query) {
  return request({
    url: url.platformWeb + '/pay/rechargeLog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
