import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询会员游戏积分
export function gameBalance(managerId) {
  return request({
    url: url.platformWeb + '/game/base/balance/' + managerId,
    method: 'get'
  })
}

// 会员游戏人工下分
export function gameEsc(platformId, managerId) {
  return request({
    url: url.platformWeb + '/game/base/esc/' + platformId + '/' + managerId,
    method: 'get'
  })
}
