<template>
  <Scroll ref="scroll" class="list-body">
    <MusicList :songs="songs" :showDownld="false" listType="单曲" />
  </Scroll>
</template>
<script lang="ts">
import { MusicList } from "@/components/content/customList";
import Scroll from "@/components/common/scroll/Scroll.vue";

import { defineComponent, onMounted, Ref, ref } from "vue";

import { getSearchCloud } from "@/network/search";
export default defineComponent({
  name: "DetailSolo",
  components: {
    MusicList,
    Scroll
  },
  props: {
    searchKey: {
      type: String,
      default: "同渡"
    }
  },
  setup(props) {
    let scroll: Ref = ref(null);
    let songs = ref([]);
    const requestOption = {
      offset: 0,
      limit: 30,
      type: 1
    };
    onMounted(async () => {
      setTimeout(() => {
        scroll.value.refresh();
      }, 500);

      // const res = await getSearchCloud(props.searchKey);
      songs.value = await getSearchCloud(
        "同渡",
        requestOption.offset,
        requestOption.limit,
        requestOption.type
      );
      console.log(songs.value);
    });
    return {
      scroll,
      songs
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
