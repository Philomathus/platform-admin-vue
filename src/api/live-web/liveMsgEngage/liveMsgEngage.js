import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询列表
export function listLiveMsgEngage(query) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getLiveMsgEngage(id) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage/' + id,
    method: 'get'
  })
}

// 新增
export function addLiveMsgEngage(data) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage',
    method: 'post',
    data: data
  })
}

// 修改
export function updateLiveMsgEngage(data) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage',
    method: 'put',
    data: data
  })
}

// 删除
export function delLiveMsgEngage(id) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage/' + id,
    method: 'delete'
  })
}

// 导出
export function exportLiveMsgEngage(query) {
  return request({
    url: url.platformWeb + '/admin/liveMsgEngage/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
