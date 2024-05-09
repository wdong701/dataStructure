import { Compare, defaultCompare } from '../../tree/models/compare.js'

export default class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  // 访问左侧节点
  getLeftIndex(index) {
    return (2 * index) + 1;
  }

  // 访问右侧节点
  getRightIndex(index) {
    return (2 * index) + 2;
  }

  // 访问父节点
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  // 上移操作
  siftUp(index) {
    let parent = this.getParentIndex(index)  // 获取父节点
    while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN) {
      this.swap(this.heap, parent, index)  // 交换父节点和当前节点
      index = parent
      parent = this.getParentIndex(index)  // 重复过程直到堆的根节点也经过了交换节点和父节点位置的操作
    }
  }

  // 交换操作
  swap(array, a, b) {
    const temp = array[a]  // 定义临时变量
    array[a] = array[b];
    array[b] = temp;
  }

  // 插入值
  insert(value) {
    if (value != null) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  // 获取堆大小
  size() {
    return this.heap.length
  }

  // 堆是否为空
  isEmpty() {
    return this.size() === 0
  }

  // 查找最小值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  // 移除堆中最小值或最大值
  extract() {
    if (this.isEmpty()) {
      return undefined
    }
    // 堆中只有一个值
    if (this.size() === 1) {
      return this.heap.shift();
    }
    // 不止一个值
    const removedValue = this.heap.shift()   // 移除堆中的根节点
    this.heap[0] = this.heap.pop()  // 将最后一个节点赋给根节点
    this.siftDown(0)   // 从根节点开始下移操作
    return removedValue
  }

  // 下移操作
  siftDown(index) {
    let element = index
    const left = this.getLeftIndex(index)  // 获取左侧节点
    const right = this.getRightIndex(index)  // 获取右侧节点
    const size = this.size()
    // 如果元素比左侧子节点要大
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left  // 交换元素和它的左侧子节点
    }
    // 如果右侧子节点存在并且比当前元素小
    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right  // 交换元素和它的右侧子节点
    }
    if (element !== index) {
      this.swap(this.heap, index, element)
      this.siftDown(element)
    }
  }
}