import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询拉黑列表
export function listLiveBlack(query) {
  return request({
    url: url.platformWeb + '/admin/liveBlack/list',
    method: 'get',
    params: query
  })
}


// 删除拉黑
export function delLiveBlack(data) {
  return request({
    url: url.platformWeb + '/admin/liveBlack/deleteLiveBlack',
    method: 'put',
    data: data
  })
}
