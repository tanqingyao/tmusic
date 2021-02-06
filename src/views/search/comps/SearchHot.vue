<template>
  <div class="hot-view">
    <div class="list-header">
      <span class="left">热搜榜</span>

      <button class="right" @click="handlePlayAll">
        <icon :icon="['fas', 'play']" size="sm" />
        播放
      </button>
    </div>
    <div class="list-content">
      <transition-group class="hot-list" name="list" tag="div">
        <SearchHotItem
          class="list-item"
          v-for="(item, index) in hots"
          :key="item"
          @click="handleSearch(item.key)"
          v-show="index < 10 || showAll"
        >
          <template #left>
            {{ index + 1 }}
          </template>

          <template #center>
            <span>{{ item.key }}</span>
          </template>
          <template #right>
            <img
              class="hot-icon"
              v-if="item.iconL"
              :src="item.iconL"
              alt="icon"
            />
          </template>
        </SearchHotItem>
      </transition-group>
    </div>
    <div class="list-footer" @click="showAll = true" v-if="!showAll">
      展开更多热搜
      <icon
        @click="$emit('change-screen')"
        class="down-icon"
        :icon="['fas', 'angle-down']"
        size="lg"
      />
    </div>
  </div>
</template>
<script lang="ts">
import SearchHotItem from "@/components/content/descItem/SearchHotItem.vue";
import { ListItem } from "@/components/content/customList";

import { defineComponent, onMounted, Ref, ref } from "vue";
import { ActionTypes } from "@/store/types";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { getSearchSongInfo } from "@/network/search";
import { getSearchHot } from "@/network/search";
export default defineComponent({
  name: "SearchHot",
  components: {
    SearchHotItem,
    ListItem
  },
  setup(props) {
    let hots: Ref = ref([]);

    let showAll: Ref = ref(false);
    const $store = useStore();
    const handlePlayAll = async () => {
      if (hots.value) {
        let songsInfo: SongInfo[];

        const promises = hots.value.map(async (item: { key: string }) => {
          const songInfo = await getSearchSongInfo(item.key);
          return songInfo;
        });

        songsInfo = await Promise.all(promises);

        $store.dispatch(ActionTypes.AddSongsToPlayList, songsInfo);
      }
    };

    const $router = useRouter();
    const handleSearch = (key: string) => {
      $router.push("/search/detail/" + key);
    };

    onMounted(async () => {
      hots.value = await getSearchHot();
    });
    return {
      handlePlayAll,
      handleSearch,
      showAll,

      hots
    };
  }
});
</script>
<style scoped>
.hot-list {
  display: flex;
  flex-wrap: wrap;
  /* 定位相关 */
  position: relative;
  /* height: 60%; */
  width: 100%;
}
/* header */
.list-header {
  line-height: 22px;
  height: 22px;
  text-align: center;
  margin: 15px;
  font-weight: 700;
}
.list-header button {
  font-size: 13px;
  line-height: 22px;
  height: 22px;
  width: 60px;

  border-radius: 10px;
  border: solid 1px #bbb;
  background-color: var(--color-background);
  outline: none;
}
/* content */
.hot-icon {
  height: 15px;
  vertical-align: middle;
}
.hot-list {
  padding: 10px 5px;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
.hot-list .list-item:nth-child(-n + 3) {
  color: #f00;
}
.hot-list .list-item:nth-child(-n + 3) span {
  color: var(--color-high-text);
  font-weight: 700;
}
/* footer */
.list-footer {
  text-align: center;
  font-size: 13px;
}
/* vue-transition */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
