<template>
  <Scroll ref="scroll" class="list-body">
    <MusicList
      :data="artists"
      :showDownld="false"
      :showTab="false"
      listType="艺人"
      coverType="round"
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
  name: "DetailSingers",
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
  setup() {
    let scroll: Ref = ref(null);
    let artists = ref([]);
    const requestOption = {
      offset: 0,
      limit: 30,
      type: SearchType.ARTISTS
    };
    onMounted(async () => {
      setTimeout(() => {
        scroll.value.refresh();
      }, 500);

      // const res = await getSearchCloud(props.searchKey);
      artists.value = await getSearchCloud(
        "同渡",
        requestOption.offset,
        requestOption.limit,
        requestOption.type
      );
      console.log(artists.value);
    });
    return {
      scroll,
      artists
    };
  }
});
</script>
<style scoped></style>
