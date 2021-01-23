<template>
  <div class="player-content" @click="switchContent">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <keep-alive>
        <ContentCover v-if="isCover" />
        <ContentLyric
          v-else
          @scrolling="isScrolling = $event"
          @scrollTime="scrollTime = $event"
        />
      </keep-alive>
    </transition>
  </div>
  <div class="scroll-line" v-show="isScrolling && !isCover">
    <div class="line-left" @click="jumpLyric">
      <img src="~assets/img/player/play_icon.svg" alt="播放" />
    </div>
    <div class="line-center"></div>
    <div class="line-right">
      {{ showTime }}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { SET_PLAY_TIME } from "store/mutations-types";
import ContentCover from "./childComps/ContentCover";
import ContentLyric from "./childComps/ContentLyric";
import { parseTime } from "common/utils";
export default {
  name: "PlayerContent",
  components: {
    ContentCover,
    ContentLyric
  },
  data() {
    return {
      isCover: true,
      isScrolling: false,
      scrollTime: 0
    };
  },
  computed: {
    showTime() {
      return parseTime(this.scrollTime);
    }
  },
  methods: {
    switchContent() {
      this.isCover = !this.isCover;
      if (this.isCover) {
        // TODO 去除播放器虚化背景
      }
    },
    jumpLyric() {
      console.log("跳转至选择歌词");
      this.$store.commit(SET_PLAY_TIME, Number.parseFloat(this.scrollTime));
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

.scroll-line {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--scroll-line-top);
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
