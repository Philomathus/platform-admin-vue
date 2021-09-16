import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listConfigUsdtRecharge(query) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConfigUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConfigUsdtRecharge(data) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConfigUsdtRecharge(data) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConfigUsdtRecharge(id) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportConfigUsdtRecharge(query) {
  return request({
    url: url.platformWeb + '/admin/configUsdtRecharge/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
