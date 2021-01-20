import request from '@/utils/request'
import {url} from '@/utils/url'

// 获取路由
export const getRouters = () => {
  return request({
    url: url.platformWeb + '/getRouters',
    method: 'get'
  })
}
