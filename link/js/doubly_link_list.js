import { DoublyNode } from '../models/link-node.js'
import LinkedList from './linked_list.js'

export default class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = undefined  // 保存对链表最后一个元素的引用
  }

  // 在链表任意位置添加一个新的元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)  // 创建新的节点
      let current = this.head  // 记录头节点
      // 在第一个位置插入元素
      if (index === 0) {
        // 情况一：双向链表为空
        if (this.head == null) {
          this.head = node  // 将新节点赋值给头节点
          this.tail = node  // 将新节点赋值给尾节点
        } else {
          // 情况二：双向链表不为空
          node.next = current  // {2}将新节点的next指向头节点
          current.prev = node  // {3}将头节点的prev指向新节点
          this.head = node  // {4}将头节点指向新节点
        }
      } else if (index === this.count) {  // 在最后一个位置插入元素
        current = this.tail  // {5}记录尾节点
        current.next = node  // {6}将尾节点的next指向新节点
        node.prev = current  // {7}将新节点的prev指向尾节点
        this.tail = node  // {8}将尾节点指向新节点
      } else {
        // 在链表中间插入元素
        const previous = this.getElementAt(index - 1)  // {9}获取前一个节点
        current = previous.next  // {10}获取当前需要插入位置的节点
        node.next = current  // {11}将新节点的next指向当前节点
        previous.next = node  // {12}将前一个节点的next指向新节点
        current.prev = node  // {13}将当前节点的prev指向新节点
        node.prev = previous  // {14}将新节点的prev指向前一个节点
      }
      this.count++
      return true
    }
    return false
  }

  // 从任意位置移除元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      // 移除第一个元素
      if (index === 0) {
        this.head = current.next  // {1}将头节点指向当前节点的下一个节点
        if (this.count == 1) {
          this.tail = undefined  // 双向链表只有一个元素时，将尾节点置空
        } else {
          this.head.prev = undefined  // {3}将头节点的prev置空
        }
      } else if (index === this.count - 1) {  // 移除最后一个元素
        current = this.tail  // {4}记录尾节点
        this.tail = current.prev  // {5}将尾节点指向当前节点的上一个节点
        this.tail.next = undefined  // {6}将尾节点的next置空
      } else {
        current = this.getElementAt(index)  // {7}记录当前节点
        const previous = current.prev  // {8}记录前一个节点
        previous.next = current.next  // {9}将前一个节点的next指向当前节点的下一个节点
        current.next.prev = previous  // {10}将当前节点的下一个节点的prev指向前一个节点
      }
      this.count--
      return current.element
    }
    return undefined
  }

  // 向链表尾部添加元素
  push(element) {
    const node = new DoublyNode(element)
    if (this.head == null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node  // 将尾节点的next指向新节点
      node.prev = this.tail  // 将新节点的prev指向前尾节点
      this.tail = node  // 将尾节点指向新节点
    }
    this.count++
  }

  // 获取尾节点
  getTail() {
    return this.tail;
  }

  // 清空链表
  clear() {
    super.clear();
    this.tail = undefined;
  }

  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while (current != null) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  inverseToString() {
    if (this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
