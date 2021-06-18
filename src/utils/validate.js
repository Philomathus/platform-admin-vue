/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export function validDecimal(rule, value, callback) {
  //校验金额类型
  if (value.length > 12){
    callback(new Error('请输入合法的金额，0.01-999999999999之间'));
  }
  const re = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
  const rsCheck = re.test(value);
  if (!rsCheck) {
    callback(new Error('请输入合法的金额数字，最多两位小数'));
  } else {
    callback();
  }
}

export function positiveInteger(rule, value, callback) {
  //校验金额类型
  if (value.length > 12){
    callback(new Error('请输入合法的金额，0.01-999999999999之间'));
  }
  //const re = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
  const re = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  const rsCheck = re.test(value);
  if (!rsCheck) {
    callback(new Error('请输入合法的金额数字，只能为整数'));
  } else {
    callback();
  }
}
export function validNumber(rule, value, callback) {
  //校验整数
  if (value.length > 10){
    callback(new Error('请输入合法的数字，1-10位整数'));
  }
  let numberReg= /^\d+$|^\d+[.]?\d+$/;
  const rsCheck = numberReg.test(value);
  if (!rsCheck) {
    callback(new Error('请输入合法的数字'));
  } else {
    callback();
  }
}
export function validInteger(rule, value, callback) {
  //校验整数
  let numberReg= /^[1-9]\d*$/;
  const rsCheck = numberReg.test(value);
  if (!rsCheck) {
    callback(new Error('请输入合法的数字'));
  } else {
    callback();
  }
}

export function validMobile(rule, value, callback) {
  //校验整数
  let numberReg= /^([0-9]{1,3})+([*0-9_\.-]{4})+([0-9]{3,10})$/;
  const rsCheck = numberReg.test(value);
  if (!rsCheck) {
    callback(new Error('手机号格式有误,请重新输入'));
  } else {
    callback();
  }
}
