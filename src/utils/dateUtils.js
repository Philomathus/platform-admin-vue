// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

// 获取今天开始时间
export function getTodayStartTime() {
  return this.getDateStartTime(new Date())
}

// 获取今天结束时间
export function getTodayEndTime() {
  return this.getDateEndTime(new Date())
}

// 获取指定日期的开始时间
export function getDateStartTime(date) {
  return new Date(date.toLocaleDateString())
}

// 获取指定日期的结束时间
export function getDateEndTime(date) {
  return new Date(date.toLocaleDateString() + ' 23:59:59')
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  var search = params
  search.params = {}
  if (null != dateRange && '' !== dateRange) {
    if (typeof (propName) === 'undefined') {
      search.params['beginTime'] = typeof (dateRange[0]) === 'undefined' ? '' : dateRange[0]
      search.params['endTime'] = typeof (dateRange[1]) === 'undefined' ? '' : dateRange[1]
    } else {
      search.params['begin' + propName] = typeof (dateRange[0]) === 'undefined' ? '' : dateRange[0]
      search.params['end' + propName] = typeof (dateRange[1]) === 'undefined' ? '' : dateRange[1]
    }
  }
  return search
}

export const pickerDateTimeShortcuts = [{
  text: '今日',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    picker.$emit('pick', [getDateStartTime(start), getDateEndTime(end)])
  }
}, {
  text: '昨日',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    end.setTime(end.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', [getDateStartTime(start), getDateEndTime(end)])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [getDateStartTime(start), getDateEndTime(end)])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [getDateStartTime(start), getDateEndTime(end)])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [getDateStartTime(start), getDateEndTime(end)])
  }
}]

export const pickerDateShortcuts = [{
  text: '今日',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    picker.$emit('pick', [start, end])
  }
}, {
  text: '昨日',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    end.setTime(end.getTime() - 3600 * 1000 * 24)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    picker.$emit('pick', [start, end])
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
    picker.$emit('pick', [start, end])
  }
}]
