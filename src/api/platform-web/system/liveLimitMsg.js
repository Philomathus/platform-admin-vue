import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/admin/liveLimitMsg/list',
    method: 'get',
    params: query
  })
}

//修改脏字库
export function editWord(textarea) {
  const data = {
    name: textarea,
  }
  return request({
    url: url.platformWeb + '/admin/liveLimitMsg',
    method: 'put',
    data: data
  })
}
