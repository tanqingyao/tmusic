<template>
  <div class="progress-bar">
    <input
      type="range"
      ref="progress"
      :class="{ active: isTouch }"
      min="0"
      :max="duration"
      step="0.05"
      @touchstart="touchStart"
      @touchend="touchEnd"
    />
    <div class="progerss-time">
      <span class="left">{{ parseTime(currentTime) }}</span>
      <span class="right">{{ parseTime(duration) }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { MutationType } from "@/store/types";
import {
  computed,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  watchEffect,
  WatchStopHandle
} from "vue";

import { parseTime } from "@/common/utils/show";
export default {
  name: "PlayerProgress",
  setup() {
    const $store = useStore();

    const duration = computed(() => $store.state.duration);

    const currentTime = computed(() => $store.state.currentTime);

    // 改变样式
    let isTouch = ref(false);
    const progress: Ref = ref(null);
    let unwatch: WatchStopHandle;

    const progressWatcher = () => {
      return watchEffect(() => {
        progress.value.value = currentTime.value;
      });
    };

    const touchStart = () => {
      unwatch();
      isTouch.value = true;
    };

    const touchEnd = (e: TouchEvent) => {
      if (e.target) {
        // 跳转至对应时间
        $store.commit(
          MutationType.SET_PLAY_TIME,
          Number.parseFloat((e.target as HTMLTextAreaElement).value)
        );
      }
      unwatch = progressWatcher();
      isTouch.value = false;
    };
    onMounted(() => {
      unwatch = progressWatcher();
    });
    onUnmounted(() => {
      unwatch();
    });
    return {
      duration,
      currentTime,
      isTouch,
      progress,
      parseTime,
      touchStart,
      touchEnd
    };
  }
};
</script>
<style scoped>
.progress-bar {
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 60px;
  height: 40px;
  color: var(--color-background);
}
.progerss-time {
  height: 20px;
  line-height: 20px;
  padding: 0 35px;
}
/*横条样式*/
input[type="range"] {
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 80%;
  background: #ddd;
  height: 3px;
  /* border-radius: 80%; */
  outline: none;
}
/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 10px;
  width: 10px;
  background: #ddd;
  border-radius: 50%;
  border: solid 1px #eee;
}
input[type="range"].active::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
}
</style>
