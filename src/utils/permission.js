import store from '@/store'
import request from "@/utils/request";
import {url} from "@/utils/url";
/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermi(value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissions = store.getters && store.getters.permissions
    const permissionDatas = value
    const all_permission = '*:*:*'

    return permissions.some(permission => {
      return all_permission === permission || permissionDatas.includes(permission)
    })

  } else {
    console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`)
    return false
  }
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkRole(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value
    const super_admin = 'admin'

    return roles.some(role => {
      return super_admin === role || permissionRoles.includes(role)
    })
  } else {
    console.error(`need roles! Like checkRole="['admin','editor']"`)
    return false
  }
}
/**
 * 二级密码登录地址
 * @param value 校验值
 * @returns {Boolean}
 */
export function loginTwoPw(data) {
  return request({
    url: url.platformWeb + '/twoLogin',
    method: 'post',
    params: data
  })
}
export function checkTwoLogin() {
  if (store.state.permission.twoPw) {
    return true;
  } else {
    window.vue.$prompt('请输入二级密码进行二次登录', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({value}) => {
      loginTwoPw({password: value}).then((res) => {
        store.commit('SET_TWO_PW', "password")
        window.vue.$message.success('登录成功')
      })
    }).catch(() => {
      window.vue.$message.info('取消输入')
    });
  }

}
