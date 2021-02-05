<template>
  <audio
    v-if="currentSong"
    ref="audio"
    class="audio-player"
    :src="currentSong.url"
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
<script lang="ts">
import { useStore } from "vuex";
import { MutationType } from "@/store/types";
import { computed, reactive, Ref, ref, watchEffect } from "vue";
export default {
  name: "Audio",
  props: {
    //持续时间（总长度），以秒为单位
    duration: Number
  },
  setup() {
    const $store = useStore();
    const audio: Ref = ref(null);
    const currentSong = computed(() => $store.state.currentSong);
    const playerState = reactive({
      isPlaying: computed(() => $store.state.isPlaying),
      expectTime: computed(() => $store.state.expectTime)
    });
    /* 监听控制器 */
    watchEffect(() => {
      const state = playerState.isPlaying;
      console.log(state);

      if (audio.value) {
        if (state) {
          audio.value.play();
        } else {
          audio.value.pause();
        }
      } else {
        // 自动播放失败
        // $store.commit(MutationType.SET_PLAYING, false);
      }
    });
    watchEffect(() => {
      const time = playerState.expectTime;
      if (time) {
        audio.value.currentTime = time;
        $store.commit(MutationType.SET_PLAYING, true);
      }
    });
    // 若自动播放,播放第一首歌
    // watchEffect(()=>{
    //   currentSong
    // if (state.autoPlay) {
    //   commit(MutationType.SET_PLAYING, true);
    // }
    // })

    const setStorePlaying = (state: boolean) => {
      $store.commit(MutationType.SET_PLAYING, state);
    };

    /* audio 回调相关 */
    /*  
    getStartPostiong() {
      //方法能够用于确定媒体时间轴的开始位置。
      return audio.value.getStartDate();
    },
    */
    /* audio eventListener */
    const endListener = () => {
      console.log("end paly");
      setStorePlaying(false);
    };
    const loadedmetadataListener = () => {
      // console.log("loadedmetadata");
      if ($store.state.autoPlay) {
        setStorePlaying(false);
      }
    };
    const abortListener = () => {
      //在播放被终止时触发,例如, 当播放中的视频重新开始播放时会触发这个事件
      console.log("abort");
      setStorePlaying(false);
    };
    const timeupdateListener = () => {
      //元素的currentTime属性表示的时间已经改变。
      $store.commit(MutationType.SET_CURRENT_TIME, audio.value.currentTime);
    };
    const durationchangeListener = () => {
      //元信息已载入或已改变，表明媒体的长度发生了改变
      let payload = audio.value.duration;
      if (payload !== 0) {
        $store.commit(MutationType.SET_DURATION, payload);
      } else {
        console.warn("获取歌曲长度失败，值为", payload);
      }
    };
    const playListener = () => {
      // console.log("play after pause");
      // emit(true);
    };
    const playingListener = () => {
      // console.log("play whatever reason");
      // emit(true);
    };
    const pauseListener = () => {
      // console.log("pause");
      // emit(false);
    };
    const loadListener = () => {
      // console.log("load");
    };
    const emptiedListener = () => {
      //媒体被清空（初始化）时触发。
      // console.log("emptied");
    };
    const errorListener = () => {
      //在发生错误时触发
      // console.log(audio.value.error);
    };
    const loadstart = () => {
      //在媒体开始加载时触发。
      // console.log("loadstart");
    };
    return {
      currentSong,
      audio,
      endListener,
      loadedmetadataListener,
      abortListener,
      timeupdateListener,
      durationchangeListener
    };
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
