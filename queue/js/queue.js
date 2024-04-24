class Queue {
  constructor() {
    this.count = 0  //控制队列的大小
    this.lowestCount = 0  //前端元素位置
    this.items = {}  //存储队列元素
  }
  //向队列添加元素
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }
  //从队列移除元素
  dequeue() {
    if (this.isEmpty()) {  //判断队列是否为空
      return undefined
    }
    const result = this.items[this.lowestCount]  //记录队列的第一个元素
    delete this.items[this.lowestCount]  //删除队列的第一个元素
    this.lowestCount++  //将lowestCount移到下一个元素
    return result
  }
  //查看队列头元素
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  //判断队列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0
  }
  //获取队列的长度
  size() {
    return this.count - this.lowestCount
  }
  //清空队列
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}