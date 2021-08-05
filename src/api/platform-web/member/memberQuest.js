import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberQuest(query) {
  return request({
    url: url.platformWeb + '/member/memberQuest/list',
    method: 'get',
    params: query
  })
}

// 增加会员积分
export function addMemberScore(id,curnum) {
  const data = {
    id,
    curnum
  }
  return request({
    url: url.platformWeb + '/member/memberQuest/addScore',
    method: 'post',
    data: data
  })
}

// 查询【请填写功能名称】详细
export function getMemberQuest(id) {
  return request({
    url: url.platformWeb + '/member/memberQuest/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMemberQuest(data) {
  return request({
    url: url.platformWeb + '/member/memberQuest',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMemberQuest(data) {
  return request({
    url: url.platformWeb + '/member/memberQuest',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMemberQuest(id) {
  return request({
    url: url.platformWeb + '/member/memberQuest/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportMemberQuest(query) {
  return request({
    url: url.platformWeb + '/member/memberQuest/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
