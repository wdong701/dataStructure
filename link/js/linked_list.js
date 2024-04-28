//  用于保存每个节点信息
class Node {
  constructor(element) {
    this.element = element  //链表元素的值
    this.next = undefined   //指向链表中下一个元素的指针
  }
}

export default class LinkedList {
  constructor() {
    this.count = 0  //记录链表的长度
    this.head = undefined  //链表的头结点
  }

  // 向链表尾部添加元素
  push(element) {
    const node = new Node(element)  // 创建一个新节点
    let current  // 记录当前位置，用于保存查找节点

    // 情况一：链表为空
    if (this.head == null) {
      this.head = node  // 将新节点赋值给头结点
    } else {
      // 情况二：链表不为空
      current = this.head  // 记录头节点
      while (current.next != null) {  // 查找到最后一个节点
        current = current.next
      }
      // 将新节点赋值给最后一个节点
      current.next = node
    }
    this.count++
  }

  // 从链表中移除元素
  removeAt(index) {
    // 检查是否越界
    if (index >= 0 && index < this.count) {
      let current = this.head  // 记录头节点
      // 情况一：移除第一个元素
      if (index === 0) {
        this.head = current.next  // 将头节点指向当前节点下一个节点
      } else {
        // 情况二：移除链表的最后一个或者中间某个元素
        let previous  // 记录要删除元素的前一个节点

        // 找到目标位置
        for (let i = 0; i < index; i++) {
          previous = current
          current = current.next
        }
        // 将前一个节点的next指向当前节点的下一个节点，跳过current节点，从而实现删除
        previous.next = current.next
      }
      this.count--
      return current.element  // 返回被删除的元素
    }
    return undefined
  }

  //  封装循环迭代链表直到目标位置
  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      // 在第一个位置插入
      if (index === 0) {
        const current = this.head  // 链表第一个元素
        node.next = current  // 将新节点的next指向第一个节点
        this.head = node  // 将头节点指向新节点
      } else {
        const previous = this.getElementAt(index - 1)  // 获取前一个节点
        const current = previous.next  // 获取当前需要插入位置的节点
        node.next = current  // 将新节点的next指向当前节点
        previous.next = node  // 将前一个节点的next指向新节点
      }
      this.count++
      return true
    }
    return false
  }

  // 返回一个元素的位置
  indexOf(element) {
    let current = this.head  // 记录头节点
    for (let i = 0; i < this.count && current != null; i++) {
      if (current.element === element) {
        return i  // 找到元素，返回元素的位置
      }
      current = current.next
    }
    return -1
  }

  // 从链表中移除元素
  remove(element) {
    const index = this.indexOf(element)  // 获取元素的位置
    return this.removeAt(index)  // 移除元素
  }

  // 获取链表元素个数
  size() {
    return this.count
  }

  // 判断链表是否为空
  isEmpty() {
    return this.count === 0
  }

  // 获取头节点
  getHead() {
    return this.head
  }

  // 链表转成字符串
  toString() {
    if (this.head == null) {
      return ''  // 链表为空
    }
    let objString = `${this.head.element}`  // 头节点的值
    let current = this.head.next  // 记录当前节点
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
  
  // 清空链表
  clear() {
    this.head = undefined;
    this.count = 0;
  }
}