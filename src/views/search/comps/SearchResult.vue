<template>
  <TabControl
    :titles="['综合', '单曲', '歌单', '歌手', '专辑', '用户']"
    @tab-click="handleTabClick"
  />

  <keep-alive>
    <DetailComplex
      v-if="showComplex"
      :titles="['单曲', '歌单', '歌手', '专辑', '用户']"
    />
    <DetailPages
      v-else
      :displayData="storeData[currentType]"
      :key="currentType"
      :requestData="handleLoadMore"
    />
  </keep-alive>
</template>
<script lang="ts">
import TabControl from "@/components/content/tabControl/TabControl.vue";
import DetailPages from "./DetailPages.vue";
import DetailComplex from "./DetailComplex.vue";

import { defineComponent, onMounted, reactive, Ref, ref, toRefs } from "vue";
import { useRoute } from "vue-router";

import { getSearchCloud } from "@/network/search";
import { SearchType } from "@/common/constant";
/* 数据接口 */
export interface StoreConfig<T> {
  type: SearchType;
  page: number;
  list: Array<T>;
}

export type complex = SongInfo | Songlist | IArtist | Album | IUser;

export interface IStoreData {
  [key: number]: StoreConfig<complex>;
}

export default defineComponent({
  name: "SearchResult",
  components: {
    TabControl,
    DetailPages,
    DetailComplex
  },
  setup() {
    /* 数据展示相关 */
    const currentType: Ref<SearchType> = ref(1);
    // 用于存储获取的数据
    let storeData: IStoreData = reactive({
      [SearchType.SONGS]: {
        type: SearchType.SONGS,
        page: 0,
        list: []
      },
      [SearchType.PLAYLISTS]: {
        type: SearchType.PLAYLISTS,
        page: 0,
        list: []
      },
      [SearchType.ARTISTS]: {
        type: SearchType.ARTISTS,
        page: 0,
        list: []
      },
      [SearchType.ALBUMS]: {
        type: SearchType.ALBUMS,
        page: 0,
        list: []
      },
      [SearchType.USERS]: {
        type: SearchType.USERS,
        page: 0,
        list: []
      }
    });

    const fetchSearchData = async <T>(
      keyword: string,
      config: StoreConfig<T>
    ) => {
      const res: Array<T> = await getSearchCloud(
        keyword,
        config.page,
        30,
        config.type
      );

      config.list.push(...res);
      config.page += 1;
    };

    // 加载更多
    const handleLoadMore = async () => {
      await fetchSearchData(KEYWORDS, storeData[currentType.value]);
    };

    /* 路由相关 */
    const $route = useRoute();
    const KEYWORDS = $route.params.key as string;
    const showComplex = ref(true);
    const scroll: Ref = ref(null);

    const handleTabClick = async (index: number) => {
      switch (index) {
        case 1:
          currentType.value = SearchType.SONGS;
          break;

        case 2:
          currentType.value = SearchType.PLAYLISTS;
          break;

        case 3:
          currentType.value = SearchType.ARTISTS;
          break;

        case 4:
          currentType.value = SearchType.ALBUMS;
          break;

        case 5:
          currentType.value = SearchType.USERS;
          break;

        default:
          break;
      }
      // 控制显示主页面
      showComplex.value = index === 0;
      // 初次点击加载数据
      if (storeData[currentType.value].page === 0) {
        await fetchSearchData(KEYWORDS, storeData[currentType.value]);
      }
    };
    onMounted(() => {
      // 刷新可滚动高度
      // setTimeout(() => {
      //   scroll.value.refresh();
      // }, 500);
    });
    return {
      scroll,
      storeData,
      currentType,
      showComplex,
      handleTabClick,
      handleLoadMore
    };
  }
});
</script>
<style scoped>
.scroll-content {
  height: calc(100vh - 44px - 40px - 60px);
  width: 100vw;
  overflow: hidden;
}
</style>
