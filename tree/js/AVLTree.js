import BinarySearchTree from './binarySearchTree.js';
import { Compare, defaultCompare } from '../models/compare.js'

// 定义常量处理平衡因子
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
}

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  // 计算节点高度
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  // 计算平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  // 左-左（LL）：向右的单旋转
  rotationLL(node) {
    const tmp = node.left  // 记录节点，30
    node.left = tmp.right  // 将40节点挂载到50节点的左子树
    tmp.right = node  // 将50节点挂载到30节点的右子树
    return tmp  // 返回旋转后的根节点
  }

  // 右-右（RR）：向左的单旋转
  rotationRR(node) {
    const tmp = node.right  // 记录节点，70
    node.right = tmp.left  // 将60节点挂载到50节点的右子树
    tmp.left = node  // 将50节点挂载到70节点的左子树
    return tmp  // 返回旋转后的根节点
  }

  // 左-右（LR）：向右的双旋转
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  // 右-左（RL）：向左的双旋转
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  // 插入节点
  insertNode(node, key) {
    // 为空
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 插入新节点的键小于当前节点的键
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      // 插入新节点的键大于当前节点的键
      node.right = this.insertNode(node.right, key);
    } else {
      return node;  // 重复的键
    }

    // 对树进行平衡操作
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {  // 向左侧子树插入节点后树不平衡
      // 比较插入的键是否小于左侧子节点的键
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 小于进行LL旋转
        node = this.rotationLL(node);
      } else {
        // 大于进行LR旋转
        return this.rotationLR(node);
      }
    }
    // 右侧子树插入节点后树不平衡
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 比较插入的键是否大于右侧子节点的键
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // 大于进行RR旋转
        node = this.rotationRR(node);
      } else {
        // 小于进行RL旋转
        return this.rotationRL(node);
      }
    }
    return node;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  // 移除节点
  removeNode(node, key) {
    node = super.removeNode(node, key)
    if (node == null) {
      return node // 不需要进行平衡
    }
    // 检查是否平衡
    const balanceFactor = this.getBalanceFactor(node)

    // 从左侧子树移除节点后树不平衡了
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 左侧子树的平衡因子
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        // 如果左侧子树向左不平衡 进行LL旋转
        return this.rotationLL(node)
      }
      // 左侧子树向右不平衡 进行 LR 旋转
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node)
      }
    }

    // 从右侧子树移除节点后树不平衡了
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // 右侧子树的平衡因子
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        // 如果右侧子树向右不平衡 进行RR旋转
        return this.rotationRR(node)
      }
      // 右侧子树向左不平衡 进行 RL 旋转
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node)
      }
    }
    return node
  }
}