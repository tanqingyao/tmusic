<template>
  <div class="full-screen">
    <div class="player-bg" :style="styleObject"></div>
    <div class="player-view">
      <PlayerNavBar @change-screen="changeScreen" />
      <PlayerContent />
      <PlayerProgress
        :currentTime="currentTime"
        :duration="duration"
        @set-current-time="$emit('set-current-time', $event)"
      />
      <PlayerTabBar
        v-model:playOrder="playOrder"
        v-model:isPlay="isPlay"
        v-model:isLike="isLike"
        @switch="$emit('switch', $event)"
        @update:isLike="likeClick($event)"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  PlayerNavBar,
  PlayerContent,
  PlayerProgress,
  PlayerTabBar
} from "components/content/fullPlayer";
export default {
  name: "FullPlayer",
  components: {
    PlayerNavBar,
    PlayerContent,
    PlayerProgress,
    PlayerTabBar
  },
  emits: {
    "change-screen": null,
    "set-current-time": null,
    switch: null,
    "update:playOrder": null,
    "update:isPlay": null,
    "update:isLike": null
  },
  props: {
    currentSong: {
      type: Object,
      default: {}
    },
    playOrder: {
      type: Number,
      default: 0
    },
    isPlay: {
      type: Boolean,
      default: false
    },
    isLike: {
      type: Boolean,
      default: false
    },
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      styleObject: null
    };
  },
  watch: {
    playOrder: function(val, oldVal) {
      this.$emit("update:playOrder", val);
    },
    isPlay: function(val, oldVal) {
      this.$emit("update:isPlay", val);
    },

    isLike: function(val, oldVal) {
      this.$emit("update:isLike", val);
    }
  },
  mounted() {
    this.styleObject = {
      "background-image": "url(" + this.currentSong.albumImg + ")"
    };
  },
  methods: {
    changeScreen() {
      this.$emit("change-screen");
    },
    likeClick(e) {
      // console.log(e);
      // console.log("添加歌曲到喜欢列表");
    }
  }
};
</script>
<style scoped>
.full-screen {
  position: relative;
  height: 100vh;
  color: aliceblue;
  background-color: var(--color-highlight-background);
}
.player-view {
  height: 100vh;
}
.player-bg {
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: blur(90px);
  transform: translateY(-40px);
}
</style>
