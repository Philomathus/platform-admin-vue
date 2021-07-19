import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listReport(query) {
  return request({
    url: url.platformWeb + '/report-member/memberChannel/lists',
    method: 'get',
    params: query
  })
}


export function exportReportMonwyInfo(query) {
  return request({
    url: url.platformWeb + '/report-member/memberChannel/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

