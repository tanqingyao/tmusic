<template>
  <div class="player-content" @click="switchContent">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <keep-alive>
        <ContentCover v-if="isCover" />
        <ContentLyric v-else @scrolling="isScrolling = $event" />
      </keep-alive>
    </transition>
  </div>
  <div class="scroll-line" v-show="isScrolling">
    <div class="line-left">
      <img src="~assets/img/player/play_icon.svg" alt="播放" />
    </div>
    <div class="line-center"></div>
    <div class="line-right">
      DOM元素对应时间戳
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ContentCover from "./childComps/ContentCover";
import ContentLyric from "./childComps/ContentLyric";
export default {
  name: "PlayerContent",
  components: {
    ContentCover,
    ContentLyric
  },
  data() {
    return {
      isCover: true,
      isScrolling: false
    };
  },
  methods: {
    switchContent() {
      this.isCover = !this.isCover;
      if (this.isCover) {
        // TODO 去除播放器虚化背景
      }
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
  top: 310px;
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
