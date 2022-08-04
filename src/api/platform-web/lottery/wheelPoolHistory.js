import request from '@/utils/request'
import {url} from '@/utils/url'

// query list api
export function listWheelPoolHistory(query) {
  return request({
    url: url.platformWeb + '/admin/wheelPoolHistory/list',
    method: 'get',
    params: query
  })
}
