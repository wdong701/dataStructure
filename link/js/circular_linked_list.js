import { Node } from '../models/link-node.js'
import LinkedList from './linked_list.js'

export default class CircularLinkedList extends LinkedList {
  constructor() {
    super()
  }
  // 向尾部添加元素
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    node.next = this.head;
    this.count++;
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      let current = this.head
      if (index === 0) {
        if (this.head == null) {
          this.head = node  // 将新节点赋值给头节点
          node.next = this.head  // 将新节点的next指向头节点
        } else {
          node.next = current  // 将新节点的next指向头节点
          current = this.getElementAt(this.size())  // 获取尾节点
          this.head = node  // 将头节点指向新节点
          current.next = this.head  // 将尾节点的next指向头节点
        }
      } else {
        // 在循环链表中间插入新元素，对循环链表的第一个和最后一个节点没有做任何修改
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  // 从链表中移除元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        if (this.size() === 1) {
          this.head = undefined
        } else {
          const removed = this.head
          current = this.getElementAt(this.size())  // {2}获取尾节点
          this.head = this.head.next  // {3}将head指向第二个元素
          current.next = this.head  // {4}将尾节点的next指向head
          current = removed  // {5}将current指向被删除的节点
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
}