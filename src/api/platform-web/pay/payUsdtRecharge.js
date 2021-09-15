import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询USDT充值提交记录列表
export function listPayUsdtRecharge(query) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/list',
    method: 'get',
    params: query
  })
}

// 查询USDT充值提交记录详细
export function getPayUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/' + id,
    method: 'get'
  })
}

// 新增USDT充值提交记录
export function addPayUsdtRecharge(data) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge',
    method: 'post',
    data: data
  })
}

// 修改USDT充值提交记录
export function updatePayUsdtRecharge(id,comments,status) {
  const data = {
    id : id,
    remark : comments,
    status : status
  }
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge',
    method: 'put',
    data: data
  })
}

// 删除USDT充值提交记录
export function delPayUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/' + id,
    method: 'delete'
  })
}

// 导出USDT充值提交记录
export function exportPayUsdtRecharge(query) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
