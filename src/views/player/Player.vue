<template>
  <div class="player-view">
    <Audio ref="audio" />
    <transition name="fade">
      <FullPlayer
        v-if="isPlayerFull"
        v-model:playOrder="playerControl.playOrder"
        v-model:isLike="playerControl.isLike"
        @change-screen="changeScreen"
        @switch="switchSong"
      />
    </transition>
    <transition name="fade">
      <MiniPlayer v-if="!isPlayerFull" @change-screen="changeScreen" />
    </transition>
  </div>
</template>
<script>
import Audio from "./childComps/Audio";
import FullPlayer from "./childComps/FullPlayer";
import MiniPlayer from "./childComps/MiniPlayer";

import { _getSongById, Song } from "network/song";
import { mapState, mapActions } from "vuex";
import {
  SET_CURRENT_SONG,
  SET_FULL_PLAYER,
  SET_PLAYING
} from "store/mutations-types";
import { provide, computed, getCurrentInstance } from "vue";
export default {
  name: "Player",
  components: {
    Audio,
    FullPlayer,
    MiniPlayer
  },
  data() {
    return {
      playerControl: {
        playOrder: 0,
        isLike: false
      }
    };
  },
  computed: {
    ...mapState(["currentSong", "isPlayerFull"])
  },
  created() {
    // 自动添加歌曲
    let autoAdd = true;
    // let autoAdd = false;
    if (autoAdd && Object.keys(this.currentSong).length === 0) {
      this.initPlayerData({ songmid: "002dK7hR4DlIa3" }).then(song => {
        this.$toast.show("已自动添加歌曲~", 1500);
        this.$store.commit(SET_CURRENT_SONG, song);
      });
    }
  },
  methods: {
    ...mapActions({
      initPlayerData: "addToPlayList",
      switchByOrder: "switchByOrder",
      switchByShuffle: "switchByShuffle"
    }),
    changeScreen() {
      this.$store.commit(SET_FULL_PLAYER, !this.isPlayerFull);
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
