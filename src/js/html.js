
// 定义最大的 fontSize
const MAX_FONT_SIZE = 42
// 监听 HTML 文档被解析完成的事件
document.addEventListener('DOMContentLoaded', () => {
  // 获取html标签
  const html = document.querySelector('html')
  // 屏幕的宽度除以10，获取跟元素fontSize标准
  let fontSize = document.body.clientWidth / 20
  // 获取到的 fontSize 标准不允许超过我们定义的最大值
  // fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
  // 定义根元素 大小
  html.style.fontSize = fontSize + 'px'
  // body.style.fontSize = fontSize + 'px'
})
