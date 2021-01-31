export const setTransfrom = (el: HTMLElement, position: number) => {
  // 设置移动位置
  el.style.transform = `translate(${position}px, 0)`;
};
export const setTransition = (el: HTMLElement, duration: number = 100) => {
  // 设置移动位置
  el.style.transition = `transform ${duration}ms`;
};

export const scrollTo = (
  el: HTMLElement,
  position: number,
  duration: number = 100
) => {
  setTransition(el, duration);
  // console.log("scrollTo", position);
  setTransfrom(el, position);
};
