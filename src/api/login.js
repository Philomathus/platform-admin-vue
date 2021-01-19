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
    url: '/login',
    method: 'post',
    data: encryptData
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
