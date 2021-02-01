<template>
  <div id="recommend">
    <SearchBar
      class="search-bar"
      :Default="{ real: '默认搜索' }"
      v-show="isPullDown"
      @click="handleSearch"
    />
    <Scroll ref="scroll" class="wrapper" @scroll="handleScroll">
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
import SearchBar from "components/common/searchbar/SearchBar";

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
    SearchBar,
    Cover,
    RecommendSwiper,
    RecommendSonglist,
    RecommendView,
    Scroll
  },
  setup() {
    /* 路由相关 */
    const $router = useRouter();
    const handleSearch = () => {
      $router.push("/search");
    };
    /* 滑动相关 */
    let oldPos = ref(0);
    // TODO 推荐页面内容更多时隐藏搜索框
    let isPullDown = ref(true);
    const handleScroll = pos => {
      isPullDown.value = pos.y > oldPos.value;
      oldPos.value = pos.y;
    };
    /* 获取属性相关 */
    const banners = ref([]);
    const songlists = ref([]);
    onMounted(async () => {
      banners.value = await getBanner();
      songlists.value = await getRecommendSonglist();
    });
    return {
      handleSearch,

      isPullDown,
      handleScroll,

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
.search-bar {
  height: 35px;
  margin: 10px 0;

  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #fff;
  /* position: absolute;
  left: 0;
  right: 0; */
  position: relative;
  z-index: 9;
}
.wrapper {
  height: calc(100% - 44px - 40px - 60px);
}
.swiper {
  padding-top: 10px;
}
</style>
