import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listConfigGametype(query) {
  return request({
    url: url.platformWeb + '/web/config-gametype/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getConfigGametype(id) {
  return request({
    url: url.platformWeb + '/web/config-gametype/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addConfigGametype(data) {
  return request({
    url: url.platformWeb + '/web/config-gametype',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateConfigGametype(data) {
  return request({
    url: url.platformWeb + '/web/config-gametype',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delConfigGametype(id) {
  return request({
    url: url.platformWeb + '/web/config-gametype/' + id,
    method: 'delete'
  })
}

export function getGameTypeInfo() {
  return request({
    url: url.platformWeb + '/web/config-gametype/listGameType',
    method: 'get'

  })
}
