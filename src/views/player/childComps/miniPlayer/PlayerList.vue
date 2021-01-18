<template>
  <div class="play-list" @click="closeClick">
    <Scroll ref="scroll" class="wrapper" @click.stop>
      <MusicListItem
        class="list-item"
        v-for="item in playList"
        :key="item.id"
        @click.native="songClick(item)"
      >
        <template #title>
          <span>{{ item.name }}</span>
        </template>

        <template #desc>
          {{ item.singer }}
        </template>
      </MusicListItem>
    </Scroll>
    <div class="list-close">关闭</div>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import MusicListItem from "components/content/musicList/MusicListItem";
import { SET_CURRENT_SONG } from "store/mutations-types";
import { mapMutations } from "vuex";
export default {
  name: "PlayerList",
  components: {
    MusicListItem,
    Scroll
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      setCurrentSong: SET_CURRENT_SONG
    }),
    closeClick() {
      this.$emit("update:isShow", false);
    },
    songClick(item) {
      // 在播放列表中选歌,直接自动播放
      this.setCurrentSong(item);
    }
  }
};
</script>
<style scoped>
.play-list {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 15px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
}
.wrapper {
  /* height: calc(100% - 44px - 60px); */

  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;
  overflow: hidden;
  background-color: var(--color-highlight-background);
}
.list-item {
  height: 55px;
  width: 80%;
  margin: 0 auto;
}
.list-close {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 9;
  text-align: center;
  line-height: 50px;
  background: #222;
  font-size: 16px;
  color: hsla(0, 0%, 100%, 0.5);
}
</style>
