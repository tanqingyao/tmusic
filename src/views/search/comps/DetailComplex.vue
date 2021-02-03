<template>
  <Scroll ref="scroll" class="scroll-wrapper">
    <div class="complex-body">
      <div v-for="(item, key, index) in complex" class="complex-content">
        <ListCard>
          <template #header>
            <span class="left">{{ titles[index] }}</span>
            <button
              class="right list-item-btn"
              @click="handlePlayAll"
              v-if="key === '单曲'"
            >
              <icon :icon="['fas', 'play']" size="sm" />
              播放
            </button>
          </template>

          <template #content>
            <MusicList
              :data="item"
              :showTab="option.showTab"
              :showIndex="option.showIndex"
              :listType="key"
              coverType="round"
            />
          </template>

          <template #footer>
            <span>{{ moreText[index] }}</span>

            <icon
              class="down-icon"
              :icon="['fas', 'chevron-right']"
              size="sm"
            />
          </template>
        </ListCard>
      </div>
      <div class="complex-content">
        <ListCard>
          <template #header>
            <span class="left">相关搜索</span>
          </template>
          <template #content>
            <div class="simi-query">
              <div class="simi-item" v-for="item in simiQuery">
                {{ item.keyword }}
              </div>
            </div>
          </template>
        </ListCard>
      </div>
    </div>
  </Scroll>
</template>
<script lang="ts">
import { ListSetting } from "@/common/constant";
import {
  ListCard,
  ListItem,
  ListItemCenter,
  MusicList
} from "@/components/content/customList";
import Scroll from "@/components/common/scroll/Scroll.vue";

import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useRoute } from "vue-router";

import { getSearchComplex } from "@/network/search";
export default defineComponent({
  name: "DetailComplex",
  components: {
    ListCard,
    ListItem,
    ListItemCenter,
    MusicList,
    Scroll
  },
  props: {},
  setup() {
    const $route = useRoute();

    const scroll: Ref = ref(null);

    // 选择展示列表类型
    let option = reactive({
      showTab: false,
      showIndex: false
    });

    // 展示数据
    let titles: Ref = ref([]);
    let simiQuery = ref([]);
    let moreText = ref([]);
    let complex = reactive({
      [ListSetting.SONGS]: [],
      [ListSetting.PLAYLISTS]: [],
      [ListSetting.ARTISTS]: [],
      [ListSetting.ALBUMS]: [],
      [ListSetting.USERS]: []
    });

    // 操作回调
    const handleClickItem = (item: any) => {
      console.log(item);
    };
    const handleVideo = (item: any) => {
      console.log(item);
    };
    const handleSetting = (item: any) => {
      console.log(item);
    };
    const handleAddUser = (item: any) => {
      console.log(item);
    };

    onMounted(async () => {
      // 刷新可滚动高度
      setTimeout(() => {
        scroll.value.refresh();
      }, 500);

      // 获取展示数据
      const key = $route.params.key;
      const res = await getSearchComplex(key as string);

      titles.value.push(
        ListSetting.SONGS,
        ListSetting.PLAYLISTS,
        ListSetting.ARTISTS,
        ListSetting.ALBUMS,
        ListSetting.USERS
      );

      simiQuery.value = res.simiQuery;

      moreText.value = res.moreTextArr;

      complex[ListSetting.SONGS] = res.items[ListSetting.SONGS];
      complex[ListSetting.PLAYLISTS] = res.items[ListSetting.PLAYLISTS];
      complex[ListSetting.ARTISTS] = res.items[ListSetting.ARTISTS];
      complex[ListSetting.ALBUMS] = res.items[ListSetting.ALBUMS];
      complex[ListSetting.USERS] = res.items[ListSetting.USERS];
    });
    return {
      scroll,
      titles,
      simiQuery,
      moreText,
      complex,
      option,

      handleClickItem,
      handleVideo,
      handleSetting,
      handleAddUser
    };
  }
});
</script>
<style scoped>
.scroll-wrapper {
  height: calc(100vh - 44px - 40px - 60px);
  width: 100vw;
  overflow: hidden;
}
.complex-body {
  padding: 20px;
  border-radius: 5%;
}
.complex-body .complex-content {
  padding: 10px 0;
  margin: 10px 0;
  border-radius: 5%;
  background-color: var(--color-highlight-background);
}
.list-item-btn {
  font-size: 13px;
  line-height: 22px;
  height: 22px;
  width: 60px;

  border-radius: 10px;
  border: solid 1px #bbb;
  background-color: var(--color-background);
  outline: none;
}
.playlist-cover {
  width: 100%;
  border-radius: 5px;
}
.artist-cover,
.users-cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.simi-item {
  /* flex: 1 0; */
  display: inline-block;
  color: var(--color-high-text);
  background-color: var(--color-background-shadow);
  border-radius: 20px;
  margin: 5px;
  padding: 5px 10px;
}
</style>
