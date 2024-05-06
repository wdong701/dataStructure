---
highlight: a11y-dark
---
### 一、字典
在字典中，存储的是【键，值】对，其中键名是用来查询特定元素的。字典和集合很相似，集合以【值，值】的形式存储元素，字典则是以【键，值】的形式来存储元素。字典也称作映射、符号表或关联数组。

**创建字典类**
```javascript
import { defaultToString } from '../../util/util'
export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn  // 将 key 转化为字符串
    this.table = {}
  }
}
```
```javascript
export function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } if (item === undefined) {
    return 'UNDEFINED';
  } if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}
```
**声明方法：**
- set(key,value)：向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
- remove(key)：通过使用键值作为参数来从字典中移除键值对应的数据值。
- hasKey(key)：如果某个键值存在于该字典中，返回 true，否则返回 false。
- get(key)：通过以键值作为参数查找特定的数值并返回。
- clear()：删除该字典中的所有值。
- size()：返回字典所包含值的数量。与数组的 length 属性类似。
- isEmpty()：在 size 等于零的时候返回 true，否则返回 false。
- keys()：将字典所包含的所有键名以数组形式返回。
- values()：将字典所包含的所有数值以数组形式返回。

#### 1.检测一个键是否存在于字典中
```javascript
hasKey(key) {
  return this.table[this.toStrFn(key)] != null
}
```
#### 2.添加键值对
```javascript
set(key, value) {
  if (key != null && value != null) {
    const tableKey = this.toStrFn(key)
    this.table[tableKey] = value
    return true
  }
  return false
}
```
#### 3.从字典中移除一个值
```javascript
remove(key) {
  if (this.hasKey(key)) {
    delete this.table[this.toStrFn(key)]
    return true
  }
  return false
}
```
#### 4.从字典中检索一个值
```javascript
get(key) {
  if (this.hasKey(key)) {
    return this.table[this.toStrFn(key)]
  }
  return undefined
}
```
#### 5.返回键
```javascript
keys() {
  return Object.keys(this.table)
}
```
#### 6.返回值
```javascript
values() {
  return Object.values(this.table)
}
```
#### 7.返回字典中的值的个数
```javascript
size() {
  return Object.keys(this.table).length
}
```
#### 8.清空字典
```javascript
clear() {
  this.table = {}
}
```
#### 9.字典是否为空
```javascript
isEmpty() {
  return this.size() === 0
}
```