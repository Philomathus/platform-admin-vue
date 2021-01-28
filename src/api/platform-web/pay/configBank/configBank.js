import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listConfigBank(query) {
  return request({
    url: url.platformWeb + '/pay/configBank/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConfigBank(id) {
  return request({
    url: url.platformWeb + '/pay/configBank/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConfigBank(data) {
  return request({
    url: url.platformWeb + '/pay/configBank',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConfigBank(data) {
  return request({
    url: url.platformWeb + '/pay/configBank',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConfigBank(id) {
  return request({
    url: url.platformWeb + '/pay/configBank/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportConfigBank(query) {
  return request({
    url: url.platformWeb + '/pay/configBank/export',
    method: 'get',
    params: query
  })
}
