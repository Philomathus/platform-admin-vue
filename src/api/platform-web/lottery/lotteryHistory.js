import request from '@/utils/request'
import {url} from '@/utils/url'

// 查询开奖历史列表
export function listLotteryHistory(query) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/list',
    method: 'get',
    params: query
  })
}

//重新派奖
export function changeStatus(id) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/' + id,
    method: 'post',
  })
}


//全部彩种
export function lotteryInfoName() {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/lotteryName',
    method: 'get'
  })
}

// 新增人工补单管理
export function addLotteryHistoryIssue(data) {
  return request({
    url: url.platformWeb + '/admin/lotteryHistory/addIssue',
    method: 'post',
    data: data
  })
}

// 新增人工补单管理
export function addNew6hecaiIssue(data) {
  return request({
    url: url.platformWeb + '/lottery-hk6he/new6hecaiIssue',
    method: 'post',
    data: data
  })
}

//重新派奖
export function handle6heAward(historyId) {
  return request({
    url: url.platformWeb + '/lottery-hk6he/new6hecaiAward',
    method: 'post',
    data: {historyId}
  })
}

export function handle6heAwardDelete(id) {
  return request({
    url: url.platformWeb + '/lottery-hk6he/delete/' + id,
    method: 'post'
  })
}

export function handle6hecaiEdit(id, ktime) {
  return request({
    url: url.platformWeb + '/lottery-hk6he/new6hecaiEdit',
    method: 'post',
    data: {
      id,
      ktime
    }
  })
}

// 查询彩票名称详细
export function get6hecaiLottery(id) {
  return request({
    url: url.platformWeb + '/lottery-hk6he/' + id,
    method: 'get'
  })
}

