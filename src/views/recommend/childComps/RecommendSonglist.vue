<template>
  <div class="recommend-song-list">
    <div class="list-title">
      <h3 class="left">推荐歌单</h3>
      <button class="right" @click="handleMore">
        更多
        <icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
    <div
      ref="swiper"
      class="swiper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <slot name="cover" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";

import { changeUnit } from "@/common/utils/show";
import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "RecommendSonglist",
  components: {},
  props: {},
  setup() {
    /* 滑动相关 */
    const swiper: Ref = ref(null);
    let sliderCount: Ref = ref(0);
    let sliderIndex: Ref = ref(0);

    // 单个子元素长度

    const { useTouchStart, useTouchMove, useTouchEnd } = useTouchElement(
      swiper
    );

    const handleTouchStart = useTouchStart;
    const handleTouchMove = useTouchMove;
    const handleTouchEnd = (e: TouchEvent) => {
      useTouchEnd(e);
      // console.log(swiper.value);

      // 可移动范围内才进行调整
      // !超过可移动范围给currentDistance赋值
      // if (dist <= -totalDistance.value) {
      //   // dist = -totalDistance.value;
      //   currentDistance = dist;
      //   sliderIndex.value = sliderCount.value;
      // } else if (dist >= 0) {
      //   // dist = 0;
      //   sliderIndex.value = 0;
      //   currentDistance = dist;
      // } else {
      //   adjustPostion(touchDistach);
      // }
    };

    // 根据滑动距离调整位置
    // const adjustPostion = (distance: number) => {
    //   // 判断触摸移动后的边界情况
    //   const calc = Math.abs(distance) / silderWidth.value;
    //   const integer = Math.floor(calc);
    //   const decimal = calc - integer;
    //   const canSilde = integer > 1 || decimal > ratio;
    //   if (distance === 0) {
    //     return;
    //   } else if (distance > 0 && canSilde) {
    //     sliderIndex.value -= integer + 1;
    //   } else if (distance < 0 && canSilde) {
    //     sliderIndex.value += integer + 1;
    //   }
    //   if (sliderIndex.value >= sliderCount.value) {
    //     sliderIndex.value = sliderCount.value;
    //   } else if (sliderIndex.value <= 0) {
    //     sliderIndex.value = 0;
    //   }
    //   const sliderDuration = 50;
    //   // 记录当前位置
    //   currentDistance = -silderWidth.value * sliderIndex.value;
    //   scrollTo(el.value, currentDistance, sliderDuration);
    // };
    /* 点击相关 */
    const handleMore = () => {
      console.log("进入歌单广场");
    };
    onMounted(() => {
      setTimeout(() => {
        sliderCount.value = swiper.value.children.length;
      }, 1000);
    });
    return {
      changeUnit,
      swiper,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,

      handleMore
    };
  }
});
</script>
<style scoped>
.recommend-song-list {
  border-top: 1px solid #ddd;
  margin-top: 10px;
  overflow: hidden;
}
.list-title {
  height: 20px;
  line-height: 20px;
  padding: 0 10px;
  margin-top: 10px;
  font-size: var(--font-size-medium);
  color: var(--color-theme);
}
.list-title button {
  font-size: 14px;
  height: 22px;
  width: 60px;
  border-radius: 10px;
  border: solid 1px #bbb;
  outline: none;
}
.swiper {
  width: 100vw;
  display: flex;
}
</style>
