import { computed, reactive, Ref, toRefs } from "vue";
import {
  scrollTo,
  setTransfrom,
  setTransition
} from "@/common/utils/scrollElement";
export default function useTouchElement(el: Ref, sliderIndex: Ref) {
  let startX: number = 0;
  //   el已移动距离
  let currentDistance: number = 0;
  //   touch距离
  let dist: number = 0;
  //   子元素个数
  const silderCount = computed(() => el.value.children.length);
  // 单个子元素长度
  const silderWidth = computed(() => el.value.children.item(0).offsetWidth);

  // 可滑动最长距离
  const totalDistance = computed(
    () =>
      el.value.children.length * el.value.children.item(0).offsetWidth -
      el.value.offsetWidth
  );

  let option = reactive({ isTouch: false, canRoll: true });

  const handleTouchStart = (e: TouchEvent) => {
    option.isTouch = true;
    setTimeout(() => {
      if (option.isTouch) {
        option.canRoll = false;
        console.log("长按事件,禁止上下滚动...");
      }
    }, 1000);
    startX = e.touches[0].pageX;
  };
  let touchDistach = 0;
  const handleTouchMove = (e: TouchEvent) => {
    touchDistach = e.touches[0].pageX - startX;
    // 元素移动位置 = 当前距离 + 滑动距离
    dist = currentDistance + touchDistach;

    if (dist < -totalDistance.value) {
      dist = -totalDistance.value;
    } else if (dist > 0) {
      dist = 0;
    } else {
      setTransfrom(el.value, dist);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (dist > -totalDistance.value && dist < 0) {
      adjustPostion(touchDistach);
    }

    option.isTouch = false;
    option.canRoll = true;
  };

  // 根据滑动距离调整位置
  const adjustPostion = (distance: number) => {
    const ratio = 0.5;

    // 判断触摸移动后的边界情况
    if (distance === 0) {
      return;
    } else if (distance > 0 && Math.abs(distance) > ratio * silderWidth.value) {
      sliderIndex.value--;
    } else if (distance < 0 && Math.abs(distance) > ratio * silderWidth.value) {
      sliderIndex.value++;
    }

    const sliderDuration = 50;
    scrollTo(el.value, -silderWidth.value * sliderIndex.value, sliderDuration);
    // 记录当前位置
    currentDistance = -silderWidth.value * sliderIndex.value;
    // 异步执行:等上一段动画结束后再执行,
    // 同步执行则会没有动画直接跳转
    // window.setTimeout(() => {
    //     //   最后附加页直接移动到第一页
    //     setTransition(el.value ,0);
    //     if (sliderIndex.value >= silderCount.value) {
    //       sliderIndex.value = 0;
    //       setTransfrom(el.value ,-silderWidth.value * sliderIndex.value);
    //     } else if (sliderIndex.value <= 0) {
    //       //   最前附加页直接移动到第最后一页
    //       sliderIndex.value = silderCount.value;
    //       setTransfrom(el.value ,-silderWidth.value * sliderIndex.value);
    //     }
    //   }, sliderDuration);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    ...toRefs(option)
  };
}
