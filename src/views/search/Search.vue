<template>
  <SearchNavBar
    :dftSearchKey="dft.show"
    @update:searchKey="searchKey = $event"
    @focus-state="focusSearch = $event"
  />
  <SearchSuggest
    :searchKey="searchKey"
    :suggests="suggests"
    v-show="searchKey && focusSearch"
  >
  </SearchSuggest>

  <TabControl
    :titles="['综合', '单曲', '歌单', '歌手', '专辑', '用户']"
    @tab-click="handleTabClick"
    v-show="$route.path !== '/search/hots'"
  />
  <router-view> </router-view>
</template>
<script lang="ts">
import SearchNavBar from "@/components/content/searchBar/SearchNavBar.vue";
import SearchSuggest from "./comps/SearchSuggest.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import {
  defineComponent,
  ref,
  onMounted,
  Ref,
  watchEffect,
  WatchStopHandle
} from "vue";

import { getSearchDefault, getSearchSuggest } from "@/network/search";

import { throttle } from "@/common/utils/func";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Search",
  components: {
    SearchNavBar,
    SearchSuggest,
    TabControl
  },
  setup() {
    let dft: Ref = ref({ real: "", show: "" });
    let suggests: Ref = ref([]);
    let searchKey: Ref = ref("");
    let focusSearch: Ref = ref(false);

    const throttleGetSuggest = throttle(async value => {
      if (value) {
        suggests.value = await getSearchSuggest(value);
      }
    }, 500);
    const stop: WatchStopHandle = watchEffect(() => {
      throttleGetSuggest(searchKey.value);
    });

    const $router = useRouter();
    const $route = useRoute();
    const path = [
      "/search/detail/",
      "/search/detail/solo/",
      "/search/detail/songlist/",
      "/search/detail/singers/",
      "/search/detail/album/",
      "/search/detail/users/"
    ];
    const handleTabClick = (index: number) => {
      $router.replace(path[index] + $route.params.key);
    };
    onMounted(async () => {
      dft.value = await getSearchDefault();
    });
    return {
      dft,
      searchKey,
      suggests,
      focusSearch,
      handleTabClick
    };
  }
});
</script>
<style scoped></style>
