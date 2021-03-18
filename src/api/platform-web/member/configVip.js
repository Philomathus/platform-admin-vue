import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listConfigVip(query) {
  return request({
    url: url.platformWeb + '/admin/configVip/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConfigVip(id) {
  return request({
    url: url.platformWeb + '/admin/configVip/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConfigVip(data) {
  return request({
    url: url.platformWeb + '/admin/configVip',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConfigVip(data) {
  return request({
    url: url.platformWeb + '/admin/configVip',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConfigVip(id) {
  return request({
    url: url.platformWeb + '/admin/configVip/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportConfigVip(query) {
  return request({
    url: url.platformWeb + '/admin/configVip/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
