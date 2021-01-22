<template>
  <div class="player-content" @click="switchContent">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <div v-show="isCover" class="content-cover">
        <img :src="currentSong.albumImg" alt="歌曲封面" />
      </div>
    </transition>
    <Scroll ref="scroll" class="content-lyric">
      <div class="lyric-placeholder"></div>
      <div v-show="!isCover">
        <div
          class="lyric-line"
          v-for="index in lyricLength"
          :ref="setLyricRefs"
        >
          <div class="lyric-text">
            {{ showLyricText(lyricArr[index - 1]) }}
          </div>
          <div class="lyric-text">
            <!-- text -->
          </div>
        </div>
      </div>

      <div class="lyric-placeholder"></div>
    </Scroll>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "PlayerContent",
  components: {
    Scroll
  },
  props: {
    isPlay: {
      type: Boolean,
      default() {
        return false;
      }
    },
    currentTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isCover: true,
      lyricLength: 0,
      lyricArr: undefined,
      transArr: undefined,
      lyricRefs: [],
      posYs: [],
      indexState: 0
    };
  },
  computed: {
    ...mapState(["currentSong"]),
    lyric() {
      return this.currentSong.lyric;
    },
    trans() {
      return this.currentSong.trans;
    }
  },
  watch: {
    lyric(newVal, oldVal) {
      this.lyricArr = this.parseLyric(newVal);
      this.lyricLength = this.lyricArr.length;
    },
    trans(newVal, oldVal) {
      this.transArr = this.parseLyric(newVal);
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.unwatch = this.lyricWatcher();
  },
  methods: {
    lyricWatcher() {
      return this.$watch("currentTime", (newVal, oldVal) => {
        this.jumpLyricTo(newVal);
      });
    },
    parseLyric(src) {
      // 解析lyc文本，返回数组：{time,text}
      // 正则匹配歌词timestamp
      const regexp = /\[\d{2}:\d{2}.\d{2}\]/g;
      let res = [];
      src.split("\n").forEach(element => {
        const times = element.match(regexp);
        let time = 0;
        if (times) {
          time = this.parseTimeSting(times[0]);
        }
        const text = element.replaceAll(regexp, "");
        res.push({ time, text });
      });

      return res;
    },
    parseTimeSting(rawStringTime) {
      const [min, sec] = rawStringTime.substring(1, 9).split(":");
      return Number.parseFloat(min) * 60 + Number.parseFloat(sec);
    },
    showLyricText({ time, text }) {
      if (time && text !== "") {
        return text;
      } else {
        return;
      }
    },
    switchContent() {
      this.isCover = !this.isCover;

      this.$nextTick(() => {
        this.lyricRefs.forEach(el => this.posYs.push(el.offsetTop));
      });
    },
    jumpLyricTo(currentTime) {
      // 该时间点所处的时间段，位置应该为index-1
      const index = this.lyricArr.findIndex(
        ({ time, text }) => time && time > currentTime
      );
      // 每个索引对应原词和翻译两行
      if (index && index !== -1 && index !== this.indexState) {
        this.indexState = index;
        console.log(this.$refs.scroll.getScrollY());
        // 每次刷新歌词滚动高度
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollToElement(
          this.lyricRefs[index - 1],
          undefined,
          undefined,
          -256
        );
        if (this.lyricRefs[index - 2]) {
          this.lyricRefs[index - 2].style.color = "";
        }
        this.lyricRefs[index - 1].style.color = `#fff`;
      }
    },
    setLyricRefs(el) {
      this.lyricRefs.push(el);
    }
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
.player-content img {
  width: 250px;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -125px;
}
.content-cover {
  height: 512px;
}
.content-lyric {
  height: 512px;

  overflow: hidden;
  position: relative;
}
.lyric-line {
  line-height: 40px;
  margin: 15px 0;
  color: var(--color-text-d);
}
.lyric-placeholder {
  height: 256px;
}
.lyric-text {
  line-height: 20px;
}
</style>
