import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询代充人欢迎语配置列表
export function listChatWelcomeConfig(query) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/list',
    method: 'get',
    params: query
  })
}

// 代充账号列表
export function accounts() {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/accounts',
    method: 'get'
  })
}

// 查询代充人欢迎语配置详细
export function getChatWelcomeConfig(id) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/' + id,
    method: 'get'
  })
}

// 新增代充人欢迎语配置
export function addChatWelcomeConfig(data) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig',
    method: 'post',
    data: data
  })
}

// 修改代充人欢迎语配置
export function updateChatWelcomeConfig(data) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig',
    method: 'put',
    data: data
  })
}

// 代充人欢迎语配置状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig',
    method: 'put',
    data: data
  })
}

// 删除代充人欢迎语配置
export function delChatWelcomeConfig(id) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/' + id,
    method: 'delete'
  })
}

// 导出代充人欢迎语配置
export function exportChatWelcomeConfig(query) {
  return request({
    url: url.platformWeb + '/admin/chatWelcomeConfig/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
