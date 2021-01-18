<template>
  <div>
    <ProfileNavBar title="用户设置" />
    <label for="autoPlay">
      选择歌曲时自动播放
      <input
        @input="autoPlaySetting"
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

import { SET_AUTOPLAY } from "store/mutations-types";
import { mapMutations } from "vuex";
export default {
  name: "Profile",
  components: {
    ProfileNavBar
  },
  data() {
    return {
      isAutoPlay: false
    };
  },
  methods: {
    ...mapMutations({
      setAutoPlay: SET_AUTOPLAY
    }),
    autoPlaySetting(e) {
      let state = e.target.checked;
      this.isAutoPlay = state;
      this.setAutoPlay(state);
    }
  }
};
</script>
<style scoped></style>
