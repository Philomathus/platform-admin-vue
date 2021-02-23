import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listSpeakIpBlackList(query) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getSpeakIpBlackList(id) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addSpeakIpBlackList(data) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateSpeakIpBlackList(data) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delSpeakIpBlackList(id) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportSpeakIpBlackList(query) {
  return request({
    url: url.platformWeb + '/admin/speakIpBlackList/export',
    method: 'get',
    params: query
  })
}
