<template>
  <TabBar class="full-tab-bar">
    <TabBarItem class="order" @click="orderClick">
      <template #itemIcon>
        <img
          v-show="playOrder === 0"
          src="~assets/img/player/shuffle.svg"
          alt="随机播放"
        />
        <img
          v-show="playOrder === 1"
          src="~assets/img/player/loop.svg"
          alt="顺序播放"
        />
        <img
          v-show="playOrder === 2"
          src="~assets/img/player/refresh.svg"
          alt="单曲循环"
        />
      </template>
    </TabBarItem>
    <TabBarItem class="back" @click="$emit('switch', 'last')">
      <template #itemIcon>
        <img src="~assets/img/player/back.svg" alt="上一首" />
      </template>
    </TabBarItem>
    <TabBarItem class="play" @click="handlePlayClick">
      <template #itemIcon>
        <img v-show="isPlaying" src="~assets/img/player/pause.svg" alt="暂停" />
        <img v-show="!isPlaying" src="~assets/img/player/play.svg" alt="播放" />
      </template>
    </TabBarItem>
    <TabBarItem class="next" @click="$emit('switch', 'next')">
      <template #itemIcon>
        <img src="~assets/img/player/next.svg" alt="下一首" />
      </template>
    </TabBarItem>
    <TabBarItem class="like" @click="$emit('update:isLike', !isLike)">
      <template #itemIcon>
        <img v-show="!isLike" src="~assets/img/player/like.svg" alt="不喜欢" />
        <img
          v-show="isLike"
          src="~assets/img/player/like_active.svg"
          alt="喜欢"
        />
      </template>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { mapState, mapMutations } from "vuex";
import { SET_PLAYING } from "store/mutations-types";
export default {
  name: "PlayerTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  emits: {
    "update:playOrder": null,
    "update:isLike": null,
    switch: payload => {
      if (payload === "last" || payload === "next") {
        return true;
      }
      console.warn("切换歌曲失败，传值为", payload);
      return false;
    }
  },
  props: {
    playOrder: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["isPlaying"])
  },
  methods: {
    orderClick() {
      this.$emit("update:playOrder", (this.playOrder + 1) % 3);
    },
    handlePlayClick() {
      this.$store.commit(SET_PLAYING, !this.isPlaying);
    }
  }
};
</script>
<style scoped>
.full-tab-bar {
  padding: 0 15px;
}
.full-tab-bar img {
  width: 40px;
  vertical-align: middle;
  margin: 3px 0;
  border-radius: 50%;
}
</style>
