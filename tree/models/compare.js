// 定义常量
export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}
// 比较元素
export function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}