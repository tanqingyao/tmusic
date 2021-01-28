<template>
  <TabBar class="mini-tab-bar">
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
    <TabBarItem class="tab-img" @click.stop @click="handlePlay">
      <template #itemIcon>
        <icon v-show="isPlaying" :icon="['fas', 'pause']" size="lg" />
        <icon v-show="!isPlaying" :icon="['fas', 'play']" size="lg" />
      </template>
    </TabBarItem>
    <TabBarItem class="tab-img" @click.stop @click="$emit('menu-show')">
      <template #itemIcon>
        <icon :icon="['fas', 'bars']" size="lg" />
      </template>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { SET_PLAYING } from "store/mutations-types";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "MiniTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  emits: {
    "menu-show": null
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

    const handlePlay = () => {
      $store.commit(SET_PLAYING, !isPlaying.value);
    };

    return {
      isPlaying,
      currentSong,
      singer,
      handlePlay
    };
  }
};
</script>
<style scoped>
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
</style>
