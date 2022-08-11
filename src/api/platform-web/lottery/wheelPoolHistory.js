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


// list all wheel pool lottery caches
export function getLotteryList() {
  return request({
    url: url.platformWeb + '/admin/wheelPoolHistory/lotteryCacheList',
    method: 'get',
  })
}

// 统计会员余额保险箱
export function wheelPoolHistoryListCount(query) {
  return request({
    url: url.platformWeb + '/admin/wheelPoolHistory/listCount',
    method: 'get',
    params: query
  })
}

// 导出轮池历史列表 Export wheel pool history list
export function exportWheelPoolHistoryInfo(query) {
  return request({
    url: url.platformWeb + '/admin/wheelPoolHistory/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
