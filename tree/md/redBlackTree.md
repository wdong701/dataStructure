---
highlight: a11y-dark
theme: juejin
---
**红黑树**也是一个自平衡二叉搜索树。当需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。如果插入和删除频率较低（我们更需要多次进行搜索操作），那么 AVL 树比红黑树更好。

红黑树遵循规则如下：
1. 每个节点不是红的就是黑的
2. 树的根节点是黑的
3. 所有叶节点都是黑的（用 NULL 引用表示的节点）
4. 如果一个节点是红的，那么它的两个子节点都是黑的
5. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
6. 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/542d97cfc7544dfd924172116794160c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=835&h=572&s=128218&e=png&b=fefefe)
#### 1.创建 RedBlackTree 类
```javascript
class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }
}
```
#### 2.向红黑树中插入节点
**创建红黑树节点**
```javascript
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
```
**重写插入节点的方法**
```javascript
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
```
**验证红黑树属性**

要验证红黑树是否还是平衡的以及满足它的所有要求，需要使用两个概念：重新填色和旋转。

向树中插入节点后，新节点将会是红色。这不会影响黑色节点数量的规则（规则 6），但会影响规则 5：两个后代红节点不能共存。如果插入节点的父节点是黑色，那没有问题。但是如果插入节点的父节点是红色，那么会违反规则 5。要解决这个冲突，我们只需要改变父节点、祖父节点和叔节点。如下图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0efae06890204400a272e12eb4f28902~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=532&h=378&s=76742&e=png&b=fefdfd)

出现这种情况需要判断叔节点的颜色，叔节点颜色为红色时需要重新对父节点，祖父节点和叔节点变色，也就是红变黑，黑变红，再将当前插入节点指向祖父节点继续进行判定。如下图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f1a0221071a41088d937f5d42ccd8dc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=389&h=368&s=45515&e=png&b=fefdfd)

此时cur节点到达根节点，根节点应该满足颜色为黑，所以最后结果为：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb0b227179cf419192ddb821ea4b0dff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=434&h=369&s=42778&e=png&b=fefefe)

**关于红黑树旋转**

##### 1.LL型

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/421e6c15ddef4bff8b7a4c3c968d1de1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=693&h=400&s=76497&e=png&b=fefdfd)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0802ce770d0248beb2ae8b6293b076f4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=511&h=360&s=63451&e=png&b=fefdfd)

在调整颜色

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47e397c9f022461ea31bab5abd8e2cc0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=485&h=355&s=65940&e=png&b=fefdfd)

```javascript
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
```

##### 2.RR型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c14ba756b1364e5b886ea8e62596025e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=709&h=392&s=78605&e=png&b=fefdfd)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95ba9046660c4009bfdeef7b7e517cb5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=508&h=317&s=54704&e=png&b=fefdfd)

调整颜色后为：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd108724ff194e579f609200e324b795~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=531&h=320&s=58372&e=png&b=fefdfd)
```javascript
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
```
##### 3.LR型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0513832313504e20b7e7b3d83ffe879c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=727&h=318&s=63364&e=png&b=fefefe)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b222631ef26f483daa728f5fca290763~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=388&h=312&s=47034&e=png&b=fefdfd)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6878ff678be34f3b9368fdfaceb1e34e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=540&h=358&s=65567&e=png&b=fefdfd)

调整颜色后：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10ed784d9dc24e939a4dee04b30b7f71~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=491&h=344&s=66552&e=png&b=fefdfd)

##### 4.RL型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/656a5353e82a4b5897b21d6b8891e9d9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=711&h=319&s=84166&e=png&b=fefdfd)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01441832a45240ee922acaeea84e20db~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=618&h=309&s=62909&e=png&b=fefdfd)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/402631e2d04d41898614aa597defe72f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=516&h=282&s=55879&e=png&b=fefdfd)

调整颜色后：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ed47e1fd9c948a78ee3cf2f60cd4cb8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=511&h=303&s=58557&e=png&b=fefdfd)

**验证红黑树代码：**
```javascript
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
```
**插入节点代码：**
```javascript
insert(key) {
  if (this.root == null) {  // 树为空
    this.root = new RedBlackNode(key)  // 创建一个红黑树节点
    this.root.color = 'BLACK'  // 根节点设为黑色
  } else {
    const newNode = this.insertNode(this.root, key)
    this.fixTreeProperties(newNode)  // 修复红黑树属性
  }
}
```