<template>
  <TabBar class="mini-tab-bar" @click="$emit('changeScreen')">
    <TabBarItem class="tab-cover">
      <template #itemIcon>
        <img :src="currentSong.albumImg" alt="歌曲封面" />
      </template>
    </TabBarItem>
    <TabBarItem class="tab-text">
      <template #itemIcon>
        <span class="name">
          {{ currentSong.name }}
        </span>
        <span class="singer">
          {{ currentSong.singer }}
        </span>
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
import { mapState } from "vuex";
import { SET_PLAYING } from "store/mutations-types";
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
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
  computed: {
    ...mapState(["currentSong", "isPlaying"])
  },
  methods: {
    handlePlayClick() {
      this.$store.commit(SET_PLAYING, !this.isPlaying);
    }
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
  /* 文字采用flex布局 */
  display: flex;
  flex-direction: column;
}
.tab-text span {
  /* 布局 */
  flex: 1;
  text-align: left;
  height: 30px;
  line-height: 30px;

  /* 多余文字省略号 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.name {
  color: var(--color-text);
  padding-top: 9px;
}
.singer {
  color: var(--color-text-d);
  padding-bottom: 9px;
}
</style>
