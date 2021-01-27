import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function list(query) {
  return request({
    url: url.platformWeb + '/admin/report-plam-games/list',
    method: 'get',
    params: query
  })



}


