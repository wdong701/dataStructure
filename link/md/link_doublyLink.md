---
highlight: a11y-dark
---
- 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dda9aa6b0d2744d4be0c5c5240ac7b83~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=639&h=133&s=28244&e=png&b=fdfdfd)

**链表优点：**
1. 元素在内存中并不是连续放置的，可以充分利用计算机的内存。
2. 大小是不固定的，可以无限延伸。
3. 添加或移除元素的时候不需要移动其他元素。

**链表缺点：**
1. 访问链表中间的一个元素，则需要从起点（表头）开始迭代链表直到找到所需的元素。

## 一、链表
### 创建链表
```javascript
//  用于保存每个节点信息
class Node {
  constructor(element) {
    this.element = element  //链表元素的值
    this.next = undefined   //指向链表中下一个元素的指针
  }
}

class LinkedList {
  constructor() {
    this.count = 0  //记录链表的长度
    this.head = undefined  //链表的头结点
  }
}
```
#### LinkedList 类的方法:
1. push(element)：向链表尾部添加一个新元素。
2. insert(element, position)：向链表的特定位置插入一个新元素。
3. getElementAt(index)：返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
4. remove(element)：从链表中移除一个元素。
5. indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1。
6. removeAt(position)：从链表的特定位置移除一个元素。
7. isEmpty()：如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false。
8. size()：返回链表包含的元素个数，与数组的 length 属性类似。
9. toString()：返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。

### 1. 向链表尾部添加元素
链表为空时：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ec2a961bf85441e9f3797f1fad66c09~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=529&h=169&s=14730&e=png&b=fefefe)

链表不为空时：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/813502136a3d4a81854113115ed3792c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=401&h=218&s=27392&e=png&b=fefefe)

```javascript
push(element) {
  const node = new Node(element)  //创建一个新节点
  let current  //记录当前位置，用于保存查找节点

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
```
### 2. 从链表中移除元素
移除第一个元素过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/119d4d45ed1a4dbcad5fcad70904a607~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=772&h=163&s=30365&e=png&b=fefefe)
移除最后一个元素和中间元素过程：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56d8192e777b44b491d2d8e263b095da~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=676&h=201&s=44073&e=png&b=fdfdfd)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/297c2317d6014df4a0c2c2762ebcde6e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=542&h=211&s=23088&e=png&b=fefefe)
```javascript
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
```

### 3. 封装循环迭代链表直到目标位置
```javascript
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
```
### 4. 在任意位置插入元素
头部位置插入元素过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7fd1b133433a4454a58a22b9ebb3d728~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=490&h=232&s=33994&e=png&b=fefefe)

链尾插入元素过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/048ac443a865458d9e7875f0e8a57d7f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=674&h=313&s=59974&e=png&b=fefefe)

中间位置插入元素过程：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18021c1348bb410ebfb267637f9f019f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=705&h=291&s=31253&e=png&b=fefefe)
```javascript
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
```
### 5. 返回一个元素的位置
```javascript
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
```
### 6. 从链表中移除元素
```javascript
remove(element) {
  const index = this.indexOf(element)  // 获取元素的位置
  return this.removeAt(index)  // 移除元素
}
```
### 7. isEmpty、size 和 getHead 方法
```javascript
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
```
### 8. toString 方法
```javascript
toString() {
  if (this.head == null) {
    return ''  // 链表为空
  }
  let objString = `${this.head.element}`  // 头节点的值
  let current = this.head.next  // 记录当前节点
  for (let i = 1; i < this.size && current != null; i++) {
    objString = `${objString},${current.element}`
    current = current.next
  }
  return objString
}
```
## 二、双向链表
双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素，如下图所示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a4285a64232437a9ee97152f5a6d828~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=782&h=196&s=23542&e=png&b=fefefe)

### 创建双链列表：
```javascript
// 创建双向链表节点
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;   // 指向链表中上一个元素的指针
  }
}
// 创建双向链表
class DoublyLinkedList extends LinkedList {
  constructor() {
    super()
    this.tail = undefined  // 保存对链表最后一个元素的引用
  }
}
```
### 1.在任意位置插入新元素
链表第一个位置插入过程：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0412d483194e463e9f1fc33845450e92~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=723&h=271&s=46540&e=png&b=fefefe)
链表尾部插入过程：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f44ca7fbcb4346eca74195d32916ef80~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=784&h=302&s=37891&e=png&b=fefefe)
链表中间位置插入过程：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e47e6b802474b5ebb0dc4c82bd252e5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=785&h=290&s=54460&e=png&b=fefefe)

```javascript
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
```
### 2.从任意位置移除元素
链表头部删除元素过程：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1676de2a132e4e009b3888ac21091ec9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=736&h=226&s=35190&e=png&b=fefefe)
链表尾部删除元素过程：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8c0156bb28848cd9b12cf21d8726869~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=777&h=219&s=33799&e=png&b=fdfdfd)
链表中间位置删除元素过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15a2f9a9ba4a48a9a508ad8fdeda9fb7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=789&h=232&s=51891&e=png&b=fefefe)
```javascript
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
```
### 3.向链表尾部添加元素
```javascript
push(element){
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
```