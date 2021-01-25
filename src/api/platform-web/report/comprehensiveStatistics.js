import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询在线用户列表
export function list(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-com/list',
    method: 'get',
    params: query
  })
}


