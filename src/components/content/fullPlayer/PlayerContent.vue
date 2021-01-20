<template>
  <div class="player-content">
    <img :src="currentSong.albumImg" alt="歌曲封面" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "PlayerContent",
  props: {
    isPlay: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    ...mapState(["currentSong"])
  }
};
</script>
<style scoped>
.player-content {
  position: relative;
  height: calc(100% - 55px - 40px - 60px);
  /* 居中对齐 */
  text-align: center;
  background-color: var(--color-highlight-background);
}
.player-content img {
  width: 250px;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -125px;
}
</style>
