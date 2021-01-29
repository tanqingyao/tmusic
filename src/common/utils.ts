/* 防抖函数,调用非常频繁的时候,在延迟时间内的下一次执行会被取消 */
export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  delay: number = 50
) {
  let timerId: number | undefined = undefined;
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    timerId = undefined;
  }
  function debounced(this: any, ...args: Params) {
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
export function throttle<Params extends any[]>(
  func: (...args: Params) => any,
  duration = 50,
  options: { leading: boolean; trailing: boolean }
) {
  //默认先等待后调用
  let leading = false,
    trailing = true,
    isRun = true;
  if (options && options.constructor === Object) {
    leading = !!options.leading;
    trailing = !!options.trailing;
  }
  return function(this: any, ...args: Params) {
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
export const cancelRepeated = (
  func: (...params: any[]) => any,
  duration = 100
) => {
  let isRun = true;
  let timerId: number | undefined = undefined;
  return (...args: any[]) => {
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
      func(...args);
    }, duration);
  };
};
