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
          @touching="isTouch = $event"
          @scrollTime="scrollTime = $event"
          @switch="switchContent"
        />
      </keep-alive>
    </transition>
  </div>
  <div class="scroll-line" v-show="isTouch && !isCover">
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
import ContentCover from "./ContentCover";
import ContentLyric from "./ContentLyric";
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
      isTouch: false,
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
