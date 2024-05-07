---
highlight: a11y-dark
theme: juejin
---
#### 一、概念

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f718f2c263574077b6cb8d2e8e0806de~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=703&h=391&s=112030&e=png&b=fcfcfc)

每个节点都有一个父节点（除了顶部的第一个节点）以及零个或多个子节点。

位于树顶部的节点叫作**根节点**，它没有父节点。

树中的每个元素都叫作节点，节点分为**内部节点**和**外部节点**。

**至少有一个子节点**的节点称为内部节点（7、5、9、15、13 和 20 是内部节点）。**没有子元素的节点**称为外部节点或叶节点（3、6、8、10、12、14、18 和 25 是叶节点）。

一个节点可以有祖先和后代。

**子树**由节点和它的后代构成。例如，节点 13、12 和 14 构成了上图中树的一棵子树。

节点的一个属性是**深度**，节点的深度取决于**它的祖先节点的数量**。比如，节点 3 有 3 个祖先节点（5、7 和 11），它的深度为 3。

树的**高度**取决于所有节点深度的最大值。一棵树也可以被分解成层级。根节点在第 0 层，它的子节点在第 1 层，以此类推。上图中的树的高度为 3。

#### 二、二叉树和二叉搜索树

**二叉树**中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出更高效地在树中插入、查找和删除节点的算法。

**二叉搜索树**（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。上图中就是一棵二叉搜索树。

**创建二叉搜索树中的节点**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89016ebfbcc5488499bcb72d9ee39232~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=655&h=305&s=25342&e=png&b=fefefe)
```javascript
class Node {
  constructor(key) {
    this.key = key  // 节点值
    this.left = null  // 左侧子节点引用
    this.right = null  // 右侧子节点引用
  }
}
```
**基本结构**
```javascript
export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {  // 同链表
    this.compareFn = compareFn  // 比较函数
    this.root = null  // 根节点
  }
}
```
**方法：**

- insert(key)：向树中插入一个新的键。
- search(key)：在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回false。
- inOrderTraverse()：通过中序遍历方式遍历所有节点。
- preOrderTraverse()：通过先序遍历方式遍历所有节点。
- postOrderTraverse()：通过后序遍历方式遍历所有节点。
- min()：返回树中最小的值/键。
- max()：返回树中最大的值/键。
- remove(key)：从树中移除某个键。

#### 1.向二叉搜索树中插入一个键
```javascript
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
```
#### 2.中序遍历
```javascript
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
  this.inOrderTraverseNode(this.root, callback);
}
```
**测试**
```javascript
const printNode = (value) => console.log(value);
tree.inOrderTraverse(printNode);
// 结果： 5 6 7 8 9 10 11 12 13 14 15 18 20 25
```
访问路径图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3341dd5b5a54560ad9750d65e76c0c3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=529&h=306&s=54743&e=png&b=fefefe)

#### 3.先序遍历
```javascript
preOrderTraverseNode(node, callback) {
  if (node != null) {
    // 先访问节点本身
    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }
}

preOrderTraverse(callback) {
  this.preOrderTraverseNode(this.root, callback);
}
```
**测试**
```javascript
const printNode = (value) => console.log(value);
tree.preOrderTraverse(printNode);
// 结果：11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
```
访问路径图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40cf839744b24cc38aea456bb700398b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=483&h=316&s=49969&e=png&b=fdfdfd)

#### 4.后序遍历
```javascript
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
```
**测试**
```javascript
const printNode = (value) => console.log(value);
tree.postOrderTraverse(printNode);
// 结果：3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
```
访问路径图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c00c7577fe9e4ce496ebf7d384c21024~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=485&h=296&s=51694&e=png&b=fefefe)

#### 5.最小值和最大值

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/372cfe3e1520481a8eec388e80532dd5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=493&h=310&s=63056&e=png&b=fdfdfd)

最小值，总是沿着树的左边，最后一层最左侧的节点。同理最大值沿着树的右边，最后一层最右侧。
```javascript
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
```
```javascript
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
```

#### 6.搜索一个特定的值
```javascript
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
```
#### 7.移除一个节点
```javascript
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
```
分析：情况一，**删除的为叶节点**，节点的值已经是 null 了，父节点指向它的指针也会接收到这个值，这也是为什么要在函数中返回节点的值。父节点总是会接收到函数的返回值。下图为过程：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ee8ca67bcc04d9ebdc6c684a9544ebc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=504&h=305&s=58490&e=png&b=fefefe)

情况二：**移除有一个左侧子节点或右侧子节点的节点**。这种情况下，需要跳过这个节点，直接将父节点指向它的指针指向子节点。如果这个节点没有左侧子节点，也就是说它有一个右侧子节点。因此我们把对它的引用改为对它右侧子节点的引用并返回更新后的节点。没有右侧节点同理。过程如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6613fff58684c5b9e4a39ad7322756b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=516&h=295&s=43628&e=png&b=fefefe)

情况三：**移除有两个子节点的节点**，执行四个步骤
1. 当找到了要移除的节点后，需要找到它右边子树中最小的节点。
2. 然后，用它右侧子树中最小节点的键去更新这个节点的值。改变这个节点的键，也就是说它被移除了。
3. 但是，这样在树中就有两个拥有相同键的节点了。要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了。
4. 最后，向它的父节点返回更新后节点的引用。

**过程如下图：**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f65062230d494f3a85c34a3013179732~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=593&h=314&s=62304&e=png&b=fcfcfc)

#### 三、自平衡树（AVL 树）
AVL树是一种自平衡树。添加或移除节点时，AVL树会尝试保持自平衡。任意一个节点（不论深度）的左子树和右子树高度最多相差 1。添加或移除节点时，AVL树会尽可能尝试转换为完全树。

**结构:**
```javascript
class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
}
```
AVL 树是一个 BST，可以扩展我们写的 BST 类，只需要覆盖用来维持 AVL 树平衡的方法，也就是 insert、insertNode 和 removeNode 方法。其他方法会被继承。

在 AVL 树中插入或移除节点和 BST 完全相同。然而，AVL 树的不同之处在于我们需要检验它的平衡因子。

##### 1. 节点的高度和平衡因子
节点的高度是从节点到其任意子节点的边的最大值，如下图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a5e7e8949b344a0bb5346c25032a869~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=388&h=274&s=42815&e=png&b=fefefe)

计算节点高度代码如下
```javascript
getNodeHeight(node) {
  if (node == null) {
    return -1;
  }
  return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
}
```
在 AVL 树中，需要对每个节点计算右子树高度（hr）和左子树高度（hl）之间的差值，该值（hr－hl）应为 0、1 或-1。如果结果不是这三个值之一，则需要平衡该 AVL 树。

##### 2. 平衡操作——AVL 旋转
在对 AVL 树添加或移除节点后，计算节点的高度并验证树是否需要进行平衡。向 AVL树插入节点时，可以执行单旋转或双旋转两种平衡操作，分别对应四种场景。

- **左-左（LL）：向右的单旋转**

节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的，如下图所示。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32a8dc2ba3d54607a02490cd761170ef~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=522&h=208&s=22298&e=png&b=fefefe)

如下图，AVL 树插入节点 5，这会造成树失衡（节点 50-Y 高度为+2），需要恢复树的平衡。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/523237d2d7f3419db69f54df6ee98cac~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=598&h=266&s=42090&e=png&b=fefefe)

执行的操作如下：
1. 与平衡操作相关的节点有三个（X、Y、Z），将节点 X 置于节点 Y（平衡因子为+2）所在的位置。
2. 节点 X 的左子树保持不变。
3. 将节点 Y 的左子节点置为节点 X 的右子节点。
4. 将节点 X 的右子节点置为节点 Y。

代码如下：
```javascript
rotationLL(node){
  const tmp = node.left  // 记录节点，30
  node.left = tmp.right  // 将40节点挂载到50节点的左子树
  tmp.right = node  // 将50节点挂载到30节点的右子树
  return tmp  // 返回旋转后的根节点
}
```

- **右-右（RR）：向左的单旋转**

右-右的情况和左-左的情况相反。它出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的，如下图所示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa28f7bf9e75438cb384f32b0bcb80ae~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=477&h=199&s=21202&e=png&b=fefefe)

如下图，向 AVL 树插入节点 90，这会造成树失衡（节点 50-Y 高度为-2）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd3dac5280ed407cbee3e0c82cc17685~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=585&h=249&s=61817&e=png&b=fefefe)

执行的操作如下：
1. 与平衡操作相关的节点有三个（X、Y、Z），将节点 X 置于节点 Y（平衡因子为-2）所在的位置。
2. 节点 X 的右子树保持不变。
3. 将节点 Y 的右子节点置为节点 X 的左子节点。
4. 将节点 X 的左子节点置为节点 Y。

代码如下：
```javascript
rotationRR(node){
  const tmp = node.right  // 记录节点，70
  node.right = tmp.left  // 将60节点挂载到50节点的右子树
  tmp.left = node  // 将50节点挂载到70节点的左子树
  return tmp  // 返回旋转后的根节点
}
```
- **左-右（LR）**

出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重。在这种情况下，我们可以对左侧子节点进行左旋转来修复，这样会形成左左的情况，然后再对不平衡的节点进行一个右旋转来修复，如下图所示。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/863ce504585a477aa89e2bef4d1e563a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=915&h=299&s=69054&e=png&b=fdfdfd)

如下图，AVL 树插入节点 6，这会造成树失衡（节点 9 高度为+2）。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0427d2d630b142a8b1ddddfe49735d8d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=742&h=347&s=117059&e=png&b=000000)

过程：左旋节点9的左孩子，然后右旋节点9

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/765336e834534fb29acace7653a232e2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=692&h=405&s=101491&e=png&b=000000)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04793c613c1d43948936a18c002b2ea3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=311&h=320&s=66177&e=png&b=000000)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5433f03a2d3e48ed80d94b8cd936b855~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=339&h=302&s=63056&e=png&b=000000)

代码如下：
```javascript
rotationLR(node) {
  node.left = this.rotationRR(node.left);
  return this.rotationLL(node);
}
```
- **右-左（RL）**
这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重。在这种情况下我们可以对右侧子节点进行右旋转来修复，这样会形成右-右的情况，然后我们再对不平衡的节点进行一个左旋转来修复，如下图所示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0e6bcdce7f34c5c91d38a1ad38cb06a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=937&h=287&s=111270&e=png&b=fdfdfd)

如下图，AVL 树插入节点 8，这会造成树失衡（节点 5 高度为-2）。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/369d2d3b74de43188e71ffffda70785b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=679&h=372&s=114162&e=png&b=000000)

过程：右旋5的右孩子，然后在左旋。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47427d15e2dd48fbbd07c6b13cc40ce1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=717&h=422&s=101722&e=png&b=000000)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5645160627304e80b6803439ff91d948~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=309&h=330&s=65743&e=png&b=000000)
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/168e59265f05411d85f3aec4e20bf664~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=312&h=269&s=64988&e=png&b=000000)

代码如下：
```javascript
rotationRL(node) {
  node.right = this.rotationLL(node.right);
  return this.rotationRR(node);
}
```

**总结**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7df5337637ec45f0b64d7cf641563823~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1072&h=252&s=133745&e=png&b=010101)
##### 3. 向 AVL 树插入节点
向 AVL 树插入节点和在 BST 中是一样的。除了插入节点外，我们还要验证插入后树是否还是平衡的，如果不是，就要进行必要的旋转操作。
```javascript
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
  if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){  // 向左侧子树插入节点后树不平衡
    // 比较插入的键是否小于左侧子节点的键
    if(this.compareFn(key, node.left.key) === Compare.LESS_THAN){
      // 小于进行LL旋转
      node = this.rotationLL(node);
    } else {
      // 大于进行LR旋转
      return this.rotationLR(node);
    }
  }
  // 右侧子树插入节点后树不平衡
  if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
    // 比较插入的键是否大于右侧子节点的键
    if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN){
      // 大于进行RR旋转
      node = this.rotationRR(node);
    }else{
      // 小于进行RL旋转
      return this.rotationRL(node);
    }
  }
  return node;
}

insert(key) {
  this.root = this.insertNode(this.root, key);
}
```
##### 4. 从 AVL 树中移除节点
```javascript
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
```