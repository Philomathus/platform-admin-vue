import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询SMS短信服务配置列表
export function listSms(query) {
  return request({
    url: url.platformWeb + '/server/sms/list',
    method: 'get',
    params: query
  })
}

// 查询SMS短信服务配置详细
export function getSms(id) {
  return request({
    url: url.platformWeb + '/server/sms/' + id,
    method: 'get'
  })
}

// 新增SMS短信服务配置
export function addSms(data) {
  return request({
    url: url.platformWeb + '/server/sms',
    method: 'post',
    data: data
  })
}

// 修改SMS短信服务配置
export function updateSms(data) {
  return request({
    url: url.platformWeb + '/server/sms',
    method: 'put',
    data: data
  })
}

// 删除SMS短信服务配置
export function delSms(id) {
  return request({
    url: url.platformWeb + '/server/sms/' + id,
    method: 'delete'
  })
}
