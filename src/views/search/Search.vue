<template>
  <NavBar class="search-nav">
    <template #left>
      <icon
        class="back-icon"
        @click="$router.back"
        :icon="['fas', 'arrow-left']"
        size="sm"
      />
    </template>
    <template #center>
      <div class="search-head">
        <div class="search-bar">
          <icon
            v-show="!searchKey"
            class="icon-search"
            :icon="['fas', 'search']"
            size="sm"
          />
          <input
            class="search-input"
            type="text"
            :placeholder="dft.show"
            v-model="searchKey"
            @focusin="focusSearch = true"
            @focusout="focusSearch = false"
          />
          <icon
            v-show="searchKey"
            class="icon-close"
            :icon="['fas', 'times']"
            size="sm"
          />
        </div>
      </div>
    </template>
  </NavBar>
  <SearchSuggest
    :searchKey="searchKey"
    :suggests="suggests"
    v-show="searchKey && focusSearch"
  >
  </SearchSuggest>
  <SearchHot :hots="hots" />
</template>
<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import SearchHot from "./comps/SearchHot.vue";
import SearchSuggest from "./comps/SearchSuggest.vue";

import {
  defineComponent,
  ref,
  onMounted,
  Ref,
  watchEffect,
  WatchStopHandle
} from "vue";

import {
  getSearchDefault,
  getSearchHot,
  getSearchSuggest,
  getSearchCloud
} from "@/network/search";

import { throttle } from "@/common/utils";
export default defineComponent({
  name: "Search",
  components: {
    NavBar,
    SearchHot,
    SearchSuggest
  },
  setup(props) {
    let dft: Ref = ref({ real: "", show: "" });
    let hots: Ref = ref([]);
    let suggests: Ref = ref([]);

    let searchKey: Ref = ref("");
    let focusSearch: Ref = ref(false);
    const _getSearchInfo = async () => {
      dft.value = await getSearchDefault();
      hots.value = await getSearchHot();
      const songs = await getSearchCloud(searchKey.value);
      console.log(songs);
    };
    const throttleLog = throttle(async value => {
      if (value) {
        suggests.value = await getSearchSuggest(value);
      }
    }, 500);
    const stop: WatchStopHandle = watchEffect(() => {
      throttleLog(searchKey.value);
    });

    const handleFocus = () => {
      console.log("handleFocus");
    };
    onMounted(() => {
      _getSearchInfo();
    });
    return {
      dft,
      hots,
      searchKey,
      suggests,
      handleFocus,
      focusSearch
    };
  }
});
</script>
<style scoped>
.search-nav {
  box-shadow: none;
}
.back-icon {
  margin: 0 15px;
  width: 30px;
}
.search-head {
  height: 44px;
  padding: 8px 0px;
}
.search-bar {
  border-bottom: solid 1px #666;
  width: 100%;
  height: 100%;
  padding: 0 10px;

  display: flex;
  align-items: center;
}
.search-input {
  flex: 1;
  margin: 0 5px;
  line-height: 18px;
  border: none;
  background-color: inherit;

  /* 多余文字省略 */
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
input:focus {
  outline: none;
}
</style>
