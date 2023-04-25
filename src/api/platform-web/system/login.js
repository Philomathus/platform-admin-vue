import request from '@/utils/request'
import {url} from '@/utils/url'
import { encrypt } from '@/utils/jsencrypt'
import {getRouters} from "@/api/platform-web/system/router";

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

export function checkPaths(...paths) {
  return getRouters().then((res) => {
    for (const route of res.data) {
      if (route.path === "/moneyManage") {
        for (const child of route.children) {
          for (const p of paths) {
            if (child.path === p) {
              return true;
            }
          }
        }
      }
    }
    return false;
  });
}

export function checkPath(path) {
  return getRouters().then((res) => {
    for (const route of res.data) {
      if (route.path === "/moneyManage") {
        for (const child of route.children) {
          if (child.path === path) {
            return true;
          }
        }
      }
    }
    return false;
  });
}

// 退出方法
export function logout() {
  return request({
    url: url.platformWeb + '/logout',
    method: 'post'
  })
}
