<template>
  <div class="full-screen">
    <div class="player-bg" :style="styleObject"></div>
    <div class="player-view">
      <PlayerNavBar @change-screen="changeScreen" />
      <PlayerContent />
      <PlayerProgress />
      <PlayerTabBar
        v-model:playOrder="playOrder"
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
    switch: null,
    "update:playOrder": null,
    "update:isLike": null
  },
  props: {
    playOrder: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObject: null
    };
  },
  computed: {
    ...mapState(["currentSong"])
  },
  watch: {
    playOrder: function(val, oldVal) {
      this.$emit("update:playOrder", val);
    },
    isLike: function(val, oldVal) {
      this.$emit("update:isLike", val);
    },
    currentSong(newVal, oldVal) {
      this.styleObject = {
        "background-image": "url(" + newVal.albumImg + ")"
      };
    }
  },
  methods: {
    changeScreen() {
      this.$emit("change-screen");
    },
    likeClick(e) {
      console.log(this.currentSong);
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
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  filter: blur(90px);
}
</style>
