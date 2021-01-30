<template>
  <div>
    <ProfileNavBar title="用户设置" />
    <label for="autoPlay">
      选择歌曲时自动播放
      <input
        @input="handleAutoPlay"
        type="checkbox"
        v-model="isAutoPlay"
        id="autoPlay"
      />
    </label>
    <!-- <button :disabled="!isAutoPlay">下一步</button> -->
  </div>
</template>
<script>
import ProfileNavBar from "./childComps/ProfileNavBar";

import { MutationType } from "@/store/types";
import { useStore } from "vuex";
export default {
  name: "Profile",
  components: {
    ProfileNavBar
  },
  setup() {
    const $store = useStore();
    let isAutoPlay = ref(false);
    const handleAutoPlay = e => {
      let state = e.target.checked;
      isAutoPlay.value = state;
      $store.commit(MutationType.SET_AUTOPLAY, state);
    };
    return {
      isAutoPlay,
      handleAutoPlay
    };
  }
};
</script>
<style scoped></style>
