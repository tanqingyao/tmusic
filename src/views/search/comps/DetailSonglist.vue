<template> songlist</template>
<script lang="ts">
import { MusicList } from "@/components/content/customList";
import Scroll from "@/components/common/scroll/Scroll.vue";

import { defineComponent, onMounted, Ref, ref } from "vue";

import { getSearchCloud } from "@/network/search";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "DetailSonglist",
  components: {},
  props: {
    searchKey: {
      type: String,
      default: "同渡"
    }
  },
  setup() {
    let scroll: Ref = ref(null);
    let songs = ref([]);
    const requestOption = {
      offset: 0,
      limit: 30,
      type: 1000
    };
    onMounted(async () => {
      // setTimeout(() => {
      //   scroll.value.refresh();
      // }, 500);

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
      scroll
    };
  }
});
</script>
<style scoped></style>
