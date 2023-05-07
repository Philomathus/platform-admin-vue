import request from '@/utils/request'
import {url} from '@/utils/url'
import { encrypt } from '@/utils/jsencrypt'

// 登录方法
export function login(username, password, googleAuthCode, uuid) {
  const data = {
    username,
    password,
    googleAuthCode,
    uuid
  }
  let encryptData = encrypt(JSON.stringify(data))
  return request({
    url: url.platformWeb + '/login',
    method: 'post',
    data: encryptData
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: url.platformWeb + '/getInfo',
    method: 'get'
  })
}

export function checkPermissions(...perms) {
  return getInfo().then( res => perms.every( value => res.permissions.includes( value ) ) );
}

// 退出方法
export function logout() {
  return request({
    url: url.platformWeb + '/logout',
    method: 'post'
  })
}
