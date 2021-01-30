<template>
  <div class="dark-bg" @click="$emit('update:isShow', false)">
    <Scroll ref="scroll" class="play-list" @click.stop>
      <MusicListItem
        class="list-item"
        v-for="item in playList"
        :key="item.id"
        @click="handlePlay(item)"
      >
        <template #top>
          <span>{{ item.name }}</span>
        </template>
        <template #bottom-left>
          <span> - {{ showSinger(item.singers) }}</span>
        </template>
      </MusicListItem>
    </Scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import MusicListItem from "components/content/musicList/MusicListItem";

import { MutationType } from "@/store/types";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { showSinger } from "common/display";
export default {
  name: "PlayerList",
  components: {
    MusicListItem,
    Scroll
  },
  emits: {
    "update:isShow": null
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const $store = useStore();
    const scroll = ref(null);
    let playList = computed(() => $store.state.playList);

    const handlePlay = item => {
      $store.commit(MutationType.SET_CURRENT_SONG, item);
    };

    onMounted(() => {
      setTimeout(() => {
        scroll.value.refresh();
      }, 100);
    });
    return {
      scroll,
      playList,
      showSinger,
      handlePlay
    };
  }
};
</script>
<style scoped>
.dark-bg {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 15px;
  background-color: rgba(0, 0, 0, 0.3);
}
.play-list {
  position: fixed;
  top: 20%;
  left: 5%;
  right: 5%;
  bottom: 5%;
  width: 90%;
  z-index: 9;
  overflow: hidden;
  background-color: var(--color-background);
  border-radius: 5%;
}
.list-item {
  height: 60px;
  line-height: 60px;
  width: 80%;
  margin: 0 auto;
}
.v-enter-active {
  transition: all 0.3s ease-in-out;
}

.v-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  /* transform: translateY(20px); */

  opacity: 0;
}
</style>
