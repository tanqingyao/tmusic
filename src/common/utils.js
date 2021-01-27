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
/* 指定时间内再次执行会被取消 */
export const cancelRepeated = (func, duration = 100) => {
  let isRun = true;
  let timerId = undefined;
  return (...args) => {
    if (!isRun) {
      //再次执行，取消后再判断
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      timerId = undefined;
      isRun = true;
      return;
    }
    // 只执行一次
    isRun = false;
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, duration);
  };
};
/* 转化数字为时间字符串 */
export function parseTime(num) {
  let min = Math.floor(num / 60);
  let sec = Math.floor(num - min * 60);
  sec = ("00" + sec).slice(-2);
  return `${min}:${sec}`;
}
/* 转化数字单位 */
export const changeUnit = (value, base = 10000, point = 0) => {
  if (!value) {
    return;
  }
  /* 通过判断转化两次单位 */
  let unit = "";
  if (value > base) {
    value = value / base;
    unit = "万";
  }
  if (value > base) {
    value = value / base;
    unit = "亿";
  }
  return value.toFixed(point).toString() + unit;
};
