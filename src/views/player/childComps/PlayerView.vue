<template>
  <TabBar class="view-tab-bar">
    <TabBarItem icon="order" @click.native="orderClick">
      <img
        v-show="numPlayOrder === 0"
        slot="itemIcon"
        src="~assets/img/player/025_shuffle.svg"
        alt="随机播放"
      />
      <img
        v-show="numPlayOrder === 1"
        slot="itemIcon"
        src="~assets/img/player/006_loop_1.svg"
        alt="顺序播放"
      />
      <img
        v-show="numPlayOrder === 2"
        slot="itemIcon"
        src="~assets/img/player/015_refresh.svg"
        alt="单曲循环"
      />
    </TabBarItem>
    <TabBarItem icon="back" @click.native="lastClick">
      <img src="~assets/img/player/011_back.svg" alt="上一首" slot="itemIcon" />
    </TabBarItem>
    <TabBarItem class="play-item" icon="play" @click.native="playClick">
      <img
        v-show="isPlay"
        src="~assets/img/player/021_pause.svg"
        alt="暂停"
        slot="itemIcon"
      />
      <img
        v-show="!isPlay"
        src="~assets/img/player/013_play.svg"
        alt="播放"
        slot="itemIcon"
      />
    </TabBarItem>
    <TabBarItem icon="next" @click.native="nextClick">
      <img src="~assets/img/player/001_next.svg" alt="下一首" slot="itemIcon" />
    </TabBarItem>
    <TabBarItem icon="like" @click.native="likeClick">
      <img
        :class="{ active: isLikeActive }"
        src="~assets/img/player/014_like.svg"
        alt="喜欢"
        slot="itemIcon"
      />
    </TabBarItem>
  </TabBar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PlayerTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  props: {
    playOrder: {
      type: Number,
      default: 0
    },
    last: {
      type: Boolean,
      default: false
    },
    isPlay: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numPlayOrder: this.playOrder,
      lastState: this.last,
      isPlayActive: this.isPlay,
      nextState: this.next,
      isLikeActive: this.isLike
    };
  },
  methods: {
    orderClick() {
      this.numPlayOrder = (this.numPlayOrder + 1) % 3;
      this.$emit("update:playOrder", this.numPlayOrder);
    },
    lastClick() {
      this.lastState = !this.lastState;
      this.$emit("update:last", this.lastState);
    },
    playClick() {
      this.isPlayActive = !this.isPlayActive;
      this.$emit("update:isPlay", this.isPlayActive);
    },
    nextClick() {
      this.nextState = !this.nextState;
      this.$emit("update:next", this.nextState);
    },
    likeClick() {
      this.isLikeActive = !this.isLikeActive;
      this.$emit("update:isLike", this.isLikeActive);
    }
  }
};
</script>
<style scoped>
.view-tab-bar {
  /* 本身样式 */
  background-color: var(--color-highlight-background);
  height: 60px;
  border-top: 1px solid #000;
  box-shadow: 0px -1px 1px rgba(150, 150, 150, 0.08);
  line-height: 60px;
  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: absolute;
  text-align: center;
}
.play-item img {
  width: 40px;
}
</style>
