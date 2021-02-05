<template>
  <div>
    <ProfileNavBar title="用户设置" />
    <label for="autoPlay">
      选择歌曲时自动播放
      <input id="autoPlay" type="checkbox" v-model="isAutoPlay" />
    </label>
    <label for="clearSongs">
      <button id="clearSongs" @click="handleClear">清空所有歌曲缓存</button>
    </label>
  </div>
</template>
<script lang="ts">
import ProfileNavBar from "./childComps/ProfileNavBar.vue";

import { MutationType } from "@/store/types";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";
import { clearAllSongs } from "@/common/localStorage";
export default {
  name: "Profile",
  components: {
    ProfileNavBar
  },
  setup() {
    const $store = useStore();
    let isAutoPlay = ref(false);
    watchEffect(() => {
      $store.commit(MutationType.SET_AUTOPLAY, isAutoPlay.value);
    });
    const handleClear = () => {
      localStorage.clear();
    };
    return {
      isAutoPlay,
      handleClear
    };
  }
};
</script>
<style scoped></style>
