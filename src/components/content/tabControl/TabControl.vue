<template>
  <div class="wrapper">
    <div
      ref="tabcontrol"
      class="tab-control"
      @touchstart="useTouchStart"
      @touchmove="useTouchMove"
      @touchend="useTouchEnd"
    >
      <div
        class="tab-control-item"
        v-for="(item, index) in titles"
        @click="handleClick(index)"
        :class="{ active: index === currentIndex }"
      >
        <span> {{ item }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import useTouchElement from "@/common/hooks/useTouchElement";
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: {
    "tab-click": null
  },
  setup(props, { emit }) {
    let currentIndex = ref(0);
    const handleClick = (index: number) => {
      currentIndex.value = index;
      emit("tab-click", index);
    };

    /* control滑动相关 */
    const tabcontrol: Ref = ref(null);
    const { useTouchStart, useTouchMove, useTouchEnd } = useTouchElement(
      tabcontrol
    );
    return {
      tabcontrol,
      currentIndex,
      handleClick,
      useTouchStart,
      useTouchMove,
      useTouchEnd
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  background-color: var(--color-background);
  text-align: center;
  overflow: hidden;
}
.tab-control {
  display: flex;
  flex-wrap: nowrap;
}

.tab-control-item {
  flex: 1;
  min-width: 70px;
}

.tab-control-item span {
  padding: 0px;
}

.active {
  font-weight: 700;
  color: var(--color-theme-d);
}

/* 活跃状态下的小横条 */
.active span {
  border-bottom: 4px solid var(--color-theme);
}
</style>
