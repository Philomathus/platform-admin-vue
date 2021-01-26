import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/web/report-moneyinfo/list',
    method: 'get',
    params: query
  })



}


