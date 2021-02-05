<template>
  <Scroll
    ref="scroll"
    class="scroll"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    @scroll="handleTouchMove"
  >
    <div class="content-lyric">
      <div :style="{ height: verticalOffset + 'px' }"></div>

      <div
        class="lyric-line"
        v-for="item in lyricsArr.lyric"
        :ref="setLyricRefs"
      >
        <div class="lyric-text">
          {{ item.lyric }}
        </div>
        <!-- <div class="lyric-text">
        {{ item.trans }}
      </div> -->
      </div>
      <div :style="{ height: verticalOffset + 'px' }"></div>
    </div>
  </Scroll>
</template>
<script lang="ts">
import Scroll from "components/common/scroll/Scroll.vue";

import lyricScroll from "./composables/lyricScroll";
import lyricTouch from "./composables/lyricTouch";

import {
  defineComponent,
  ref,
  computed,
  onActivated,
  onDeactivated,
  watchEffect,
  reactive
} from "vue";
import { useStore } from "vuex";
import { ActionTypes } from "@/store/types";
export default defineComponent({
  name: "ContentLyric",
  components: {
    Scroll
  },
  emits: {
    touching: null,
    scrollTime: null
  },
  setup(props, { emit }) {
    const $store = useStore();

    const currentTime = computed(() => $store.state.currentTime);

    const currentSongID = computed(() => $store.state.currentSong.id);

    /* 歌词监听器 */
    const watchHandler = reactive({
      lyric: {
        unwatcher: () => {},
        watcher: () => {}
      },

      styler: {
        unwatcher: () => {},
        watcher: () => {}
      },

      jumper: {
        unwatcher: () => {},
        watcher: () => {}
      }
    });
    /* 歌词解析 */
    let lyricsArr = ref({
      //{time: , lyric: , trans}
      lyric: computed(() => $store.state.currentSong.lyrics),
      el: [] as HTMLElement[]
    });
    const setLyricRefs = (el: HTMLElement) => {
      lyricsArr.value.el.push(el);
    };

    /* 滚动相关 */
    const verticalOffset = 255;
    const {
      scroll,
      currentLyricRef,
      styleWatcher,
      jumpWatcher,
      jumper,
      styler
    } = lyricScroll(currentTime, lyricsArr);

    /* 歌词滑动相关 */
    const { handleTouchStart, handleTouchEnd, handleTouchMove } = lyricTouch(
      emit,
      jumpWatcher,
      styler,
      lyricsArr,
      verticalOffset
    );

    /* 执行与回调相关 */
    onActivated(() => {
      // 获取当前歌曲的歌词,只监听当前歌曲id是否变化
      watchHandler.lyric.unwatcher = watchEffect(() => {
        const id = currentSongID.value;
        $store.dispatch(ActionTypes.GetCurrentLyric, id);
      });
      // 每次进入刷新滚动高度
      // scroll.value.refresh();
      jumper(currentLyricRef, 0, undefined);
      // 进入时开始监听歌词
      watchHandler.styler.unwatcher = styleWatcher();
      watchHandler.jumper.unwatcher = jumpWatcher();
    });

    onDeactivated(() => {
      // // 离开时取消监听歌词
      watchHandler.styler.unwatcher();
      watchHandler.jumper.unwatcher();
      watchHandler.lyric.unwatcher();
    });
    return {
      scroll,
      lyricsArr,
      // currentSong,
      setLyricRefs,
      verticalOffset,
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove
    };
  }
});
</script>
<style scoped>
.scroll {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.content-lyric {
  display: flex;
  flex-direction: column;
}
.lyric-line {
  display: flex;
  flex-direction: column;

  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  color: var(--color-text-d);
}
.lyric-text {
  flex: 1;
  overflow-wrap: break-word;
  line-height: 20px;
}
</style>
