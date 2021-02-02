<template>
  <div id="recommend">
    <MainNavBar />
    <TabControl
      :titles="['推荐', '歌手', '排行']"
      :path="['/recommend', '/singer', '/rank']"
    />
    <Scroll ref="scroll" class="wrapper">
      <RecommendSwiper class="swiper" :banners="banners" />
      <RecommendSonglist>
        <template #cover>
          <Cover
            class="cover"
            v-for="songlist in songlists"
            :key="songlist.id"
            :item="songlist"
          />
        </template>
      </RecommendSonglist>
      <!-- <RecommendView
        @RecommedImgLoad="imgload"
        :album="songlists[currentType].list"
      /> -->
    </Scroll>
  </div>
</template>
<script>
import MainNavBar from "@/components/content/mainNavBar/MainNavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import Cover from "components/content/cover/Cover";

import RecommendSwiper from "./childComps/RecommendSwiper";
import RecommendSonglist from "./childComps/RecommendSonglist";
import RecommendView from "./childComps/RecommendView";

import Scroll from "components/common/scroll/Scroll";

import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getBanner, getRecommendSonglist } from "network/recommend/index";

export default {
  name: "Recommend",
  components: {
    MainNavBar,
    TabControl,
    Cover,
    RecommendSwiper,
    RecommendSonglist,
    RecommendView,
    Scroll
  },
  setup() {
    /* 获取属性相关 */
    const banners = ref([]);
    const songlists = ref([]);
    onMounted(async () => {
      banners.value = await getBanner();
      songlists.value = await getRecommendSonglist();
    });
    return {
      banners,
      songlists
    };
  }
};
</script>
<style scoped>
#recommend {
  height: 100vh -44px;
  position: relative;
}
.wrapper {
  height: calc(100% - 44px - 40px - 60px);
}
.swiper {
  padding-top: 10px;
}
</style>
