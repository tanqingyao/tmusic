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
            @click="handleDetail(songlist.id)"
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
<script lang="ts">
import MainNavBar from "@/components/content/mainNavBar/MainNavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import Cover from "components/content/cover/Cover.vue";

import RecommendSwiper from "./comps/RecommendSwiper.vue";
import RecommendSonglist from "./comps/RecommendSonglist.vue";
import RecommendView from "./comps/RecommendView.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getBanner, getRecommendSonglist } from "@/network/recommend/index";

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

    const $router = useRouter();
    const handleDetail = (id: number) => {
      $router.push("/songlist/detail/" + id);
    };
    return {
      banners,
      songlists,
      handleDetail
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
