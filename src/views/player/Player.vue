<template>
  <div class="player-view">
    <Audio
      ref="audio"
      v-model:isPlay="playerControl.isPlay"
      @update-currentTime="audioInfo.currentTime = $event"
      @update:duration="audioInfo.duration = $event"
    />
    <transition name="fade">
      <div class="full-screen" v-show="isFull">
        <PlayerNavBar @changeScreen="changeScreen" />
        <PlayerContent />
        <PlayerProgress
          :currentTime="audioInfo.currentTime"
          :duration="audioInfo.duration"
          @set-currentTime="setTimeTo($event)"
        />
        <FullTabBar
          v-model:playOrder="playerControl.playOrder"
          v-model:isPlay="playerControl.isPlay"
          v-model:isLike="playerControl.isLike"
          @switch="switchSong"
          @update:isLike="likeClick"
        />
      </div>
    </transition>
    <transition name="fade">
      <div class="mini-screen" v-show="!isFull">
        <MiniTabBar
          v-model:isPlay="playerControl.isPlay"
          @changeScreen="changeScreen"
          @menuBtnClick="showPlayMenu"
        />
        <transition name="fade">
          <PlayerList
            v-show="showPlayList"
            v-model:isShow="showPlayList"
            :playList="playList"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import Audio from "./childComps/Audio";
import PlayerNavBar from "./childComps/playerView/PlayerNavBar";
import PlayerProgress from "./childComps/playerView/PlayerProgress";
import FullTabBar from "./childComps/playerView/FullTabBar";
import PlayerContent from "./childComps/playerView/PlayerContent";

import MiniTabBar from "./childComps/miniPlayer/MiniTabBar";
import PlayerList from "./childComps/miniPlayer/PlayerList";

import { _getSongById, Song } from "network/song";
import { mapState, mapMutations, mapActions } from "vuex";
import { SET_CURRENT_SONG } from "store/mutations-types";
import { computed } from "vue";
export default {
  name: "Player",
  components: {
    Audio,
    PlayerNavBar,
    PlayerContent,
    PlayerProgress,
    FullTabBar,
    MiniTabBar,
    PlayerList
  },
  provide() {
    return {
      song: computed(() => this.currentSong),
      currentTime: computed(() => this.audioInfo.currentTime),
      duration: computed(() => this.audioInfo.duration)
    };
  },
  data() {
    return {
      isFull: false,
      showPlayList: false,
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
    ...mapState(["playList", "currentSong"])
  },
  /* 控制器监听相关 */
  watch: {
    "playerControl.isPlay": function(val, oldVal) {
      this.$refs.audio.setPlayState(val);
    }
  },
  created() {
    // 自动添加歌曲
    if (Object.keys(this.currentSong).length === 0) {
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
    showPlayMenu() {
      this.showPlayList = true;
    },
    switchSong(payload) {
      // paylaod 为last或next
      if (this.playerControl.playOrder === 0) {
        this.switchByShuffle();
      } else {
        this.switchByOrder(payload);
      }
    },
    likeClick() {
      console.log("like", this.playerControl.isLike);
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
.full-screen {
  height: 100vh;
  background-color: var(--color-background);
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
