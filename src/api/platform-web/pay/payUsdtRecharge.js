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

// 锁定USDT充值提交记录
export function lockPayUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/lock/' + id,
    method: 'get'
  })
}

// 解锁USDT充值提交记录
export function unLockPayUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/unLock/' + id,
    method: 'get'
  })
}

// 通过USDT充值提交记录
export function updatePayUsdtRecharge(id,comments) {
  const data = {
    id : id,
    remark : comments
  }
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge',
    method: 'put',
    data: data
  })
}

// 拒绝USDT充值提交记录
export function refusePayUsdtRecharge(id,comments) {
  const data = {
    id : id,
    remark : comments
  }
  return request({
    url: url.platformWeb + '/admin/payUsdtRecharge/refuse',
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
