<template>
  <div class="play-list" @click.stop>
    <div class="list-title">
      <span class="title-text">当前播放</span>
      <span class="title-count">({{ playListLength }})</span>
    </div>
    <ListTab class="list-tab">
      <template #left>
        <div class="list-tab-left">
          <span class="list-tab-icon">
            <icon :icon="['fas', 'random']" size="lg" />
            随机播放
          </span>
        </div>
      </template>
      <template #right>
        <div class="list-tab-right">
          <span class="list-tab-icon">
            <icon
              size="lg"
              :icon="['fas', 'arrow-alt-circle-down']"
              :style="{ color: '#000' }"
            />
            收藏全部
          </span>

          <icon
            class="list-tab-icon"
            size="lg"
            :icon="['fas', 'trash-alt']"
            :style="{ color: '#000' }"
          />
        </div>
      </template>
    </ListTab>
    <Scroll ref="scroll" class="list-item">
      <PlayerListItem
        v-for="item in playList"
        :key="item.id"
        @click="handlePlay(item)"
      >
        <template #left>
          <div class="item-left">
            <span class="name" :class="{ active: false }">{{ item.name }}</span>
            <span :class="{ active: false }">
              - {{ showSinger(item.singers) }}</span
            >
          </div>
        </template>
        <template #right>
          <div class="item-right">
            <button>
              播放来源
            </button>
            <icon class="icon-close" :icon="['fas', 'times']" size="lg" />
          </div>
        </template>
      </PlayerListItem>
    </Scroll>
  </div>
</template>
<script lang="ts">
import Scroll from "components/common/scroll/Scroll.vue";
import ListTab from "components/content/musicList/ListTab.vue";
import PlayerListItem from "components/content/musicList/PlayerListItem.vue";

import { MutationType } from "@/store/types";
import { useStore } from "vuex";
import { computed, onMounted, Ref, ref, watchEffect } from "vue";
import { showSinger } from "@/common/utils/show";
export default {
  name: "PlayerList",
  components: {
    ListTab,
    PlayerListItem,
    Scroll
  },
  props: {
    canRoll: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const $store = useStore();
    const scroll: Ref = ref(null);
    let playList = computed(() => $store.state.playList);
    let playListLength = computed(() => $store.getters.LIST_LENGTH);

    const handlePlay = (item: ISong) => {
      $store.commit(MutationType.SET_CURRENT_SONG, item);
    };
    const stop = watchEffect(() => {
      if (props.canRoll) {
        if (scroll.value) {
          scroll.value.enable();
        }
      } else {
        if (scroll.value) {
          scroll.value.disable();
        }
      }
    });
    onMounted(() => {
      // 刷新可滚动高度
      setTimeout(() => {
        scroll.value.refresh();
      }, 100);
    });
    return {
      scroll,
      playList,
      playListLength,
      showSinger,
      handlePlay
    };
  }
};
</script>
<style scoped>
/* 列表样式 */
.play-list {
  width: 100%;
  height: 100%;
  padding: 10px 0;

  overflow: hidden;
  background-color: var(--color-background);
  border-radius: 5%;
  z-index: 9;
}

/* list-title */
.list-title {
  line-height: 30px;
  height: 30px;
  margin-left: 15px;
}
.list-title .title-text {
  font-weight: 700;
  color: var(--color-tint);
}

.list-title .title-count {
  font-size: var(--font-size-small);
}

/* list-tab */
.list-tab {
  margin-bottom: 25px;
}
.list-tab-left {
  text-align: left;
  font-size: var(--font-size-medium);
  color: var(--color-tint);
}
.list-tab-right {
  font-size: var(--font-size-medium);
  color: var(--color-tint);
  text-align: right;
}
.list-tab-icon {
  margin: 0 5px;
}

/* list-item */
.list-item {
  overflow: hidden;
  height: 80%;
}
.item-left {
  margin-left: 15px;
  /* 多余文字省略 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--font-size-small);
}
.list-item .name {
  font-size: var(--font-size-medium);
  color: var(--color-high-text);
}
.active {
  color: #f00;
}
.item-right button {
  font-size: var(--font-size-small-s);
  line-height: 22px;
  height: 22px;
  width: 65px;

  border-radius: 10px;
  border: solid 1px #ddd;
  background-color: inherit;
  outline: none;
}
.item-right .icon-close {
  margin: 0 20px;
}
/* transition */
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
