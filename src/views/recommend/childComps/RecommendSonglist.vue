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
import { defineComponent, ref, Ref } from "vue";

import { changeUnit } from "@/common/utils/show";
import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "RecommendSonglist",
  components: {},
  props: {},
  setup() {
    /* 滑动相关 */
    const swiper: Ref = ref(null);
    let sliderIndex: Ref = ref(0);
    const {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    } = useTouchElement(swiper, sliderIndex);
    /* 点击相关 */
    const handleMore = () => {
      console.log("进入歌单广场");
    };

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
