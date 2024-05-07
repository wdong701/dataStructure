import { Compare, defaultCompare } from '../models/compare.js'
// 创建二叉搜索树中的节点
class Node {
  constructor(key) {
    this.key = key  // 节点值
    this.left = null  // 左侧子节点引用
    this.right = null  // 右侧子节点引用
  }
}

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn  // 比较函数
    this.root = null  // 根节点
  }

  // 找到新节点应该插入的位置
  insertNode(node, key) {
    // 新节点的键小于当前节点的键
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 没有左侧子节点则插入新的节点
      if (node.left == null) {
        node.left = new Node(key)
      } else {
        // 否则递归调用
        this.insertNode(node.left, key)
      }
    } else {  // 新节点的键大于当前节点的键
      // 没有右侧子节点则插入新的节点
      if (node.right == null) {
        node.right = new Node(key)
      } else {
        // 否则递归调用
        this.insertNode(node.right, key)
      }
    }
  }

  // 插入键
  insert(key) {
    if (this.root == null) {
      // 如果树是空的，则插入根节点
      this.root = new Node(key)
    } else {
      // 将节点添加到根节点以外的其他位置
      this.insertNode(this.root, key)
    }
  }

  // 中序遍历
  inOrderTraverseNode(node, callback) {
    // 检查传入的节点是否为 null
    if (node != null) {
      // 递归调用函数来访问左侧子节点
      this.inOrderTraverseNode(node.left, callback)
      // 对根节点操作
      callback(node.key)
      // 访问右侧子节点
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  // 先序遍历
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      // 先访问节点本身
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  // 后序遍历
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  // 最小值
  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current
  }

  min() {
    return this.minNode(this.root)
  }

  // 最大值
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  max() {
    return this.maxNode(this.root);
  }

  // 查找特定的值
  searchNode(node, key) {
    // 验证 node 是否合法
    if (node == null) {
      return false;
    }
    // 要找的键比当前的节点小 继续在左侧的子树上搜索
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 要找的键比当前的节点大 继续在右侧的子树上搜索
      return this.searchNode(node.right, key)
    } else {
      // 要找的键和当前节点的键相等
      return true;
    }
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  // 移除节点
  removeNode(node, key) {
    if (node == null) {
      return null
    }
    // 要找的键比当前节点的值小 沿着树的左边找到下一个节点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key) // 更新了节点左指针的值
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 要找的键比当前节点的值大 沿着树的右边找到下一个节点
      node.right = this.removeNode(node.right, key)  // 更新了节点右指针的值
      return node
    } else {
      // 要找的键和当前节点的值相等
      // 情况一：移除的是叶节点
      if (node.left == null && node.right == null) {
        node = null  // 给这个节点赋予 null 值来移除它
        return node  // 通过返回 null 来将对应的父节点指针赋予 null 值
      }
      // 情况二： 移除有一个左侧或右侧子节点的节点 跳过这个节点 直接将父节点指向它的指针指向子节点
      if (node.left == null) {
        // 没有左侧节点 引用改为对它右侧子节点的引用
        node = node.right
        return node
      } else if (node.right == null) {
        // 没有右侧节点 引用改为对它左侧子节点的引用
        node = node.left
        return node
      }
      // 情况三：移除有两个子节点的节点
      // 找到右子树最小的节点
      const aux = this.minNode(node.right)
      // 更新这个节点的值
      node.key = aux.key
      // 删除右子树最小的节点
      node.right = this.removeNode(node.right, aux.key)
      // 返回更新后的节点
      return node
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
}