export class Node {
  constructor(element) {
    this.element = element  //链表元素的值
    this.next = undefined   //指向链表中下一个元素的指针
  }
}

export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;   // 指向链表中上一个元素的指针
  }
}