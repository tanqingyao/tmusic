<template>
  <div class="recommend-song-list">
    <div class="list-title">
      <h3 class="left">推荐歌单</h3>
      <button class="right" @click="handleMore">
        更多
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
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
<script>
import { defineComponent, ref, computed } from "vue";

import { changeUnit } from "common/display";
export default defineComponent({
  name: "RecommendSonglist",
  components: {},
  props: {},
  setup() {
    /* 滑动相关 */
    let startX = 0;
    let distance = 0;
    let currentPos = 0;
    const swiper = ref(null);
    // 可滑动最长距离
    const totleWidth = computed(() => {
      let totle = 0;
      for (let item of swiper.value.children) {
        totle += item.offsetWidth;
      }
      return totle - swiper.value.offsetWidth;
    });
    const setTransfrom = position => {
      // 设置移动位置
      swiper.value.style.transform = `translate(${position}px, 0)`;
    };
    const handleTouchStart = e => {
      // console.log(distance, currentPos, totleWidth.value);
      startX = e.touches[0].pageX;
    };
    const handleTouchMove = e => {
      // 元素移动位置 = 当前距离 + 滑动距离
      distance = currentPos + (e.touches[0].pageX - startX);
      // distance += e.touches[0].pageX - startX;
      if (distance < -totleWidth.value) {
        distance = -totleWidth.value;
      } else if (distance > 0) {
        distance = 0;
      } else {
        setTransfrom(distance);
      }
    };
    const handleTouchEnd = () => {
      currentPos = distance;
    };

    /* 点击相关 */
    const handleMore = () => {
      console.log("进入歌单广场");
    };

    return {
      changeUnit,
      swiper,
      totleWidth,
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
