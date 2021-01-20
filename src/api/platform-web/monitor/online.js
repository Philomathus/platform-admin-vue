import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询在线用户列表
export function list(query) {
  return request({
    url: url.platformWeb + '/monitor/online/list',
    method: 'get',
    params: query
  })
}

// 强退用户
export function forceLogout(tokenId) {
  return request({
    url: url.platformWeb + '/monitor/online/' + tokenId,
    method: 'delete'
  })
}
