import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询用户送礼日志列表
export function listLiveProplog(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/list',
    method: 'get',
    params: query
  })
}

// 导出用户送礼日志
export function exportLiveProplog(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/export',
    method: 'get',
    params: query
  })
}

// 查询用户送礼数据统计
export function getCount(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/getCount',
    method: 'get',
    params: query
  })
}
// 查询测试号用户送礼日志列表
export function testAccountPorpList(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/testAccountPorpList',
    method: 'get',
    params: query
  })
}
// 导出测试号送礼日志列表
export function exportTestAccountProplog(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/exportTestAccountProplog',
    method: 'get',
    params: query
  })

}
// 查询用户送礼数据统计
export function testAccountCount(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideoProp/testAccountCount',
    method: 'get',
    params: query
  })
}
