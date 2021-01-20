import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询缓存详细
export function getCache() {
  return request({
    url: url.platformWeb + '/system/monitor/cache',
    method: 'get'
  })
}
