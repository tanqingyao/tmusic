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
  emits: {
    "update:isPlay": null
  },
  props: {
    src: String,
    isPlay: Boolean
  },
  computed: {
    ...mapState(["autoPlay"]),
    duration() {
      return this.$refs.audio.duration;
    }
  },
  methods: {
    setPlayState(isPlayState) {
      console.log(isPlayState);
      if (isPlayState) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    emit(state) {
      this.$emit("update:isPlay", state);
    },
    /* audio eventListener */
    playListener(e) {
      console.log("play after pause");
      this.emit(true);
    },
    playingListener() {
      console.log("play whatever reason");
      this.emit(true);
    },
    pauseListener(e) {
      console.log("pause");
      this.emit(false);
    },
    endListener() {
      console.log("end paly");
      this.emit(false);
    },
    loadedmetadataListener(e) {
      if (this.autoPlay) {
        this.$refs.audio.play();
      }
    },
    loadListener() {
      console.log("load");
    },
    abortListener() {
      console.log("abort");
      this.emit(false);
    },
    timeupdateListener(e) {
      // console.log(Math.floor(e.timeStamp / 1000));
      console.log(this.$refs.audio.duration);
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
