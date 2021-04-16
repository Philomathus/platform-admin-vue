import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询礼物列列表
export function listLiveProp(query) {
  return request({
    url: url.platformWeb + '/admin/liveProp/list',
    method: 'get',
    params: query
  })
}

// 查询礼物列详细
export function getLiveProp(id) {
  return request({
    url: url.platformWeb + '/admin/liveProp/' + id,
    method: 'get'
  })
}

// 新增礼物列
export function addLiveProp(data) {
  return request({
    url: url.platformWeb + '/admin/liveProp',
    method: 'post',
    data: data
  })
}

// 修改礼物列
export function updateLiveProp(data) {
  return request({
    url: url.platformWeb + '/admin/liveProp',
    method: 'put',
    data: data
  })
}

// 删除礼物列
export function delLiveProp(id) {
  return request({
    url: url.platformWeb + '/admin/liveProp/' + id,
    method: 'delete'
  })
}

// 导出礼物列
export function exportLiveProp(query) {
  return request({
    url: url.platformWeb + '/admin/liveProp/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
