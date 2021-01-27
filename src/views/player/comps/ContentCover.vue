<template>
  <div class="content-cover">
    <img v-if="currentSong.album" :src="currentSong.album.url" alt="歌曲封面" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ContentCover",
  computed: {
    ...mapState(["currentSong"])
  }
};
</script>
<style scoped>
.player-content img {
  width: 250px;
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -125px;
}
.content-cover {
  height: 100%;
}
</style>
