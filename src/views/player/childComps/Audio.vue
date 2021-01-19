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
    @durationchange="durationchangeListener"
    @emptied="emptiedListener"
    @error="errorListener"
    @loadstart="loadstartListenner"
  >
    Your browser does not support the <code>audio</code> lement.
  </audio>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Audio",
  emits: {
    "update:isPlay": null,
    "update-currentTime": null,
    "update:duration": payload => {
      if (payload !== 0) {
        return true;
      }
      console.warn("获取歌曲长度失败，值为", payload);
      return false;
    }
  },
  props: {
    src: String,
    isPlay: Boolean,
    //持续时间（总长度），以秒为单位
    duration: Number
  },
  data() {
    return {
      // 枚举属性，让开发者自行思考来示意浏览器使用何种加载方式以达到最好的用户体验。可以是以下属性之一：none,metadata,auto
      preload: "auto",
      //表示是否静音的布尔值。默认值为 false，表示有声音。
      muted: false,
      //以秒为单位的当前音频的播放位置
      currentTime: undefined
    };
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
    setPlayTime(time) {
      this.$refs.audio.currentTime = Number.parseFloat(time);
      console.log("set time to:", this.$refs.audio.currentTime);
      this.$refs.audio.play();
    },
    emit(state) {
      this.$emit("update:isPlay", state);
    },
    getStartPostiong() {
      //方法能够用于确定媒体时间轴的开始位置。
      return this.$refs.audio.getStartDate();
    },
    /* audio eventListener */
    playListener(e) {
      // console.log("play after pause");
      this.emit(true);
    },
    playingListener() {
      // console.log("play whatever reason");
      this.emit(true);
    },
    pauseListener(e) {
      // console.log("pause");
      this.emit(false);
    },
    endListener() {
      console.log("end paly");
      this.emit(false);
    },
    loadedmetadataListener(e) {
      console.log("loadedmetadata");
      if (this.autoPlay) {
        this.$refs.audio.play();
      }
    },
    loadListener() {
      console.log("load");
    },
    abortListener() {
      //在播放被终止时触发,例如, 当播放中的视频重新开始播放时会触发这个事件
      console.log("abort");
      this.emit(false);
    },
    timeupdateListener(e) {
      //元素的currentTime属性表示的时间已经改变。
      this.$emit("update-currentTime", this.$refs.audio.currentTime);
      // console.log(this.expectTime);
      // console.log(Math.floor(e.timeStamp / 1000));
    },
    durationchangeListener() {
      //元信息已载入或已改变，表明媒体的长度发生了改变
      console.log(this.$refs.audio.duration);
      this.$emit("update:duration", this.$refs.audio.duration);
    },
    emptiedListener() {
      //媒体被清空（初始化）时触发。
      console.log("emptied");
    },
    errorListener() {
      //在发生错误时触发
      console.log(this.$refs.audio.error);
    },
    loadstart() {
      //在媒体开始加载时触发。
      console.log("loadstart");
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
