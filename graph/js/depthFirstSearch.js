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


const graph = new Graph(true); // 有向图
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F']; 
for (let i = 0; i < myVertices.length; i++) { 
 graph.addVertex(myVertices[i]); 
} 
graph.addEdge('A', 'C'); 
graph.addEdge('A', 'D'); 
graph.addEdge('B', 'D'); 
graph.addEdge('B', 'E'); 
graph.addEdge('C', 'F'); 
graph.addEdge('F', 'E'); 
const result = DFS(graph);
console.log(result);