<template>
  <NavBar class="nav-bar">
    <template #left>
      <icon
        @click="$router.back"
        class="icon"
        :icon="['fas', 'chevron-left']"
        :style="{ color: '#000' }"
      />
    </template>
    <template #center>
      <div class="title">歌单广场</div>
    </template>
  </NavBar>

  <TabControl
    ref="tabcontrol"
    :titles="[
      '推荐',
      '官方',
      '视频歌单',
      '精品',
      '欧美',
      '电子',
      '摇滚',
      '流行',
      '轻音乐'
    ]"
    @tab-click="handleTabClick"
    @touchstart="useTouchStart"
    @touchmove="useTouchMove"
    @touchend="useTouchEnd"
  />
  <PlaygroundSwiper />
  <PlaygroundPages :songlists="storeData.recommend" />
</template>
<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import PlaygroundSwiper from "./PlaygroundSwiper.vue";
import PlaygroundPages from "./PlaygroundPages.vue";

import { getSonglistRecommed } from "@/network/songlist";

import { defineComponent, reactive, Ref, ref } from "vue";
import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "SonglistPlayground",
  components: {
    NavBar,
    TabControl,
    PlaygroundSwiper,
    PlaygroundPages
  },
  props: {},
  setup() {
    /* tabcontrol滑动 */
    const tabcontrol: Ref = ref(null);
    const { useTouchStart, useTouchMove, useTouchEnd } = useTouchElement(
      tabcontrol
    );
    /* 数据获取 */
    let storeData: { recommend: SonglistCover[] } = reactive({
      recommend: []
    });
    // const fetchSearchData = async <T>(
    //   keyword: string,
    //   config: StoreConfig<T>
    // ) => {
    //   const res: Array<T> = await getSonglistRecommed(
    //     30,
    //   );

    //   config.list.push(...res);
    //   config.page += 1;
    // };
    const handleTabClick = async () => {
      console.log("handleTabClick");
      const res = await getSonglistRecommed(30);
      storeData.recommend.push(...res);
      console.log(res);
    };
    return {
      storeData,
      tabcontrol,
      handleTabClick,
      useTouchStart,
      useTouchMove,
      useTouchEnd
    };
  }
});
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-background);
}
.icon {
  vertical-align: middle;
  width: 50px;
  height: 22px;
}
.title {
  line-height: 44px;
  font-size: 18px;
  text-align: left;
  color: var(--color-high-text);
}
</style>
