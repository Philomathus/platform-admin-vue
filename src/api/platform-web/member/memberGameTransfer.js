import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberGameTransfer(query) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMemberGameTransfer(id) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberGameTransfer(data) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberGameTransfer(data) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberGameTransfer(id) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer/' + id,
    method: 'delete'
  })
}
export function getTransferStateList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer/transferStateList',
    method: 'get',
    params: query,
    timeout: 60000
  })
}
export function getTransferTypeList(query) {
  return request({
    url: url.platformWeb + '/member/memberGameTransfer/transferTypeList',
    method: 'get',
    params: query,
    timeout: 60000
  })
}
