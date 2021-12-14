import request from '@/utils/request'
import {url} from '@/utils/url'

//会员小功能之批量手机号更新密码
export function updatePhones(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/memberSmallFeatures',
    method: 'post',
    params: query
  })
}

//会员小功能之批量会员ID查询手机号
export function queryPhones(userIds,googleAuthCode) {
  const data = {
    userIds: userIds,
    googleAuthCode: googleAuthCode
  }
  return request({
    url: url.platformWeb + '/member/memberInfo/queryPhones',
    method: 'post',
    data: data
  })
}
