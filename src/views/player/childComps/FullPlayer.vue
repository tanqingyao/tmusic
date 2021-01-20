<template>
  <div class="full-screen">
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
</template>
<script>
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
    return {};
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
  height: 100vh;
  color: aliceblue;
  background-color: var(--color-highlight-background);
}
</style>
