class Deque {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  //双端队列的后端添加元素
  addBack(element) {
    this.items[this.count] = element
    this.count++
  }

  //双端队列的前端添加元素
  addFront(element) {
    // 情况一：双端队列为空，直接使用addBack()，向队列后端插入元素
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      // 情况二：有元素从队列前端删除，此时队列的前端元素位置向后移动了
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      // 情况三：队列的前端元素位置为0，此时需要将队列的前端元素位置向后移动
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  //双端队列前端移除第一个元素
  removeFront() {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  //双端队列后端移除元素
  removeBack() {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  //返回双端队列前端的第一个元素
  peekFront() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  //返回双端队列后端的元素
  peekBack() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
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
