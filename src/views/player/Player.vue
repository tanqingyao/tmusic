<template>
  <div class="player-view">
    <Audio ref="audio" />
    <transition name="fade">
      <PlayerList v-show="showList" v-model:isShow="showList" />
    </transition>
    <transition name="fade">
      <div class="full-screen" v-if="isFull">
        <div class="player-bg" :style="styleObject"></div>
        <div class="player-content">
          <PlayerNavBar
            @change-screen="isFull = !isFull"
            :currentSong="currentSong"
          />

          <PlayerContent />

          <PlayerProgress />

          <TabBar class="full-tab-bar">
            <TabBarItem @click="handleOrder">
              <template #item>
                <icon v-show="mode === 0" :icon="['fas', 'random']" size="lg" />
                <icon
                  v-show="mode === 1"
                  :icon="['fas', 'list-ol']"
                  size="lg"
                />
                <icon
                  v-show="mode === 2"
                  :icon="['fas', 'undo-alt']"
                  size="lg"
                />
              </template>
            </TabBarItem>
            <TabBarItem @click="handleSwitchSong('last')">
              <template #item>
                <icon :icon="['fas', 'step-backward']" size="lg" />
              </template>
            </TabBarItem>
            <TabBarItem class="full-play-icon" @click="handlePlay">
              <template #item>
                <icon
                  v-show="isPlaying"
                  :icon="['fas', 'pause-circle']"
                  size="lg"
                />
                <icon
                  v-show="!isPlaying"
                  :icon="['fas', 'play-circle']"
                  size="lg"
                />
              </template>
            </TabBarItem>
            <TabBarItem @click="handleSwitchSong('next')">
              <template #item>
                <icon :icon="['fas', 'step-forward']" size="lg" />
              </template>
            </TabBarItem>
            <TabBarItem @click="handleLike">
              <template #item>
                <icon v-show="!isLike" :icon="['fas', 'heart']" size="lg" />
                <icon
                  v-show="isLike"
                  :style="{ color: '#f00' }"
                  :icon="['fas', 'heart']"
                  size="lg"
                />
              </template>
            </TabBarItem>
          </TabBar>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <TabBar
        class="mini-tab-bar"
        v-if="!isFull && currentSong"
        @click="isFull = !isFull"
      >
        <TabBarItem class="tab-cover">
          <template #item>
            <img
              v-if="currentSong.album"
              :src="currentSong.album.url"
              alt="歌曲封面"
            />
          </template>
        </TabBarItem>
        <TabBarItem class="tab-text">
          <template #item>
            <span class="name"> {{ currentSong.name }}</span>
            <span class="padding"> - </span>
            <span class="singer">{{ showSinger(currentSong.singers) }}</span>
          </template>
        </TabBarItem>
        <TabBarItem class="tab-img" @click.stop @click="handlePlay">
          <template #item>
            <icon v-show="isPlaying" :icon="['fas', 'pause']" size="lg" />
            <icon v-show="!isPlaying" :icon="['fas', 'play']" size="lg" />
          </template>
        </TabBarItem>
        <TabBarItem class="tab-img" @click.stop @click="showList = true">
          <template #item>
            <icon :icon="['fas', 'bars']" size="lg" />
          </template>
        </TabBarItem>
      </TabBar>
    </transition>
  </div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
import Audio from "./comps/Audio";
import PlayerList from "./comps/PlayerList";
import { PlayerNavBar, PlayerContent, PlayerProgress } from "./comps/index";

import { showSinger } from "common/display";
import { MutationType } from "@/store/types";
import { useStore } from "vuex";
import { ref, computed, onMounted, watch, watchEffect } from "vue";
export default {
  name: "Player",
  components: {
    TabBar,
    TabBarItem,
    Audio,
    PlayerList,
    PlayerNavBar,
    PlayerContent,
    PlayerProgress
  },
  setup() {
    const $store = useStore();

    const isPlaying = computed(() => $store.state.isPlaying);

    const currentSong = computed(() => $store.state.currentSong);

    let styleObject = ref(null);

    let isFull = ref(false);

    const showList = ref(false);

    /* tabbar相关 */
    let isLike = ref(false);
    let mode = ref(0);

    const handlePlay = () => {
      $store.commit(MutationType.SET_PLAYING, !isPlaying.value);
    };

    const handleLike = e => {
      isLike.value = !isLike.value;
      // console.log("添加歌曲到喜欢列表");
    };

    const handleSwitchSong = order => {
      // paylaod 为last或next
      if (mode.value === 0) {
        $store.dispatch("switchByShuffle");
      } else {
        $store.dispatch("switchByOrder", order);
      }
    };

    const handleOrder = () => {
      mode.value = (mode.value + 1) % 3;
    };
    onMounted(() => {
      if (currentSong.value) {
        /* 自动添加歌曲 */
        let autoAdd = true;
        console.log("自动添加歌曲", autoAdd);
        // let autoAdd = false;
        if (autoAdd && Object.keys(currentSong.value).length === 0) {
          $store.dispatch("addPlayList", ["33894312"]);
          // .then(song => {
          //   this.$toast.show("已自动添加歌曲~", 1500);
          //   this.$store.commit(SET_CURRENT_SONG, song);
          // });
        }
        /* 背景虚化 */
        const stop = watchEffect(() => {
          styleObject.value = {
            "background-image": "url(" + currentSong.value.albumImg + ")"
          };
        });
      }
    });
    return {
      isPlaying,
      currentSong,
      showList,
      isFull,
      styleObject,

      isLike,
      mode,
      showSinger,
      handlePlay,
      handleOrder,
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
/* 全屏播放器 */
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

.full-tab-bar {
  padding: 0 15px;
}
.full-play-icon svg {
  transform: scale(2, 2);
}
/* mini播放器tabbar */
.mini-tab-bar {
  background-color: var(--color-background);
}
.tab-cover img {
  vertical-align: middle;
  width: 40px;
  border: 1px solid #999;
  border-radius: 50%;
}

.tab-cover,
.tab-img {
  max-width: 60px;
  padding: 0 10px;
}
.tab-text {
  width: 120px;
  height: 60px;
  font-size: 12px;
  text-align: left;
  /* 多余文字省略号 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tab-text span {
  height: 60px;
  line-height: 60px;
}

.tab-text .name {
  font-size: var(--font-size-medium-x);
  color: var(--color-high-text);
}
.tab-text .padding {
  margin: 0 5px;
}
.tab-text .singer {
  color: var(--color-text);
}
/* 过场动画 */
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
