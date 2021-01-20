import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询服务器详细
export function getServer() {
  return request({
    url: url.platformWeb + '/monitor/server',
    method: 'get'
  })
}
