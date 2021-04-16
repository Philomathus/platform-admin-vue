import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询首页轮播图列表
export function listHomeBanner(query) {
  return request({
    url: url.platformWeb + '/activity/homeBanner/list',
    method: 'get',
    params: query
  })
}

// 查询首页轮播图详细
export function getHomeBanner(id) {
  return request({
    url: url.platformWeb + '/activity/homeBanner/' + id,
    method: 'get'
  })
}

// 新增首页轮播图
export function addHomeBanner(data) {
  return request({
    url: url.platformWeb + '/activity/homeBanner',
    method: 'post',
    data: data
  })
}

// 修改首页轮播图
export function updateHomeBanner(data) {
  return request({
    url: url.platformWeb + '/activity/homeBanner',
    method: 'put',
    data: data
  })
}

// 删除首页轮播图
export function delHomeBanner(id) {
  return request({
    url: url.platformWeb + '/activity/homeBanner/' + id,
    method: 'delete'
  })
}

// 导出首页轮播图
export function exportHomeBanner(query) {
  return request({
    url: url.platformWeb + '/activity/homeBanner/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
