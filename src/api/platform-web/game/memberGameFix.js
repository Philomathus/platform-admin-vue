import request from '@/utils/request'
import { url } from '@/utils/url'

// 查询游戏补单列表
export function listMemberGameDatafix(query) {
  return request({
    url: url.platformWeb + '/game/memberGameDatafix/list',
    method: 'get',
    params: query
  })
}

// 新增游戏补单
export function addMemberGameDatafix(data) {
  data.gameStartTime = data.params[0]
  data.gameEndTime = data.params[1]
  data.params = null
  return request({
    url: url.platformWeb + '/game/memberGameDatafix',
    method: 'post',
    data: data
  })
}

