<template>
  <TabBar class="mini-tab-bar" @click="$emit('changeScreen')">
    <TabBarItem class="tab-cover">
      <template #itemIcon>
        <img
          v-if="currentSong.album"
          :src="currentSong.album.url"
          alt="歌曲封面"
        />
      </template>
    </TabBarItem>
    <TabBarItem class="tab-text">
      <template #itemIcon>
        <span class="name"> {{ currentSong.name }}</span>
        <span class="padding"> - </span>
        <span class="singer">{{ singer }}</span>
      </template>
    </TabBarItem>
    <TabBarItem class="tab-img" @click.stop @click="handlePlayClick">
      <template #itemIcon>
        <img
          v-show="isPlaying"
          src="~assets/img/player/mini_pause.svg"
          alt="暂停"
        />
        <img
          v-show="!isPlaying"
          src="~assets/img/player/mini_play.svg"
          alt="播放"
        />
      </template>
    </TabBarItem>
    <TabBarItem class="tab-img" @click.stop @click="$emit('menuBtnClick')">
      <template #itemIcon>
        <img src="~assets/img/player/mini_list.svg" alt="歌曲列表" />
      </template>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { SET_PLAYING } from "store/mutations-types";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  name: "MiniTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  emits: {
    changeScreen: null,
    menuBtnClick: null
  },
  props: {},
  setup() {
    const $store = useStore();

    const isPlaying = computed(() => $store.state.isPlaying);
    const currentSong = computed(() => $store.state.currentSong);
    const singer = computed(() => {
      if (currentSong.value) {
        currentSong.value.singers
          ? Array.from(currentSong.value.singers, ({ id, name }) => name).join(
              "/"
            )
          : "";
      }
    });
    const handlePlayClick = () => {
      console.log("handlePlayClick");
      $store.dispatch("setPlaying", !isPlaying.value);
    };
    onMounted(() => {
      console.log(isPlaying.value, currentSong.value);
    });
    return {
      isPlaying,
      currentSong,
      singer,
      handlePlayClick
    };
  }
};
</script>
<style scoped>
.mini-tab-bar {
  background-color: var(--color-background);
}
.mini-tab-bar img {
  width: 20px;
  vertical-align: middle;
  margin: 3px 0;
}
.tab-cover img {
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
</style>
