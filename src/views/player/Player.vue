<template>
  <!-- <div class="player-view">
    <Audio ref="audio" :src="song.url" :isPlay.sync="playerControl.isPlay" />

    <div class="full-screen" v-show="isFull">
      <PlayerNavBar :song="song" @changeScreen="changeScreen" />

      <span>当前时间:{{ progress }}</span>
      <label for="progressSet">
        <input type="text" v-model="progress" id="progressSet" />
      </label>
      <button >设置时间</button>
      <PlayerView v-bind.sync="playerControl" />
    </div>
    <div class="mini-screen" v-show="!isFull">
      <MiniTabBar
        :song="song"
        v-bind.sync="playerControl"
        @changeScreen="changeScreen"
        @menuBtnClick="showPlayMenu"
      />
      <PlayerList
        v-show="showPlayList"
        v-model="showPlayList"
        :playList="playList"
      />
    </div>
  </div> -->
  <div class="player-view">
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
</template>
<script>
import Audio from "./childComps/Audio";
import PlayerNavBar from "./childComps/PlayerNavBar";
import PlayerView from "./childComps/PlayerView";

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
    PlayerView,
    MiniTabBar,
    PlayerList
  },
  data() {
    return {
      isFull: false,
      showPlayList: false,
      playerControl: {
        playOrder: 0,
        last: false,
        isPlay: false,
        next: false,
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
    "playerControl.last": function(val, oldVal) {
      if (this.playerControl.playOrder === 0) {
        this.switchByShuffle();
      } else {
        this.switchByOrder("last");
      }
    },
    "playerControl.next": function(val, oldVal) {
      if (this.playerControl.playOrder === 0) {
        this.switchByShuffle();
      } else {
        this.switchByOrder("next");
      }
    },
    "playerControl.isPlay": function(val, oldVal) {
      // this.$refs.audio.setPlayState(val);
      console.log(val, oldVal);
    }
  },

  created() {
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
    }
  }
};
</script>
<style scoped>
.player-view {
  background-color: #333;
  /* position: fixed;
  left: 0;
  right: 0;
  bottom: 0; */
  height: 100vh;
}
.audio-player {
  width: 0;
  height: 0;
  display: none;
}
.full-screen {
  height: 100vh;
  background-color: var(--color-background-d);
  z-index: 9;
}
</style>
