import LinkedList from './linked_list.js'

// 定义常量
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}
// 比较元素
function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
  constructor(compareFn = defaultCompare) {
    super()
    this.compareFn = compareFn
  }

  // 找到插入元素的位置
  getIndexNextSortedElement(element) {
    let current = this.head
    let i = 0
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return i
  }

  // 向链表尾部添加元素
  push(element) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  // 插入元素
  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }
}