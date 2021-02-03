<template>
  <Scroll ref="scroll" class="list-body">
    <MusicList
      :data="songlists"
      :showDownld="false"
      :showTab="false"
      listType="歌单"
      coverType="square"
    />
  </Scroll>
</template>
<script lang="ts">
import { MusicList } from "@/components/content/customList";
import Scroll from "@/components/common/scroll/Scroll.vue";

import { defineComponent, onMounted, Ref, ref } from "vue";

import { getSearchCloud } from "@/network/search";
import { useRoute } from "vue-router";
import { SearchType } from "@/common/constant";
export default defineComponent({
  name: "DetailSonglist",
  components: {
    Scroll,
    MusicList
  },
  props: {
    searchKey: {
      type: String,
      default: "同渡"
    }
  },
  setup() {
    let scroll: Ref = ref(null);
    let songlists = ref([]);
    const requestOption = {
      offset: 0,
      limit: 30,
      type: SearchType.PLAYLISTS
    };
    onMounted(async () => {
      setTimeout(() => {
        scroll.value.refresh();
      }, 500);

      // const res = await getSearchCloud(props.searchKey);
      songlists.value = await getSearchCloud(
        "同渡",
        requestOption.offset,
        requestOption.limit,
        requestOption.type
      );
    });
    return {
      scroll,
      songlists
    };
  }
});
</script>
<style scoped>
.list-body {
  height: calc(100vh - 44px - 40px - 60px);
  width: 100vw;
  overflow: hidden;
}
</style>
