---
theme: juejin
highlight: a11y-dark
---
### 一、图的概念
图是一组由边连接的节点（或顶点）。如下图

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bb4ef33f2cf42af862bd94e644c34b4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=404&h=285&s=29083&e=png&b=fefefe)

由一条边连接在一起的顶点称为**相邻顶点**。如 A 和 B 是相邻的。

一个顶点的**度**是其相邻顶点的数量。比如，A 和其他三个顶点相连接，因此 A 的度为 3。

**路径**是顶点 v1, v2, …, vk的一个连续序列，其中 vi和 vi+1是相邻的。以上一示意图中的图为例，其中包含路径 A B E I 和 A C D G。

**简单路径**要求不包含重复的顶点。如A D G 是一条简单路径。**环**也是一个简单路径，如 A D C A（最后一个顶点重新回到 A）。

如果图中不存在环，则称该图是**无环的**。如果图中每两个顶点间都存在路径，则该图是**连通的**。

### 二、有向图和无向图
图可以是无向的（边没有方向）或是有向的（有向图）。如下图所示，有向图的边有一个方向。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db0cd9fadfc24d45bd9044f89c52f282~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=358&h=252&s=18975&e=png&b=fefefe)

如果图中每两个顶点间在双向上都存在路径，则该图是**强连通的**。例如，C 和 D 是强连通的，而 A 和 B 不是强连通的。

图还可以是**未加权的**（目前为止我们看到的图都是未加权的）或是**加权的**。如下图所示，加权图的边被赋予了权值。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1251e094b1bc4043a951ab37d36f2b69~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=369&h=254&s=20347&e=png&b=fefefe)

### 三、图的表示
##### 1. 邻接矩阵
每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示顶点之间的连接。如果索引为 i 的节点和索引为 j 的节点相邻，则array[i][j] === 1，否则 array[i][j] === 0，如下图所示。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a51b4eaacf08452caea4478062506f65~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=564&h=263&s=56333&e=png&b=fcfcfc)

不是强连通的图（**稀疏图**）如果用邻接矩阵来表示，则矩阵中将会有很多 0，这意味着我们浪费了计算机存储空间来表示根本不存在的边。但是要找出顶点 v 和 w 是否相邻，使用邻接矩阵会比较快。

##### 2. 邻接表
邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。我们可以用列表（数组）、链表，甚至是散列表或是字典来表示相邻顶点列表。如下图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09c5a1121995493193e476dafbbac50a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=466&h=261&s=39078&e=png&b=fdfdfd)

##### 3. 关联矩阵
在关联矩阵中，矩阵的行表示顶点，列表示边。如下图所示，使用二维数组来表示两者之间的连通性，如果顶点 v 是边 e 的入射点，则 array[v][e] === 1；否则，array[v][e] === 0。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1bff40dbd994f409bad2321ee18937e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=687&h=305&s=66594&e=png&b=fdfdfd)

关联矩阵通常用于边的数量比顶点多的情况，以节省空间和内存。

### 四、创建 Graph 类
##### 1. 定义基本骨架
```javascript
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected  // 接收图是否有向，默认为无向图
    this.vertices = []  // 存储图中的所有顶点名字
    this.adjList = new Dictionary()  // 使用字典存储邻接表，使用顶点名字作为键，邻接顶点列表作为值
  }
}
```
##### 2. 添加顶点
```javascript
addVertex(v) {
  if (!this.vertices.includes(v)) {  // 不存在图中加入
    this.vertices.push(v)  // 加入顶点列表
    this.adjList.set(v, [])  // 设置顶点 v 作为键对应的字典值为一个空数组
  }
}
```
##### 3. 添加边
```javascript
//  v , w 为两个要建立连接的顶点
addEdge(v, w) {
  if (!this.adjList.get(v)) {
    // 如果顶点 v 不存在,添加它
    this.addVertex(v)
  }
  if (!this.adjList.get(w)) {
    // 如果顶点 w 不存在,添加它
    this.addVertex(w)
  }
  this.adjList.get(v).push(w) // 将w加入v的邻接列表
  if (!this.isDirected) {
    this.adjList.get(w).push(v) // 如果是无向图，将v加入w的邻接列表
  }
}
```
##### 4. 返回顶点列表和邻接表
```javascript
// 返回顶点列表
getVertices() {
  return this.vertices;
}

// 返回邻接表
getAdjList() {
  return this.adjList;
}
```
##### 5. toString方法
```javascript
toString() {
  let s = ''
  // 迭代数组列表，将顶点加入字符串
  for (let i = 0; i < this.vertices.length; i++) {
    s += `${this.vertices[i]} ->`
    // 获取该顶点的邻接表
    const neighbors = this.adjList.get(this.vertices[i])
    // 相邻顶点加入我们的字符串
    for (let j = 0; j < neighbors.length; j++) {
      s += ` ${neighbors[j]}`
    }
    s += '\n'
  }
  return s
}
```
### 五、图的遍历
有两种算法对图进行遍历：**广度优先搜索**（breadth-first search，BFS）和**深度优先搜索**（depth-first search，DFS）。

**图遍历算法**的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

**深度优先搜索**使用数据结构为**栈**结构，将顶点存入栈，顶点是沿着路径被探索的，存在新的相邻顶点就去访问。

**广度优先搜索**使用数据结构为**队列**，将顶点存入队列，最先入队列的顶点先被探索。

当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
- 白色：表示该顶点还没有被访问。
- 灰色：表示该顶点被访问过，但并未被探索过。
- 黑色：表示该顶点被访问过且被完全探索过。

两种搜索方法都需要初始化颜色，代码如下：
```javascript
// 定义颜色枚举
const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}

// 初始化每个顶点的颜色
const initializeColor = vertices => {
  const color = {}
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}
```
### 六、广度优先搜索
广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的邻点（相邻顶点），就像一次访问图的一层。换句话说，就是先宽后深地访问顶点，如下图所示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00147ddae6234d26b92b1b8115f3b6ba~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=433&h=287&s=25869&e=png&b=fefefe)

以下是从顶点 v 开始的广度优先搜索算法所遵循的步骤。

(1) 创建一个队列 Q。

(2) 标注 v 为被发现的（灰色），并将 v 入队列 Q。

(3) 如果 Q 非空，则运行以下步骤：

&nbsp;&nbsp;&nbsp;&nbsp;(a) 将 u 从 Q 中出队列；

&nbsp;&nbsp;&nbsp;&nbsp;(b) 标注 u 为被发现的（灰色）；

&nbsp;&nbsp;&nbsp;&nbsp;(c) 将 u 所有未被访问过的邻点（白色）入队列；

&nbsp;&nbsp;&nbsp;&nbsp;(d) 标注 u 为已被探索的（黑色）。
```javascript
export const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)  // 初始化每个顶点的颜色
  const queue = new Queue()  // 使用队列 存储待访问和待探索的顶点

  queue.enqueue(startVertex) // 将起始顶点加入队列

  while (!queue.isEmpty()) {
    const u = queue.dequeue()  // 队列非空，从队列移出一个顶点
    const neighbors = adjList.get(u) // 获取这个顶点的邻接点
    color[u] = Colors.GREY  // 将这个顶点设置为灰色,表示正在探索
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]  // 取出邻接点
      if (color[w] === Colors.WHITE) { // 如果邻接点是白色，表示未访问过
        color[w] = Colors.GREY // 将其设置为灰色，表示已经发现
        queue.enqueue(w) // 加入队列
      }
    }
    // 探索该顶点和其相邻顶点后,将其设置为黑色,表示已完成探索
    color[u] = Colors.BLACK
    // 如果传入了回调函数
    if (callback) {
      callback(u)
    }
  }
}
```
##### 1. 使用 BFS 寻找最短路径
给定一个图 G 和源顶点 v，找出每个顶点 u 和 v 之间最短路径的距离（以边的数量计）。

对于给定顶点 v，广度优先算法会访问所有与其距离为 1 的顶点，接着是距离为 2 的顶点，以此类推。所以，可以用广度优先算法来解这个问题。修改 breadthFirstSearch 方法返回以下信息：
- 从 v 到 u 的距离 distances[u]
- 前溯点 predecessors[u]，用来推导出从 v 到其他每个顶点 u 的最短路径。

改进后的代码为：
```javascript
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)
  const queue = new Queue()

  const distances = {}  // 表示距离
  const predecessors = {}  //  表示前溯点

  queue.enqueue(startVertex)

  // 对每个顶点初始化
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()
    const neighbors = adjList.get(u)
    color[u] = Colors.GREY
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        distances[w] = distances[u] + 1  // 发现顶点 u 的邻点 w 时,  v 和 w 之间的距离加一
        predecessors[w] = u  // u 是 w 的前溯点
        queue.enqueue(w)
      }
    }
    color[u] = Colors.BLACK
  }
  return {
    distances,
    predecessors
  }
}
```

测试代码及结果：
```javascript
const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

const shortestPathA = BFS(graph, myVertices[0]); 
console.log(shortestPathA);
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d89d288273d840bfa35a86f043efffd2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=521&h=439&s=15457&e=png&b=181818)

通过前溯点数组，可以用下面代码来构建从顶点 A 到其他顶点的路径。
```javascript
const fromVertex = myVertices[0]; // 源顶点 
for (let i = 1; i < myVertices.length; i++) { // 其他顶点
  const toVertex = myVertices[i]  // 获取顶点的值
  const path = new Stack() // 用栈来存储路径值

  // 追溯toVertex到fromVertex的路径，变量v被赋值为其前溯点的值，这样能够反向追溯这条路径
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v) // 入栈
  }
  path.push(fromVertex)  // 最后加入源顶点
  let s = path.pop()  // 弹出源顶点 
  while (!path.isEmpty()) {  // 判空 
    s += ' - ' + path.pop()  // 出栈
  }
  console.log(s)
}
```
结果为

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d11501c64a2418f84de3a3ec89a1db1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=153&h=159&s=2298&e=png&b=181818)

### 七、深度优先搜索
深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。如下图所示。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bea94a201f7d4d129db5dfaad3eafd71~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=377&h=249&s=26189&e=png&b=fefefe)

深度优先搜索算法不需要一个源顶点。在深度优先搜索算法中，若图中顶点 v 未访问，则访问该顶点 v。

要访问顶点 v，步骤如下：
1. 标注 v 为被发现的（灰色）
2. 对于 v 的所有未访问（白色）的邻点 w，访问顶点 w
3. 标注 v 为已被探索的（黑色）

深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用。
```javascript
const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      // 顶点未被访问过,调用递归传入访问的顶点 u、颜色数组以及回调函数
      depthFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY  // 访问时置灰

  // 如果有回调函数，执行
  if (callback) {
    callback(u);
  }

  const neighbors = adjList.get(u)  // 邻点的列表

  // 顶点u的每个未被访问过的邻点 w,将递归调用函数,传递 w 和其他参数,添加顶点 w 入栈
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback)
    }
  }

  color[u] = Colors.BLACK // 访问完成置黑
}
```
下图为执行过程：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/931ccdaabdd547029c9322b49e7f7016~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=948&h=747&s=274719&e=png&b=fafafa)

##### 1. 深度优先搜索遍历例子
使用深度优先搜索算法遍历图 G 的所有节点，构建“森林”（有根树的一个集合）以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。修改 depthFirstSearch 部分信息：
- 顶点 u 的发现时间 d[u]
- 当顶点 u 被标注为黑色时，u 的完成探索时间 f[u]
- 顶点 u 的前溯点 p[u]
```javascript
// 修改DFS算法
export const DFS = graph => {
  const vertices = graph.getVertices()
  const adjList = graph.getAdjList()
  const color = initializeColor(vertices)

  const d = {};
  const f = {};
  const p = {};

  const time = { count: 0 } // 追踪发现时间和完成探索时间

  // 对每个顶点初始化
  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY
  d[u] = ++time.count // 顶点第一次被发现时，追踪其发现时间

  const neighbors = adjList.get(u)

  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i]
    if (color[w] === Colors.WHITE) {
      p[w] = u;  // 当由引自顶点 u 的边而被发现的，追踪其前溯点
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }
  color[u] = Colors.BLACK
  f[u] = ++time.count // 顶点完成探索时,追踪其完成时间
}
```

