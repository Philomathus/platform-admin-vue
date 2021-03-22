import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询在线会员列表列表
export function listMemberOnline(query) {
  return request({
    url: url.platformWeb + '/admin/memberOnline/list',
    method: 'get',
    params: query
  })
}

// 统计在线会员人数
export function getCountTotal() {
  return request({
    url: url.platformWeb + '/admin/memberOnline/countTotal',
    method: 'get'
  })
}


// 导出在线会员列表
export function exportMemberOnline(query) {
  return request({
    url: url.platformWeb + '/admin/memberOnline/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
