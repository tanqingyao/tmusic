/* 防抖函数,调用非常频繁的时候,在延迟时间内的下一次执行会被取消 */
export function debounce(func, delay = 50) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
