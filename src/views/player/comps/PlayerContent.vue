<template>
  <div class="player-content" @click="handleSwitch">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <keep-alive>
        <div class="content-cover" v-if="isCover">
          <img
            v-if="currentSong.album"
            :src="currentSong.album.url"
            alt="歌曲封面"
          />
        </div>
        <ContentLyric
          v-else
          @touching="isTouch = $event"
          @scrollTime="scrollTime = $event"
        />
      </keep-alive>
    </transition>
  </div>
  <div class="scroll-line" v-show="isTouch && !isCover">
    <div class="line-left" @click="handleJump">
      <icon :icon="['fas', 'play']" size="sm" />
    </div>
    <div class="line-center"></div>
    <div class="line-right">
      {{ parseTime(scrollTime) }}
    </div>
  </div>
</template>
<script lang="ts">
import ContentLyric from "./ContentLyric.vue";
import { parseTime } from "@/common/utils/show";

import { MutationType } from "@/store/types";

import { useStore } from "vuex";
import { computed, Ref, ref } from "vue";
export default {
  name: "PlayerContent",
  components: {
    ContentLyric
  },
  setup() {
    const $store = useStore();
    const currentTime = computed(() => $store.state.currentTime);
    const currentSong = computed(() => $store.state.currentSong);

    const isCover = ref(true);
    const isTouch = ref(false);
    const scrollTime: Ref = ref(0);

    const handleJump = () => {
      $store.commit(
        MutationType.SET_PLAY_TIME,
        Number.parseFloat(scrollTime.value)
      );
    };
    const handleSwitch = () => {
      isCover.value = !isCover.value;
      if (isCover.value) {
        // TODO 去除播放器虚化背景
      }
    };
    return {
      currentSong,
      isCover,
      isTouch,
      scrollTime,
      handleSwitch,
      handleJump,
      parseTime
    };
  }
};
</script>
<style scoped>
.player-content {
  position: relative;
  height: calc(100% - 55px - 40px - 60px);
  /* 居中对齐 */
  text-align: center;
}
/* 封面相关 */
.content-cover {
  height: 100%;
}
.content-cover img {
  width: 250px;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -125px;
}
/* 滚动条相关 */
.scroll-line {
  position: fixed;
  left: 0;
  right: 0;
  /* navbar高度+占位高度-自身高度/2 */
  top: calc(55px + 255px - 12px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.line-left,
.line-right {
  width: 10%;
}
.line-left img {
  width: 40%;
  margin-left: 15px;
  margin-top: 5px;
}
.line-center {
  height: 1px;
  width: 70%;
  background-color: var(--color-text-l);
}
</style>
