import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberPayJour(id) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberPayJour(data) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberPayJour(data) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberPayJour(id) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberPayJour(query) {
  return request({
    url: url.platformWeb + '/pay/memberPayJour/export',
    method: 'get',
    params: query
  })
}
