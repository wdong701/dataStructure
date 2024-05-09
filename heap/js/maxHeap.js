import { Compare, defaultCompare, reverseCompare } from '../../tree/models/compare.js'
import MinHeap from './minHeap.js';

export class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.compareFn = reverseCompare(compareFn);
  }
}