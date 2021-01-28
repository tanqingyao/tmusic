<template>
  <TabBar class="full-tab-bar">
    <TabBarItem class="order" @click="orderClick">
      <template #itemIcon>
        <icon v-show="playOrder === 0" :icon="['fas', 'random']" size="lg" />
        <icon v-show="playOrder === 1" :icon="['fas', 'list-ol']" size="lg" />
        <icon v-show="playOrder === 2" :icon="['fas', 'undo-alt']" size="lg" />
      </template>
    </TabBarItem>
    <TabBarItem class="back" @click="$emit('switch', 'last')">
      <template #itemIcon>
        <icon :icon="['fas', 'step-backward']" size="lg" />
      </template>
    </TabBarItem>
    <TabBarItem class="play" @click="handlePlayClick">
      <template #itemIcon>
        <icon v-show="isPlaying" :icon="['fas', 'pause-circle']" size="lg" />
        <icon v-show="!isPlaying" :icon="['fas', 'play-circle']" size="lg" />
      </template>
    </TabBarItem>
    <TabBarItem class="next" @click="$emit('switch', 'next')">
      <template #itemIcon>
        <icon :icon="['fas', 'step-forward']" size="lg" />
      </template>
    </TabBarItem>
    <TabBarItem class="like" @click="$emit('update:isLike', !isLike)">
      <template #itemIcon>
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
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { mapState } from "vuex";
import { SET_PLAYING } from "store/mutations-types";
import { computed } from "vue";
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
  // setup(){
  //   computed
  //   return {
  //     isPlaying
  //   }
  // },
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
