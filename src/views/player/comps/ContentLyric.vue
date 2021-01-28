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
          {{ item.text }}
        </div>
        <!-- <div class="lyric-text">
        {{ item.trans }}
      </div> -->
      </div>
      <div :style="{ height: verticalOffset + 'px' }"></div>
    </div>
  </Scroll>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import lyricParse from "./composables/lyricParse";
import lyricScroll from "./composables/lyricScroll";
import lyricTouch from "./composables/lyricTouch";

import {
  defineComponent,
  ref,
  computed,
  onActivated,
  onDeactivated,
  onMounted
} from "vue";
import { useStore } from "vuex";
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

    const currentSong = computed(() => $store.state.currentSong);

    /* 歌词解析 */
    let lyricsArr = ref({
      lyric: [], //{time: , text: }
      trans: [], //{time: , text: }
      el: []
    });
    const setLyricRefs = el => {
      lyricsArr.value.el.push(el);
    };
    const { parseLyrics } = lyricParse(lyricsArr);

    /* 滚动监听相关 */
    const verticalOffset = 255;
    const {
      scroll,
      currentLyricRef,
      lyricWatcher,
      jumpWatcher,
      jumper,
      styler
    } = lyricScroll(currentTime, lyricsArr);
    /* 歌词滑动相关 */

    const {
      unwatchJump,
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove
    } = lyricTouch(emit, jumpWatcher, styler, lyricsArr, verticalOffset);

    /* 执行与回调相关 */
    onMounted(() => {
      parseLyrics(currentSong.value.lyrics);
      const unwatchLyric = lyricWatcher();
      unwatchJump.value = jumpWatcher();
    });

    onActivated(() => {
      // 每次进入刷新滚动高度
      // scroll.value.refresh();
      jumper(currentLyricRef, 0, undefined);
    });

    onDeactivated(() => {});
    return {
      scroll,

      lyricsArr,
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
