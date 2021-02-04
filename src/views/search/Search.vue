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

  <router-view> </router-view>
</template>
<script lang="ts">
import SearchNavBar from "@/components/content/searchBar/SearchNavBar.vue";
import SearchSuggest from "./comps/SearchSuggest.vue";

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
export default defineComponent({
  name: "Search",
  components: {
    SearchNavBar,
    SearchSuggest
  },
  setup() {
    let dft: Ref = ref({ real: "", show: "" });
    let suggests: Ref = ref([]);
    let searchKey: Ref = ref("");
    let focusSearch: Ref = ref(false);

    /* 搜索建议相关 */
    const throttleGetSuggest = throttle(async value => {
      if (value) {
        suggests.value = await getSearchSuggest(value);
      }
    }, 500);
    const stop: WatchStopHandle = watchEffect(() => {
      throttleGetSuggest(searchKey.value);
    });

    onMounted(async () => {
      dft.value = await getSearchDefault();
    });
    return {
      dft,
      searchKey,
      suggests,
      focusSearch
    };
  }
});
</script>
<style scoped></style>
