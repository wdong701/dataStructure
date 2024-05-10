import Dictionary from '../../dictionary/js/dictionary.js';

export default class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected  // 接收图是否有向，默认为无向图
    this.vertices = []  // 存储图中的所有顶点名字
    this.adjList = new Dictionary()  // 使用字典存储邻接表，使用顶点名字作为键，邻接顶点列表作为值
  }

  // 添加顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {  // 不存在图中加入
      this.vertices.push(v)  // 加入顶点列表
      this.adjList.set(v, [])  // 设置顶点 v 作为键对应的字典值为一个空数组
    }
  }

  // 添加边  v , w 为两个要建立连接的顶点
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

  // 返回顶点列表
  getVertices() {
    return this.vertices;
  }

  // 返回邻接表
  getAdjList() {
    return this.adjList;
  }

  // toString
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
}


// 测试
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
console.log(graph.toString());