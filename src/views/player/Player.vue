<template>
  <div class="player-view">
    <Audio ref="audio" />
    <transition name="fade">
      <div class="full-screen" v-if="isFull">
        <div class="player-bg" :style="styleObject"></div>
        <div class="player-content">
          <PlayerNavBar @change-screen="isFull = !isFull" />
          <PlayerContent />
          <PlayerProgress />
          <PlayerTabBar
            v-model:playOrder="playerControl.playOrder"
            v-model:isLike="playerControl.isLike"
            @switch="handleSwitchSong"
            @update:isLike="handleLike($event)"
          />
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!isFull">
        <MiniTabBar @click="isFull = !isFull" @menu-show="isShow = true" />

        <transition name="fade">
          <PlayerList v-show="isShow" v-model:isShow="isShow" />
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  PlayerNavBar,
  PlayerContent,
  PlayerProgress,
  PlayerTabBar
} from "./comps/index";
import Audio from "./comps/Audio";
import MiniTabBar from "./comps/MiniTabBar";
import PlayerList from "./comps/PlayerList";

import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";
export default {
  name: "Player",
  components: {
    Audio,
    MiniTabBar,
    PlayerList,

    PlayerNavBar,
    PlayerContent,
    PlayerProgress,
    PlayerTabBar
  },
  setup() {
    const $store = useStore();

    const currentSong = computed(() => $store.state.currentSong);

    let styleObject = ref(null);

    let isFull = ref(false);

    const isShow = ref(false);

    let playerControl = ref({
      playOrder: 0,
      isLike: false
    });

    const handleLike = e => {
      // console.log("添加歌曲到喜欢列表");
    };
    const handleSwitchSong = mode => {
      // paylaod 为last或next
      if (playerControl.value.playOrder === 0) {
        $store.dispatch("switchByShuffle");
      } else {
        $store.dispatch("switchByShuffle", mode);
      }
    };
    onMounted(() => {
      /* 自动添加歌曲 */
      let autoAdd = true;
      // let autoAdd = false;
      if (autoAdd && Object.keys(currentSong.value).length === 0) {
        $store.dispatch("addPlayList", ["33894312"]);
        // .then(song => {
        //   this.$toast.show("已自动添加歌曲~", 1500);
        //   this.$store.commit(SET_CURRENT_SONG, song);
        // });
      }
      /* 背景虚化 */
      const stop = watch(
        currentSong.value,
        (newVal, oldVal) => {
          styleObject.value = {
            "background-image": "url(" + newVal.albumImg + ")"
          };
        },
        {
          immediate: true
        }
      );
    });
    return {
      isShow,
      isFull,
      styleObject,
      playerControl,
      handleSwitchSong,
      handleLike
    };
  }
};
</script>
<style scoped>
.player-view {
  z-index: 99;
  position: fixed;
  top: 0;
}

.full-screen {
  position: relative;
  height: 100vh;
  color: aliceblue;
  background-color: var(--color-highlight-background);
}
.player-content {
  height: 100vh;
}
.player-bg {
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  filter: blur(90px);
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
