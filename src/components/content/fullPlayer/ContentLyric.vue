<template>
  <Scroll
    ref="scroll"
    class="scroll"
    @click.stop
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
import {
  defineComponent,
  ref,
  watch,
  computed,
  onActivated,
  onDeactivated,
  onMounted
} from "vue";
import { useStore } from "vuex";
import Scroll from "components/common/scroll/Scroll";

import lyricScroll from "./composables/lyricScroll";
import lyricParse from "./composables/lyricParse";
import lyricTouch from "./composables/lyricTouch";

import { debounce, cancelRepeated } from "common/utils";
export default defineComponent({
  name: "ContentLyric",
  components: {
    Scroll
  },
  emits: {
    touching: null,
    scrollTime: null,
    switch: null
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
      // scrollY: []
    });
    // 每行歌词滚动高度
    const scrollY = computed(() =>
      lyricsArr.value.el.map(el => el.offsetTop + 0.5 * el.offsetHeight)
    );
    const setLyricRefs = el => {
      lyricsArr.value.el.push(el);
    };
    const { parseLyrics } = lyricParse(lyricsArr);
    /* 滚动监听相关 */
    const scroll = ref(null);
    const verticalOffset = 255;
    const jumper = (
      prevEl = undefined,
      currentEl = undefined,
      time = 1000,
      offsetY = 255,
      log = "watching"
    ) => {
      // 每个索引对应原词和翻译两行
      if (prevEl !== currentEl) {
        // console.log(log);
        const height = currentEl.offsetTop + 0.5 * currentEl.offsetHeight;
        scroll.value.scrollTo(0, -height + offsetY, time);
      }
    };
    const styler = (prevEl, currentEl, color = "#fff") => {
      // 每个索引对应原词和翻译两行
      if (prevEl !== currentEl && prevEl && currentEl) {
        // 改变歌词样式
        if (prevEl.style && currentEl.style) {
          prevEl.style.color = "";
          currentEl.style.color = color;
        }
      }
    };
    const { currentLyricRef, lyricWatcher, jumpWatcher } = lyricScroll(
      currentTime,
      lyricsArr,
      jumper,
      styler
    );
    /* 歌词滑动相关 */
    let isTouching = ref(false);
    let canFire = false;
    let currentTouchRef = ref({});
    let oldTouchRef = ref({});
    const debouncedTouchEnd = debounce(() => {
      unwatchJump = jumpWatcher();
      emit("touching", false);
      isTouching.value = false;
    }, 1000);
    const shortedTouchStart = cancelRepeated(() => {
      // console.log("touch start");
      /* cancel scroll watcher */
      isTouching.value = true;
      emit("touching", true);
      unwatchJump();
      // 长按情况，取消歌词跳动
      if (debouncedTouchEnd) {
        debouncedTouchEnd.cancel();
      }
    });
    const handleTouchStart = e => {
      shortedTouchStart();
      // 模拟点击事件
      canFire = true;
      setTimeout(() => {
        canFire = false;
      }, 100);
    };
    const handleTouchEnd = e => {
      shortedTouchStart();
      //模拟点击
      if (canFire) {
        // console.log("click");
        emit("switch");
      } else {
        // console.log("touch end");
        // 频繁滑动情况，防抖处理
        debouncedTouchEnd();
      }
    };

    const handleTouchMove = pos => {
      // console.log("handleTouchMove");
      // 跳过处理自动滚动
      if (!isTouching.value) {
        return;
      }
      // 已默认偏移255px
      const scrollTop = Math.abs(pos.y) + verticalOffset;
      const index = scrollY.value.findIndex(
        (el, i, arr) =>
          Math.abs(scrollTop - arr[i]) <
          0.5 * lyricsArr.value.el[i].offsetHeight
      );
      if (index !== -1) {
        //滚动时歌词样式
        oldTouchRef.value = currentTouchRef.value;
        currentTouchRef.value = lyricsArr.value.el[index];
        if (currentTouchRef.value !== currentLyricRef.value) {
          console.log(currentTouchRef.value, currentLyricRef.value);
          styler(oldTouchRef.value, currentTouchRef.value, "#999");
        }
        // 时间戳
        emit("scrollTime", lyricsArr.value.lyric[index].time);
      }
    };
    /* 执行与回调相关 */
    // 歌词滚动监听
    let unwatchLyric = () => {};
    let unwatchJump = () => {};
    parseLyrics(currentSong.value.lyrics);
    onMounted(() => {
      unwatchLyric = lyricWatcher();
      unwatchJump = jumpWatcher();
    });
    onActivated(() => {
      // 每次进入刷新滚动高度
      // scroll.value.refresh();
      jumper(undefined, currentLyricRef.value, 0, undefined);
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
