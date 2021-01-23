<template>
  <Scroll
    ref="scroll"
    class="content-lyric"
    @touchstart="handleTouchStart"
    @touchend="debouncedTouchEnd"
    @scroll="handleScroll"
  >
    <div :style="{ height: VerticalOffset + 'px' }"></div>

    <div
      class="lyric-line"
      v-for="index in lyricsArr.lyric.length"
      :ref="setLyricRefs"
    >
      <div class="lyric-text">
        {{ showLyricText(lyricsArr.lyric[index - 1]) }}
      </div>
      <div class="lyric-text">
        <!-- text -->
      </div>
    </div>
    <div :style="{ height: VerticalOffset + 'px' }"></div>
  </Scroll>
</template>
<script>
import { debounce } from "common/utils";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import Scroll from "components/common/scroll/Scroll";
export default defineComponent({
  name: "ContentLyric",
  components: {
    Scroll
  },
  emits: {
    scrolling: null,
    scrollTime: null
  },
  data() {
    return {
      lyricsArr: {
        lyric: [], //{time: , text: }
        trans: [], //{time: , text: }
        el: []
      },
      //播放歌词位置
      currentLyricRef: undefined,
      oldLyricRef: undefined,
      //滚动歌词位置
      currentScrollRef: undefined,
      oldScrollRef: undefined,
      posYs: [],
      isScrolling: false,
      VerticalOffset: 255 //垂直偏移量
    };
  },
  computed: {
    ...mapState(["currentSong", "currentTime"]),
    lyricTrim() {
      return this.lyricsArr.lyric.filter(el => el.time !== 0);
    },
    lyricLength() {
      return this.lyricsArr.lyric.length;
    },
    lyricTrimLength() {
      return this.lyricTrim.length;
    }
  },
  created() {
    // 歌词滚动监听
    this.unwatchLyric = this.lyricWatcher();
    this.unwatchJump = this.jumpWatcher();

    this.parseLyrics(this.currentSong.lyrics);

    // 防抖监听touchend
    this.debouncedTouchEnd = debounce(() => {
      this._jumpToCurrent();
      this.unwatchJump = this.jumpWatcher();
      this.$emit("scrolling", false);
    }, 5000);
  },
  activated() {
    console.log(this.lyricsArr);
    this.lyricsArr.el.forEach(el => console.log(el.offsetHeight));
    // 每次进入刷新滚动高度
    this.$refs.scroll.refresh();
    // 滚动到当前歌词位置
    this._jumpToCurrent();
  },
  methods: {
    lyricWatcher() {
      return this.$watch("currentTime", (newVal, oldVal) => {
        this.findLyricRef(newVal);
        // 每个索引对应原词和翻译两行
        if (this.oldLyricRef !== this.currentLyricRef) {
          // 改变歌词样式
          if (this.oldLyricRef) {
            this.oldLyricRef.style.color = "";
          }
          this.currentLyricRef.style.color = `#fff`;
        }
      });
    },
    jumpWatcher() {
      return this.$watch("currentTime", (newVal, oldVal) => {
        // 每个索引对应原词和翻译两行
        if (this.oldLyricRef !== this.currentLyricRef) {
          //跳转
          this._jumpToCurrent();
        }
      });
    },
    parseLyrics(lyrics) {
      // 正则匹配解析lyc文本，返回数组：{time,text}
      const regexp = /\[\d{2}:\d{2}.\d{2}\]/g;
      lyrics.lyric.split("\n").forEach(element => {
        // 1.原歌词中提取time, lyric
        const times = element.match(regexp);
        let time = 0;
        if (times) {
          time = this.parseRawTime(times[0]);
        }
        const text = element.replaceAll(regexp, "");

        this.lyricsArr.lyric.push({ time, text });
      });
      // 2.翻译歌词中提取time,trans
      lyrics.trans.split("\n").forEach(element => {
        const times = element.match(regexp);
        let time = 0;
        if (times) {
          time = this.parseRawTime(times[0]);
        }
        const text = element.replaceAll(regexp, "");
        this.lyricsArr.trans.push({ time, text });
      });
    },
    parseRawTime(rawStringTime) {
      const [min, sec] = rawStringTime.substring(1, 9).split(":");
      return Number.parseFloat(min) * 60 + Number.parseFloat(sec);
    },
    showLyricText({ time, text }) {
      if (time && text !== "") {
        return text;
      }
    },
    findLyricRef(currentTime) {
      // 该时间点所处的时间段的index
      const index = this.lyricsArr.lyric.findIndex((el, i, arr) => {
        const cond1 = arr[i + 1] && arr[i + 1].time > currentTime;
        const cond2 = el && el.time < currentTime;
        return i + 1 === arr.length ? cond2 : cond1 && cond2;
      });
      if (index !== -1) {
        this.oldLyricRef = this.currentLyricRef;
        this.currentLyricRef = this.lyricsArr.el[index];
      }
    },
    setLyricRefs(el) {
      this.lyricsArr.el.push(el);
    },
    handleTouchStart() {
      this.$emit("scrolling", true);

      // 长按情况，取消歌词跳动
      if (this.debouncedTouchEnd) {
        this.debouncedTouchEnd.cancel();
      }
      this.unwatchJump();
    },
    handleTouchEnd() {
      // 频繁滑动情况，防抖处理
      this.debouncedTouchEnd();
    },
    handleScroll(pos) {
      //40px一个el
      const counter = Math.floor((Math.abs(pos.y) + 20) / 40);
      if (counter < this.lyricTrimLength) {
        this.$emit("scrollTime", this.lyricTrim[counter].time);
      }
      const index = counter + this.lyricLength - this.lyricTrimLength;

      //滚动时歌词样式
      this.oldScrollRef = this.currentScrollRef;
      this.currentScrollRef = this.lyricsArr.el[index];
      if (this.oldScrollRef) {
        this.oldScrollRef.style.color = "";
      }
      if (this.currentScrollRef) {
        this.currentScrollRef.style.color = "#999";
      }
    },
    _jumpToCurrent() {
      if (this.currentLyricRef) {
        this.$refs.scroll.scrollToElement(
          this.currentLyricRef,
          undefined,
          undefined,
          -this.VerticalOffset
        );
      }
    }
  }
});
</script>
<style scoped>
.content-lyric {
  height: 100%;

  overflow: hidden;
  position: relative;
}
.lyric-line {
  margin-bottom: var(--lyric-margin-bottom);
  color: var(--color-text-d);
}
/* .lyric-placeholder {
  height: var(--vertical-height-offset);
} */
.lyric-text {
  line-height: var(--lyric-line-height);
}
</style>
