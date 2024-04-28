---
highlight: a11y-dark
---
**集合**是由一组无序且唯一（即不能重复）的项组成的。

### 一、创建集合类
```javascript
class Set {
  constructor (){
    this.items = {}  // 对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的
  }
}
```
**声明集合可用的方法:**
- add(element)：向集合添加一个新元素。
- delete(element)：从集合移除一个元素。
- has(element)：如果元素在集合中，返回 true，否则返回 false。
- clear()：移除集合中的所有元素。
- size()：返回集合所包含元素的数量。它与数组的 length 属性类似。
-  values()：返回一个包含集合中所有值（元素）的数组。

#### 1.has(element)方法
```javascript
has(element) {
  return Object.prototype.hasOwnProperty.call(this.items, element)
}
```
#### 2.add 方法
```javascript
add(element) {
  if (!this.has(element)) {  // 如果元素不存在，添加到集合中
    this.items[element] = element
    return true
  }
  return false
}
```
#### 3.delete 方法
```javascript
delete(element) {
  if (this.has(element)) {  // 元素存在集合中
    delete this.items[element]
    return true
  }
  return false
}
```
#### 4.clear 方法
```javascript
clear() {
  this.items = {}
}
```
#### 5.size 方法
Object 类有一个 keys 方法，它返回一个包含给定对象所有属性的数组。但存在兼容性问题。
```javascript
size(){
  return Object.keys(this.items).length
}
```
可以手动提取 items 对象的每一个属性，记录属性的个数并返回这个数。
```javascript
sizeLegacy() {
  let count = 0
  for (let key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      count++
    }
  }
  return count
}
```
#### 6.values 方法
可以使用 Object 类内置的 values 方法。
```javascript
values() {
  return Object.values(this.items)
}
```
解决兼容性问题：
```javascript
valuesLegacy() {
  let values = []
  for (let key in this.items) {
    if (this.items.hasOwnProperty(key)) {
      values.push(this.items[key])
    }
  }
  return values
}
```
### 二、集合运算
- **并集**：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
- **交集**：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
- **差集**：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
- **子集**：验证一个给定集合是否是另一集合的子集。

#### 1.并集
```javascript
union(otherSet) {
  const unionSet = new Set()  // 新建一个空集合, 用于存储并集
  this.values().forEach(value => unionSet.add(value))  // 遍历当前集合, 将元素添加到并集中
  otherSet.values().forEach(value => unionSet.add(value))  // 遍历 otherSet, 将元素添加到并集中
  return unionSet
}
```
#### 2.交集
```javascript
intersection(otherSet) {
  const intersectionSet = new Set()  // 新建一个空集合, 用于存储交集
  const values = this.values()  // 获取当前集合中的所有元素
  const otherValues = otherSet.values()  // 获取 otherSet 中的所有元素
  let biggerSet = values  // 假设当前的集合元素较多
  let smallerSet = otherValues
  if (otherValues.length - values.length > 0) {  // 如果 otherSet 中的元素较多
    biggerSet = otherValues
    smallerSet = values
  }
  // 迭代较小集合提高效率
  smallerSet.forEach(value => {
    if (biggerSet.includes(value)) {  // 如果biggerSet存在smallerSet集合中的元素
      intersectionSet.add(value)   // 将元素添加到交集中
    }
  })
  return intersectionSet
}
```
#### 3.差集
```javascript
difference(otherSet) {
  const differenceSet = new Set()  // 新建一个空集合, 用于存储差集
  this.values().forEach(value => {  // 遍历当前集合
    if (!otherSet.has(value)) {  // 如果 otherSet 中不存在当前集合中的元素
      differenceSet.add(value)  // 将当前集合中的元素添加到差集中
    }
  })
  return differenceSet
}
```
#### 4.子集
```javascript
// 方法一
isSubsetOf(otherSet) {
  if (this.size() > otherSet.size()) {  // 如果当前集合中的元素个数大于 otherSet 的元素个数
    return false
  }
  let isSubset = true
  this.values().forEach(value => {
    if (!otherSet.has(value)) {  // 如果 otherSet 中不存在当前集合中的元素
      isSubset = false
      return false
    }
    return true
  })
  return isSubset
}

// 使用every改写子集
isSubsetOf(otherSet) {
  const values = this.values();
  return values.every((value) => otherSet.has(value));
}
```