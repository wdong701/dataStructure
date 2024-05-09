---
theme: juejin
highlight: a11y-dark
---
### 一、二叉堆数据结构
二叉堆是一种特殊的二叉树，有以下两个特性：
1. 它是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点（除了最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点，这叫作结构特性。
2. 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速导出树的最大值。所有的节点都大于等于（最大堆）或小于等于（最小堆）每个它的子节点。这叫作堆特性。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b09de6cc547484aa4f8e0681fe7c4f2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=921&h=450&s=78260&e=png&b=fefefe)

尽管二叉堆是二叉树，但并不一定是二叉搜索树。在二叉堆中，每个子节点都要大于等于父节点（最小堆）或小于等于父节点（最大堆）

#### 1. 创建最小堆类
###### 1.1 创建 MinHeap 类
```javascript
export class MinHeap{
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }
}
```
##### 1.2 二叉树的数组表示
二叉树有两种表示方式。第一种是使用一个动态的表示方式，也就是指针。第二种是使用一个数组，通过索引值检索父节点、左侧和右侧子节点的值。如下图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ed9926e1dc84b399452e1305def7e38~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=769&h=304&s=43521&e=png&b=fefefe)

访问使用普通数组的二叉树节点，对于给定位置 index 的节点：
- 它的左侧子节点的位置是 2 * index + 1
- 它的右侧子节点的位置是 2 * index + 2
- 它的父节点位置是 index / 2

访问方法如下：
```javascript
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
```
##### 1.3 向堆中插入值
这个方法向堆中插入一个新的值。如果插入成功，它返回 true，否则返回 false。

向堆中插入值是指将值插入堆的底部叶节点再执行siftUp 方法，表示我们将要将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
```javascript
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
```
如下图，中插入1，所做操作如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bfebb990844f6bad1137839c7b32e2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=918&h=250&s=68491&e=png&b=fdfdfd)

##### 1.4 从堆中找到最小值或最大值
这个方法返回最小值（最小堆）或最大值（最大堆）且不会移除这个值。在最小堆中，最小值总是位于数组的第一个位置（堆的根节点）。在最大堆中，数组的第一个元素保存了最大值。

```javascript
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
```
##### 1.5 导出堆中的最小值或最大值
这个方法移除最小值（最小堆）或最大值（最大堆），并返回这个值。
```javascript
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
```
如下图，删除根节点：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6eb81453795b47a28835e48514154a8b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=938&h=489&s=134481&e=png&b=fdfdfd)

#### 2. 创建最大堆类
MaxHeap 类的算法和 MinHeap 类的算法一模一样。不同之处在于我们要把所有>（大于）的比较换成<（小于）的比较，在需要时进行反向的比较
```javascript
export class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
}

// 反向比较
export function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}
```

#### 3. 堆排序算法
步骤：
1. 用数组创建一个最大堆用作源数据。
2. 在创建最大堆后，最大的值会被存储在堆的第一个位置。我们要将它替换为堆的最后一个值，将堆的大小减 1。
3. 最后，我们将堆的根节点下移并重复步骤 2 直到堆的大小为 1。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d971078bc4465d8449186607e1b744~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=782&h=801&s=176658&e=png&b=fcfcfc)

```javascript
import { defaultCompare } from '../../tree/models/compare.js'
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

function heapify(array, index, heapSize, compareFn) {
  let largest = index;
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;
  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}
export default function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);  // 创建一个最大堆用作源数据
  while (heapSize > 1) {
    swap(array, 0, --heapSize); // 将第一个位置的最大值替换为堆最后一个值，堆大小减一
    heapify(array, 0, heapSize, compareFn);  // 堆的根节点下移
  }
  return array;
}
```