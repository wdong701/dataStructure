import { defaultToString } from '../../util/util.js'

export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn  // 将 key 转化为字符串
    this.table = {}
  }

  // 检测一个键是否存在于字典中
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }

  // 添加键值对
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = value
      return true
    }
    return false
  }
  // 从字典中移除一个值
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  // 从字典中检索一个值
  get(key) {
    if (this.hasKey(key)) {
      return this.table[this.toStrFn(key)]
    }
    return undefined
  }

  // 返回键
  keys() {
    return Object.keys(this.table)
  }

  // 返回值
  values() {
    return Object.values(this.table)
  }

  // 返回字典中的值的个数
  size() {
    return Object.keys(this.table).length
  }

  // 清空字典
  clear() {
    this.table = {}
  }

  // 字典是否为空
  isEmpty() {
    return this.size() === 0
  }
}