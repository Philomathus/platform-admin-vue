import request from '@/utils/request'
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
    url: '/platform/login',
    method: 'post',
    data: encryptData
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/platform/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/platform/logout',
    method: 'post'
  })
}
