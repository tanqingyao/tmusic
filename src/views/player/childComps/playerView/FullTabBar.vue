<template>
  <TabBar class="full-tab-bar">
    <TabBarItem class="order" @click="orderClick">
      <template #itemIcon>
        <img
          v-show="playOrder === 0"
          src="~assets/img/player/025_shuffle.svg"
          alt="随机播放"
        />
        <img
          v-show="playOrder === 1"
          src="~assets/img/player/006_loop_1.svg"
          alt="顺序播放"
        />
        <img
          v-show="playOrder === 2"
          src="~assets/img/player/015_refresh.svg"
          alt="单曲循环"
        />
      </template>
    </TabBarItem>
    <TabBarItem class="back" @click="$emit('switch', 'last')">
      <template #itemIcon>
        <img src="~assets/img/player/011_back.svg" alt="上一首" />
      </template>
    </TabBarItem>
    <TabBarItem class="play" @click="$emit('update:isPlay', !isPlay)">
      <template #itemIcon>
        <img
          v-show="isPlay"
          src="~assets/img/player/021_pause.svg"
          alt="暂停"
        />
        <img
          v-show="!isPlay"
          src="~assets/img/player/013_play.svg"
          alt="播放"
        />
      </template>
    </TabBarItem>
    <TabBarItem class="next" @click="$emit('switch', 'next')">
      <template #itemIcon>
        <img src="~assets/img/player/001_next.svg" alt="下一首" />
      </template>
    </TabBarItem>
    <TabBarItem class="like" @click="$emit('update:isLike', !isLike)">
      <template #itemIcon>
        <img
          :class="{ active: isLike }"
          src="~assets/img/player/014_like.svg"
          alt="喜欢"
        />
      </template>
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "FullTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  emits: {
    "update:playOrder": null,
    "update:isPlay": null,
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
    isPlay: {
      type: Boolean,
      default: false
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    orderClick() {
      this.$emit("update:playOrder", (this.playOrder + 1) % 3);
    }
  }
};
</script>
<style scoped>
.full-tab-bar {
  padding: 0 15px;
}
.full-tab-bar img {
  width: 30px;
  vertical-align: middle;
  margin: 3px 0;
  border-radius: 50%;
}
.play img {
  width: 50px;
}
.active {
  background-color: red;
}
</style>
