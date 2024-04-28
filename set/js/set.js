class Set {
  constructor() {
    this.items = {}  // 对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的
  }

  // 检验某个元素是否存在于集合中
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  // 向集合中添加元素
  add(element) {
    if (!this.has(element)) {  // 如果元素不存在，添加到集合中
      this.items[element] = element
      return true
    }
    return false
  }

  // 从集合中移除元素
  delete(element) {
    if (this.has(element)) {  // 元素存在集合中
      delete this.items[element]
      return true
    }
    return false
  }

  // 清空集合
  clear() {
    this.items = {}
  }

  // 获取集合中的元素个数
  size() {
    return Object.keys(this.items).length
  }

  // 获取集合中的元素个数  兼容性处理
  sizeLegacy() {
    let count = 0
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++
      }
    }
    return count
  }

  // values 方法
  values() {
    return Object.values(this.items)
  }

  // values 方法  兼容性处理
  valuesLegacy() {
    let values = []
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  // 并集
  union(otherSet) {
    const unionSet = new Set()  // 新建一个空集合, 用于存储并集
    this.values().forEach(value => unionSet.add(value))  // 遍历当前集合, 将元素添加到并集中
    otherSet.values().forEach(value => unionSet.add(value))  // 遍历 otherSet, 将元素添加到并集中
    return unionSet
  }

  // 交集
  // intersection(otherSet) {
  //   const intersectionSet = new Set()  // 新建一个空集合, 用于存储交集
  //   const values = this.values()  // 获取当前集合中的所有元素
  //   for (let i = 0; i < values.length; i++) {
  //     if (otherSet.has(values[i])) {  // 如果 otherSet 中存在当前集合中的元素
  //       intersectionSet.add(values[i])  // 将元素添加到交集中
  //     }
  //   }
  //   return intersectionSet
  // }

  // 优化交集
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

  // 差集
  difference(otherSet) {
    const differenceSet = new Set()  // 新建一个空集合, 用于存储差集
    this.values().forEach(value => {  // 遍历当前集合
      if (!otherSet.has(value)) {  // 如果 otherSet 中不存在当前集合中的元素
        differenceSet.add(value)  // 将当前集合中的元素添加到差集中
      }
    })
    return differenceSet
  }

  // 子集
  // isSubsetOf(otherSet) {
  //   if (this.size() > otherSet.size()) {  // 如果当前集合中的元素个数大于 otherSet 的元素个数
  //     return false
  //   }
  //   let isSubset = true
  //   this.values().forEach(value => {
  //     if (!otherSet.has(value)) {  // 如果 otherSet 中不存在当前集合中的元素
  //       isSubset = false
  //       return false
  //     }
  //     return true
  //   })
  //   return isSubset
  // }

  // 使用every改写子集
  isSubsetOf(otherSet) {
    const values = this.values();
    return values.every((value) => otherSet.has(value));
  }
}