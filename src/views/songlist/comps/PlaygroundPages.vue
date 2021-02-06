<template>
  <Scroll ref="scroll" class="scroll-content" :requestData="requestData">
    <div class="songlist-content">
      <Cover
        class="cover"
        v-for="songlist in songlists"
        :key="songlist.id"
        :item="songlist"
        @click="handleDetail(songlist.id)"
      />
    </div>
  </Scroll>
</template>
<script lang="ts">
import Scroll from "@/components/common/scroll/Scroll.vue";
import Cover from "@/components/content/cover/Cover.vue";

import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "PlaygroundPages",
  components: {
    Scroll,
    Cover
  },
  props: {
    songlists: {
      type: Object as PropType<Songlist[]>,
      default: []
    },
    requestData: {
      type: Function,
      default: () => {}
    }
  },
  setup() {
    const $router = useRouter();
    const handleDetail = (id: number) => {
      $router.push("/songlist/detail/" + id);
    };
    return {
      handleDetail
    };
  }
});
</script>
<style scoped>
.songlist-content {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
.scroll-content {
  height: calc(100vh - 44px - 40px - 60px);
  overflow: hidden;
  position: relative;
}
</style>
