<template>
  <audio
    ref="audio"
    class="audio-player"
    :src="src"
    @loadedmetadata="loadedmetadataListener"
    @play="playListener"
    @playing="playingListener"
    @pause="pauseListener"
    @ended="endListener"
    @load="loadListener"
    @abort="abortListener"
    @timeupdate="timeupdateListener"
  >
    Your browser does not support the <code>audio</code> lement.
  </audio>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Audio",
  props: {
    src: String,
    isPlay: Boolean
  },
  computed: {
    ...mapState(["autoPlay"])
  },
  methods: {
    setPlayState(isPlayState) {
      if (isPlayState) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    /* audio eventListener */
    playListener(e) {
      console.log("play after pause");
      this.$emit("update:isPlay", true);
    },
    playingListener() {
      console.log("play whatever reason");
      this.$emit("update:isPlay", true);
    },
    pauseListener(e) {
      console.log("pause");
      this.$emit("update:isPlay", false);
    },
    endListener() {
      console.log("end paly");
      this.$emit("update:isPlay", false);
    },
    loadedmetadataListener(e) {
      // console.log("loadedmetadataListener");
      if (this.autoPlay) {
        this.$refs.audio.play();
      }
    },
    loadListener() {
      console.log("load");
    },
    abortListener() {
      // console.log("abort");
      this.$emit("update:isPlay", false);
    },
    timeupdateListener(e) {
      console.log(Math.floor(e.timeStamp / 1000));
      console.log(this.$refs.audio.duration / 60);
    }
  }
};
</script>
<style scoped>
.audio-player {
  width: 0;
  height: 0;
  display: none;
}
</style>
