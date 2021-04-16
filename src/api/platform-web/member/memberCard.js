import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberCard(query) {
  return request({
    url: url.platformWeb + '/admin/memberCard/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberCard(id) {
  return request({
    url: url.platformWeb + '/admin/memberCard/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberCard(data) {
  return request({
    url: url.platformWeb + '/admin/memberCard',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberCard(data) {
  return request({
    url: url.platformWeb + '/admin/memberCard',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberCard(id) {
  return request({
    url: url.platformWeb + '/admin/memberCard/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberCard(query) {
  return request({
    url: url.platformWeb + '/admin/memberCard/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
