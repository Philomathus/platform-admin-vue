import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询【请填写功能名称】列表
export function listMemberGameDatafix(query) {
  return request({
    url: url.platformWeb + '/admin/memberGameDatafix/list',
    method: 'get',
    params: query
  })
}



// 新增【请填写功能名称】
export function addMemberGameDatafix(data) {
  data.gameStartTime=data.params[0];
  data.gameEndTime=data.params[1];
  data.params=null;
  return request({
    url: url.platformWeb + '/admin/memberGameDatafix',
    method: 'post',
    data: data
  })
}

