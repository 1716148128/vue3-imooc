/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // value 分为两种情况
  // 1. 基本数据类型
  // 2. 复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 因为有一些数据是复杂数据类型，要判断数据是不是 JSON 有点麻烦
  // 所以我们无论它是不是 JSON , 我们就让他尝试转换一下，如果出错就原样返回数据
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/**
 * 删除指定数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
