//手机号隐藏中间四位
export const hideKMobile = function(mobile) {
  if (mobile && mobile.length === 11) {
    return mobile.substr(0,3) + "****" + mobile.substr(7,4)
  }else {
    return mobile
  }
}
