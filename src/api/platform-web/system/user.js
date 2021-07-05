import request from '@/utils/request'
import {url} from '@/utils/url'
import {praseStrEmpty} from '@/utils/common'
import {encrypt} from '@/utils/jsencrypt'

// 查询用户列表
export function listUser(query) {
  return request({
    url: url.platformWeb + '/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: url.platformWeb + '/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: url.platformWeb + '/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: url.platformWeb + '/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: url.platformWeb + '/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: url.platformWeb + '/system/user/export',
    method: 'get',
    params: query,
    responseType: 'arraybuffer',
    timeout: 60000
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: url.platformWeb + '/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: url.platformWeb + '/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: url.platformWeb + '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: url.platformWeb + '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPwd: oldPassword,
    newPwd: newPassword
  }
  let encryptData = encrypt(JSON.stringify(data))
  return request({
    url: url.platformWeb + '/system/user/profile/updatePwd',
    method: 'put',
    data: encryptData
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: url.platformWeb + '/upload/oss/adminAvatar',
    method: 'post',
    data: data
  })
}

//获取谷歌验证码
export function getGoogleAuth(name) {
  const data = {
    name
  }
  return request({
    url: url.platformWeb + '/system/user/getGoogleAuth',
    method: 'get',
    params: data
  })

}

//获取谷歌验证码-代充人重置谷歌验证码
export function getGoogleAuth2(name) {
  const data = {
    name: name,
    type: 1
  }
  return request({
    url: url.platformWeb + '/system/user/getGoogleAuth',
    method: 'get',
    params: data
  })

}

//重置代充人谷歌秘钥
export function updateGoogleAuth(id,googleAuthCode) {
  const data = {
    id,
    googleAuthCode
  }
  return request({
    url: url.platformWeb + '/system/user/updateGoogleAuth',
    method: 'get',
    params: data
  })
}

//重置代充人IM密码
export function updatePassword(id,googleAuthCode) {
  const data = {
    id,
    googleAuthCode
  }
  return request({
    url: url.platformWeb + '/system/user/updatePassword',
    method: 'get',
    params: data
  })
}

//重置用户谷歌秘钥
export function updateUserGoogleAuth(id,googleAuthCode) {
  const data = {
    id,
    googleAuthCode
  }
  return request({
    url: url.platformWeb + '/system/user/updateUserGoogleAuth',
    method: 'get',
    params: data
  })
}

//绑定谷歌验证码
export function bindGoogleAuth(googleAuthName, googleAuthKey, googleAuthCode) {
  const data = {
    googleAuthCode: googleAuthCode,
    googleAuthKey: googleAuthKey,
    googleAuthName: googleAuthName
  }
  return request({
    url: url.platformWeb + '/system/user/bindGoogleAuth',
    method: 'post',
    data: data
  })
}

//绑定谷歌验证码
export function bindGoogleAuth2(googleAuthName, googleAuthKey, googleAuthCode) {
  const data = {
    googleAuthCode: googleAuthCode,
    googleAuthKey: googleAuthKey,
    googleAuthName: googleAuthName,
    type: 1,
  }
  return request({
    url: url.platformWeb + '/system/user/bindGoogleAuth',
    method: 'post',
    data: data
  })

}
