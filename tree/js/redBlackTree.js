import BinarySearchTree from './binarySearchTree.js';
import Node from '../models/node.js';
import { Compare, defaultCompare } from '../models/compare.js'

// 创建红黑树节点
class RedBlackNode extends Node {
  constructor(key) {
    super(key)
    this.key = key
    this.color = 'RED'  // 默认为红色 因为插入为红色代价更小
    this.parent = null  // 指向父节点的引用
  }

  isRed() {
    return this.color === 'RED'
  }
}

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  // 重写insertNode方法
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {  // 左侧子节点为空
        node.left = new RedBlackNode(key)
        node.left.parent = node  // 保存被插入节点的父节点
        return node.left  // 返回插入节点的引用
      } else {
        return this.insertNode(node.left, key)
      }
    } else {
      if (node.right == null) {  // 右侧子节点为空
        node.right = new RedBlackNode(key)
        node.right.parent = node  // 保存被插入节点的父节点
        return node.right  // 返回插入节点的引用
      } else {
        return this.insertNode(node.right, key)
      }
    }
  }

  // 验证红黑树属性
  fixTreeProperties(node) {
    // 验证父节点是否是红色以及这个节点不为黑色
    while (node && node.parent && node.parent.color.isRed() && node.color !== 'BLACK') {
      let parent = node.parent // 保存父节点
      const grandParent = parent.parent  // 保存祖父节点

      // 情况1：父节点是祖父节点的左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right  // 保存叔节点
        // 叔节点存在并且是红色
        if (uncle && uncle.color.isRed()) {
          grandParent.color = 'RED'  // 祖父节点设为红色
          parent.color = 'BLACK'  // 父节点设为黑色
          uncle.color = 'BLACK'  // 叔节点设为黑色
          node = grandParent  // 继续验证
        } else {
          // 节点是右侧子节点
          if (node === parent.right) {
            this.rotationRR(parent)  // 先右旋
            node = parent  // 更新节点
            parent = node.parent  // 更新父节点
          }
          // 节点是左侧子节点
          this.rotationLL(grandParent)  // 以祖父节点为基准
          parent.color = 'BLACK'  // 更新父节点颜色
          grandParent.color = 'RED'  // 更新祖父节点颜色
          node = parent  // 更新当前节点的引用 继续检查冲突
        }
      } else {
        // 情况2：父节点是祖父节点的右侧子节点
        const uncle = grandParent.left  // 保存叔节点
        // 叔节点存在并且是红色
        if (uncle && uncle.color.isRed()) {
          grandParent.color = 'RED'
          parent.color = 'BLACK'
          uncle.color = 'BLACK'
          node = grandParent
        } else {
          // 节点是左侧子节点
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          // 节点是右侧子节点
          this.rotationRR(grandParent);
          parent.color = 'BLACK'
          grandParent.color = 'RED'
          node = parent
        }
      }
    }
    this.root.color = 'BLACK'  // 根节点设为黑色
  }

  // 插入节点
  insert(key) {
    if (this.root == null) {  // 树为空
      this.root = new RedBlackNode(key)  // 创建一个红黑树节点
      this.root.color = 'BLACK'  // 根节点设为黑色
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)  // 修复红黑树属性
    }
  }

  // LL型旋转
  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if (tmp.right && tmp.right.key) {
      tmp.right.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    }
    else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      }
      else {
        node.parent.right = tmp;
      }
    }
    tmp.right = node;
    node.parent = tmp;
  }

  // RR型旋转
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node;
    }
    tmp.parent = node.parent;
    if (!node.parent) {
      this.root = tmp;
    }
    else {
      if (node === node.parent.left) {
        node.parent.left = tmp;
      }
      else {
        node.parent.right = tmp;
      }
    }
    tmp.left = node;
    node.parent = tmp;
  }
}