<template>
  <div class="player-view">
    <!-- <Audio ref="audio" :src="song.url" :isPlay.sync="playerControl.isPlay" /> -->

    <div class="full-screen" v-show="isFull">
      <PlayerNavBar :song="song" @changeScreen="changeScreen" />
      <PlayerContent />
      <FullTabBar
        :song="song"
        v-model:playOrder="playerControl.playOrder"
        v-model:isPlay="playerControl.isPlay"
        v-model:isLike="playerControl.isLike"
        @switch="switchSong"
      />
    </div>
    <div class="mini-screen" v-show="!isFull">
      <MiniTabBar
        :song="song"
        v-model:isPlay="playerControl.isPlay"
        @changeScreen="changeScreen"
        @menuBtnClick="showPlayMenu"
      />
      <PlayerList
        v-show="showPlayList"
        v-model:isShow="showPlayList"
        :playList="playList"
      />
    </div>
  </div>
</template>
<script>
import Audio from "./childComps/Audio";
import PlayerNavBar from "./childComps/playerView/PlayerNavBar";
import PlayerContent from "./childComps/playerView/PlayerContent";
import FullTabBar from "./childComps/playerView/FullTabBar";

import MiniTabBar from "./childComps/miniPlayer/MiniTabBar";
import PlayerList from "./childComps/miniPlayer/PlayerList";

import { _getSongById, Song } from "network/song";
import { mapState, mapMutations, mapActions } from "vuex";
import { SET_CURRENT_SONG } from "store/mutations-types";
export default {
  name: "Player",
  components: {
    Audio,
    PlayerNavBar,
    PlayerContent,
    FullTabBar,
    MiniTabBar,
    PlayerList
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
      progress: 0
    };
  },
  computed: {
    ...mapState(["playList", "currentSong"]),
    song() {
      if (this.currentSong) {
        return this.currentSong;
      } else {
        return {};
      }
    }
  },
  /* 控制器监听相关方法 */
  watch: {
    "playerControl.isPlay": function(val, oldVal) {
      // this.$refs.audio.setPlayState(val);
      console.log(val, oldVal);
    }
  },

  created() {
    // 自动添加歌曲
    if (Object.keys(this.song).length === 0) {
      this.initPlayerData({ songmid: "003JXAaE3lSpoC" }).then(song => {
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
</style>
