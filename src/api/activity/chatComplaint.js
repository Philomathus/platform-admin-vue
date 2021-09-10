import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询客服投诉列表
export function listChatComplaint(query) {
  return request({
    url: url.platformWeb + '/admin/chatComplaint/list',
    method: 'get',
    params: query
  })
}

// 查询客服投诉详细
export function getChatComplaint(id) {
  return request({
    url: url.platformWeb + '/admin/chatComplaint/' + id,
    method: 'get'
  })
}

// 新增客服投诉
export function addChatComplaint(data) {
  return request({
    url: url.platformWeb + '/admin/chatComplaint',
    method: 'post',
    data: data
  })
}

// 修改客服投诉
export function updateChatComplaint(id,remark,status) {
  const data = {
    id : id,
    remark : remark,
    status : status
  }
  return request({
    url: url.platformWeb + '/admin/chatComplaint',
    method: 'put',
    data: data
  })
}

// 删除客服投诉
export function delChatComplaint(id) {
  return request({
    url: url.platformWeb + '/admin/chatComplaint/' + id,
    method: 'delete'
  })
}

// 导出客服投诉
export function exportChatComplaint(query) {
  return request({
    url: url.platformWeb + '/admin/chatComplaint/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
