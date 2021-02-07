<template>
  <BackNavBar />

  <TabControl
    ref="tabcontrol"
    :titles="['主页', '歌曲', '专辑', '视频', '动态']"
    @tab-click="handleTabClick"
  />
  <!-- <img src="" alt=""> -->
  <!-- <router-view> </router-view> -->
</template>
<script lang="ts">
import BackNavBar from "@/components/content/customNavBar/BackNavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getSingerDetail } from "@/network/singer";
export default defineComponent({
  name: "SingerDetail",
  components: {
    BackNavBar,
    TabControl
  },
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const handleTabClick = async (index: number) => {
      console.log(index);

      // currentType.value = index + 1;
      // await fetchSingerRankData(currentType.value);
    };
    onMounted(async () => {
      // 获取展示数据
      const id = parseInt($route.params.id as string);
      const singerInfo = await getSingerDetail(id);
      console.log(singerInfo);

      // $router.replace("/singer/detail/home/" + id);
    });
    return {
      handleTabClick
    };
  }
});
</script>
<style scoped></style>
