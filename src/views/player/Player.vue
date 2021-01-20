<template>
  <div class="player-view">
    <Audio
      ref="audio"
      v-model:isPlay="playerControl.isPlay"
      @update-currentTime="audioInfo.currentTime = $event"
      @update:duration="audioInfo.duration = $event"
    />
    <transition name="fade">
      <FullPlayer
        v-show="isFull"
        :currentSong="currentSong"
        :currentTime="audioInfo.currentTime"
        :duration="audioInfo.duration"
        v-model:playOrder="playerControl.playOrder"
        v-model:isPlay="playerControl.isPlay"
        v-model:isLike="playerControl.isLike"
        @change-screen="changeScreen"
        @set-current-time="setTimeTo($event)"
        @switch="switchSong"
      />
    </transition>
    <transition name="fade">
      <MiniPlayer
        v-show="!isFull"
        v-model:isPlay="playerControl.isPlay"
        @change-screen="changeScreen"
      />
    </transition>
  </div>
</template>
<script>
import Audio from "./childComps/Audio";
import FullPlayer from "./childComps/FullPlayer";
import MiniPlayer from "./childComps/MiniPlayer";

import { _getSongById, Song } from "network/song";
import { mapState, mapMutations, mapActions } from "vuex";
import { SET_CURRENT_SONG } from "store/mutations-types";
import { provide, computed, getCurrentInstance } from "vue";
export default {
  name: "Player",
  components: {
    Audio,
    FullPlayer,
    MiniPlayer
  },
  provide() {
    return {
      currentTimeFunc: () => this.audioInfo.currentTime,
      durationFunc: () => this.audioInfo.duration
    };
  },
  data() {
    return {
      isFull: false,
      playerControl: {
        playOrder: 0,
        isPlay: false,
        isLike: false
      },
      audioInfo: {
        currentTime: 0,
        duration: 1,
        expectTime: 0
      }
    };
  },
  computed: {
    ...mapState(["currentSong"])
  },
  /* 控制器监听相关 */
  watch: {
    "playerControl.isPlay": function(val, oldVal) {
      this.$refs.audio.setPlayState(val);
    }
  },
  created() {
    // let autoAdd = true;
    let autoAdd = false;
    // 自动添加歌曲
    if (autoAdd && Object.keys(this.currentSong).length === 0) {
      this.initPlayerData({ songmid: "002dK7hR4DlIa3" }).then(song => {
        this.$toast.show("已自动添加歌曲~", 1500);
        this.setCurrentSong(song);
      });
    }
  },
  methods: {
    ...mapMutations({
      setCurrentSong: SET_CURRENT_SONG
    }),
    ...mapActions({
      initPlayerData: "addToPlayList",
      switchByOrder: "switchByOrder",
      switchByShuffle: "switchByShuffle"
    }),
    setTimeTo(time) {
      this.$refs.audio.setPlayTime(time);
    },
    changeScreen() {
      this.isFull = !this.isFull;
    },
    switchSong(payload) {
      // paylaod 为last或next
      if (this.playerControl.playOrder === 0) {
        this.switchByShuffle();
      } else {
        this.switchByOrder(payload);
      }
    }
  }
};
</script>
<style scoped>
.player-view {
  z-index: 99;
  position: fixed;
  top: 0;
}
.audio-player {
  width: 0;
  height: 0;
  display: none;
}

.fade-enter-active {
  transition: all 0.4s ease-in-out;
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
