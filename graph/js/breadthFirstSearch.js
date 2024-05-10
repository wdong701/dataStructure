import Queue from '../../queue/js/queue.js';
import Stack from '../../stack/js/stack.js';
import Graph from './graph.js';
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

// 广度优先搜索算法
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

// 改进BFS
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