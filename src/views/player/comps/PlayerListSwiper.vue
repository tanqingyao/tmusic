<template>
  <div class="play-list-bg">
    <div class="dots">
      <slot name="indicator">
        <div
          v-for="(item, index) in lists"
          class="dot"
          :class="{ active: index === sliderIndex }"
        ></div>
      </slot>
    </div>
    <div ref="swiper" class="swiper">
      <div
        class="slider"
        v-for="item in lists"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <PlayerList />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import PlayerList from "./PlayerList.vue";
import PlayerListItem from "@/components/content/customList/PlayerListItem.vue";

// import {
//   PlayerListItem
// } from "@/components/content/customList";
import { defineComponent, Ref, ref } from "vue";

import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "PlayerListSwiper",
  components: {
    PlayerList,
    PlayerListItem
  },
  setup() {
    const lists = ref(["list1", "list2", "list3"]);
    let swiper: Ref = ref(null);
    let sliderIndex: Ref = ref(0);

    /* touch事件 */
    const { useTouchStart, useTouchMove, useTouchEnd } = useTouchElement(
      swiper
    );

    const handleTouchStart = useTouchStart;
    const handleTouchMove = useTouchMove;
    const handleTouchEnd = useTouchEnd;
    return {
      swiper,
      sliderIndex,
      lists,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    };
  }
});
</script>
<style scoped>
/* player-list-bg */
.play-list-bg {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

/* swiper */
.swiper {
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: flex-end;
}
.slider {
  flex-shrink: 0;

  height: 70vh;
  width: 100vw;
  padding: 20px;
}

/* indicator */
.dots {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 70vh;
}
.dot {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: var(--color-text-l);
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.dot.active {
  width: 20px;
  background-color: var(--color-text-ll);
}
</style>
