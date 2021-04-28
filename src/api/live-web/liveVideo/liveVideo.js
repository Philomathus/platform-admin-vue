import request from '@/utils/request'
import {url} from '@/utils/url'
import de from "element-ui/src/locale/lang/de";

// 查询直播列表
export function listLiveVideo(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/list',
    method: 'get',
    params: query
  })
}

// 查询直播详细
export function getLiveVideo(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/' + id,
    method: 'get'
  })
}

// 关播
export function close(id) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/close/' + id,
    method: 'get'
  })
}

// 开启收费直播
export function updateLivePay(id,liveFee) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/livePay/' + id,
    method: 'put',
    params: {
      liveFee : liveFee
    }
  })
}

// 设置排序值
export function updateVideoSort(data){
  return request({
    url: url.platformWeb + '/admin/liveVideo/updateVideoSort',
    method: 'put',
    data: data
  })
}

// 导出直播数据
export function exportLiveVideo(query) {
  return request({
    url: url.platformWeb + '/admin/liveVideo/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}
// 设置排序值
export function sendLiveMsg(data){
  return request({
    url: url.platformWeb + '/admin/liveVideo/sendLiveMsg',
    method: 'post',
    data: data
  })
}
