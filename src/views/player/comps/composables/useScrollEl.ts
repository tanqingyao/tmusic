export default function useScrollEl() {
  const setTransfrom = (el: HTMLElement, position: number) => {
    // 设置移动位置
    el.style.transform = `translate(${position}px, 0)`;
  };
  const setTransition = (el: HTMLElement, duration: number = 500) => {
    // 设置移动位置
    el.style.transition = `transform ${duration}ms`;
  };
  const scrollTo = (el: HTMLElement, position: number) => {
    setTransition(el);
    console.log("scrollTo", position);
    setTransfrom(el, position);
  };
  return {
    setTransfrom,
    setTransition,
    scrollTo
  };
}
