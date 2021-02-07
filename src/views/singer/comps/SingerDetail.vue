<template>
  <BackNavBar />

  <TabControl
    ref="tabcontrol"
    :titles="['主页', '歌曲', '专辑', '视频', '动态']"
    @tab-click="handleTabClick"
  />

  <Card>
    <template #header>
      <img src="" alt="用户头像" />
    </template>
    <template #content>
      <div class="user user-title">
        薛之谦
        <img src="" alt="认证标志" />
      </div>
      <div class="user">
        <span> <span class=" user-static">0 </span>关注 </span>
        <span> <span class=" user-static">1173.8万</span>粉丝 </span>
        <span>
          <span class=" user-static">Lv.1</span>
        </span>
      </div>
      <div class="user user-desc">原创歌手薛之谦</div>
    </template>
    <template #footer>
      <button class="card-button follow" @click="handleFollow">
        +关注
      </button>

      <button class="card-button simi" @click="handleSimi">
        <icon :icon="['fas', 'angle-down']" size="sm" />
      </button>
    </template>
  </Card>
  <!-- <img src="" alt=""> -->
  <!-- <router-view> </router-view> -->
</template>
<script lang="ts">
import BackNavBar from "@/components/content/customNavBar/BackNavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import { Card } from "@/components/content/customList";
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getSingerDetail } from "@/network/singer";
export default defineComponent({
  name: "SingerDetail",
  components: {
    BackNavBar,
    TabControl,
    Card
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

    const handleFollow = () => {
      console.log("handleFollow");
    };
    const handleSimi = () => {
      console.log("handleSimi");
    };
    return {
      handleTabClick,
      handleFollow,
      handleSimi
    };
  }
});
</script>
<style scoped>
.singer {
  height: 100vh;
  background-color: var(--color-background);
}
.user {
  text-align: center;
  margin: 3px 0;
  font-size: var(--font-size-small);
}
.user-title {
  font-weight: 900;
  font-size: var(--font-size-large);
  color: var(--color-high-text);
}
.user-static {
  color: var(--color-text);
}
.user-desc {
  font-size: var(--font-size-small-s);
  color: var(--color-text-shadow);
}
.card-button {
  font-size: var(--font-size-small);
  line-height: 30px;
  height: 30px;
  margin: 10px 5px;

  border-radius: 30px;
  border: solid 1px #ccc;
  background-color: var(--color-background);
  outline: none;
}
.card-button.follow {
  width: 100px;
  color: #fff;
  background-color: #f00;
}
.card-button.simi {
  width: 30px;
}
</style>
