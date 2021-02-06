<template>
  <BackNavBar title="歌单广场" />
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
import BackNavBar from "@/components/content/customNavBar/BackNavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import PlaygroundSwiper from "./PlaygroundSwiper.vue";
import PlaygroundPages from "./PlaygroundPages.vue";

import { getSonglistRecommed } from "@/network/songlist";

import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import useTouchElement from "@/common/hooks/useTouchElement";
export default defineComponent({
  name: "SonglistPlayground",
  components: {
    BackNavBar,
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
    let storeData: { recommend: Songlist[] } = reactive({
      recommend: []
    });
    const handleTabClick = () => {
      console.log("handleTabClick");
    };
    onMounted(async () => {
      const res = await getSonglistRecommed(200);
      storeData.recommend.push(...res);
    });
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
<style scoped></style>
