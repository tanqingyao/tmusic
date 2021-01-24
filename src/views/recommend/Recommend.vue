<template>
  <div id="recommend">
    <SearchBar
      class="search-bar"
      :Default="{ real: '默认搜索' }"
      v-show="isPullDown"
      @click="handleSearch"
    />
    <Scroll
      ref="scroll"
      class="wrapper"
      :data="imgCouter"
      :requestData="fetchData"
      @scroll="handleScroll"
    >
      <RecommendSwiper class="swiper" :banners="banners" />
      <RecommendView
        @RecommedImgLoad="imgload"
        :album="songlists[currentType].list"
      />
    </Scroll>
  </div>
</template>
<script>
import SearchBar from "components/common/searchbar/SearchBar";

import RecommendSwiper from "./childComps/RecommendSwiper";
import RecommendView from "./childComps/RecommendView";

import Scroll from "components/common/scroll/Scroll";

import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  _getBanners,
  _getSonglistsByCatergory,
  Album
} from "network/recommend";

export default {
  name: "Recommend",
  components: {
    SearchBar,
    RecommendSwiper,
    RecommendView,
    Scroll
  },
  setup() {
    const $router = useRouter();
    const handleSearch = () => {
      $router.push("/search");
    };

    let oldPos = ref(0);
    let isPullDown = ref(false);
    const handleScroll = pos => {
      isPullDown.value = pos.y > oldPos.value;
      oldPos.value = pos.y;
    };

    return {
      handleSearch,

      isPullDown,
      handleScroll
    };
  },
  data() {
    return {
      banners: [],
      // 3317: 官方歌单，59：经典，71：情歌，3056：网络歌曲，64：KTV热歌
      songlists: {
        official: { id: 3317, page: 1, list: [] },
        classic: { id: 59, page: 1, list: [] },
        love: { id: 71, page: 1, list: [] },
        network: { id: 3056, page: 1, list: [] },
        KTV: { id: 64, page: 1, list: [] }
      },
      currentType: "official",
      imgCouter: 0
    };
  },
  created() {
    this.getBanners();
    this.getSonglist(this.currentType);
  },
  methods: {
    imgload() {
      this.imgCouter++;
    },
    fetchData() {
      this.getSonglist(this.currentType);
    },
    /* 网络相关方法 */
    getBanners() {
      _getBanners().then(res => {
        this.banners = res.data.data;
      });
    },
    getSonglist(type, size = 20) {
      let query = this.songlists[type];
      _getSonglistsByCatergory(query.id, query.page, size).then(res => {
        res.data.data.list.forEach(element => {
          this.songlists[type].list.push(new Album(element));
        });
        this.songlists[type].page++;
      });
    }
  }
};
</script>
<style scoped>
#recommend {
  height: 100vh;
  position: relative;
}
.search-bar {
  height: 35px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
}
.wrapper {
  height: calc(100% - 44px - 40px - 60px);
}
.swiper {
  padding-top: 10px;
}
</style>
