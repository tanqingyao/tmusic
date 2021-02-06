<template>
  <BackNavBar />
</template>
<script lang="ts">
import BackNavBar from "@/components/content/customNavBar/BackNavBar.vue";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

import { getSingerDetail } from "@/network/singer";
export default defineComponent({
  name: "SingerDetail",
  components: {
    BackNavBar
  },
  setup() {
    const $route = useRoute();
    onMounted(async () => {
      // 获取展示数据
      const id = parseInt($route.params.id as string);
      await getSingerDetail(id);
    });
    return {};
  }
});
</script>
<style scoped></style>
