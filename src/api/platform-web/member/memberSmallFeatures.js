import request from '@/utils/request'
import {url} from '@/utils/url'

//会员小功能之批量根据手机号更新密码
export function updatePhones(query) {
  return request({
    url: url.platformWeb + '/member/memberInfo/memberSmallFeatures',
    method: 'post',
    params: query
  })
}
