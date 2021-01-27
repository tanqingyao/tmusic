export const setTransfrom = (el, positionX = 0, positionY = 0) => {
  // 设置el移动位置
  if (!el || !el.style) {
    return;
  }
  el.style.transform = `translate(${positionX}px, ${positionY}px)`;
};
const setTransition = (el, duration) => {
  // 设置el滚动动画
  if (!el || !el.style) {
    return;
  }
  el.style.transition = `transform ${duration}ms`;
};
/* offsetY沿Y轴方向偏移 */
export const scrollToElement = (
  content,
  target,
  duration = 500,
  offsetY = 255
) => {
  if (!target) {
    return;
  }
  setTransition(content, duration);
  setTransfrom(content, undefined, -target.offsetTop + offsetY);
  console.log(-target.offsetTop + offsetY);
};
