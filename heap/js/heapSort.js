import { defaultCompare } from '../../tree/models/compare.js'
function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}

function heapify(array, index, heapSize, compareFn) {
  let largest = index;
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;
  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}
export default function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);  // 创建一个最大堆用作源数据
  while (heapSize > 1) {
    swap(array, 0, --heapSize); // 将第一个位置的最大值替换为堆最后一个值，堆大小减一
    heapify(array, 0, heapSize, compareFn);  // 堆的根节点下移
  }
  return array;
}