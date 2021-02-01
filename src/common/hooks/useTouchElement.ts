import { computed, reactive, Ref, ref, toRefs } from "vue";
import {
  scrollTo,
  setTransfrom,
  setTransition
} from "@/common/utils/scrollElement";
export default function useTouchElement(el: Ref) {
  let option = reactive({ isTouch: false, canRoll: true });

  let startX: number = 0;
  //   当前el已移动距离
  let currentDistance: Ref = ref(0);
  //   单次touch的距离
  let touchDistach: Ref = ref(0);
  // touch结束后移动的目标位置
  let dist: number = 0;

  // 可滑动最长距离
  const totalDistance = computed(
    () => el.value.scrollWidth - el.value.offsetWidth
  );

  const useTouchStart = (e: TouchEvent) => {
    startX = e.touches[0].pageX;

    // 用于区分长按事件
    option.isTouch = true;
    setTimeout(() => {
      if (option.isTouch) {
        option.canRoll = false;
        console.log("长按事件,禁止上下滚动...");
      }
    }, 1000);
  };

  const useTouchMove = (e: TouchEvent) => {
    touchDistach.value = e.touches[0].pageX - startX;
    // 元素移动位置 = 当前el已移动距离 + 滑动距离
    dist = currentDistance.value + touchDistach.value;

    if (dist < -totalDistance.value) {
      dist = -totalDistance.value;
    } else if (dist > 0) {
      dist = 0;
    } else {
      // 可移动范围内移动
      setTransfrom(el.value, dist);
    }
  };

  const useTouchEnd = (e: TouchEvent) => {
    currentDistance.value = dist;

    option.isTouch = false;
    option.canRoll = true;
  };

  return {
    currentDistance,
    touchDistach,
    useTouchStart,
    useTouchMove,
    useTouchEnd,
    ...toRefs(option)
  };
}
