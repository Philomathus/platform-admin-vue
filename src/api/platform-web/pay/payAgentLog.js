import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【代付下单日志】列表
export function listPayAgentLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/list',
    method: 'get',
    params: query
  })
}

// 查询【代付下单日志】详细
export function getPayAgentLog(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/' + id,
    method: 'get'
  })
}

// 新增【代付下单日志】
export function addPayAgentLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog',
    method: 'post',
    data: data
  })
}

// 修改【代付下单日志】
export function updatePayAgentLog(data) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog',
    method: 'put',
    data: data
  })
}

// 删除【代付下单日志】
export function delPayAgentLog(id) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/' + id,
    method: 'delete'
  })
}

// 导出【代付下单日志】
export function exportPayAgentLog(query) {
  return request({
    url: url.platformWeb + '/pay/payAgentLog/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
