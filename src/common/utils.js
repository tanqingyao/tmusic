/* 防抖函数,调用非常频繁的时候,在延迟时间内的下一次执行会被取消 */
export function debounce(func, delay = 50) {
  let timerId = undefined;
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    timerId = undefined;
  }
  function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  }
  debounced.cancel = cancel;
  return debounced;
}
/* 节流函数,调用非常频繁的时候,指定时间内执行一次 */
export function throttle(func, duration = 50, options) {
  //默认先等待后调用
  let leading = false,
    trailing = true,
    isRun = true;
  if (options && options.constructor === Object) {
    leading = !!options.leading;
    trailing = !!options.trailing;
  }
  return function(...args) {
    // 指定duration期间开一次门
    if (!isRun) {
      return;
    }
    isRun = false;
    // 开门期间，执行一次函数后再通知开门
    if (leading) {
      func.apply(this, args);
    }
    setTimeout(() => {
      if (trailing) {
        func.apply(this, args);
      }
      isRun = true;
    }, duration);
  };
}

export function parseTime(num) {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  sec = ("00" + sec).slice(-2);
  return `${min}:${sec}`;
}
