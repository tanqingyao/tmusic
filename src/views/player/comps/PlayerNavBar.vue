<template>
  <NavBar class="player-nav-bar">
    <template #left>
      <icon
        @click="$emit('change-screen')"
        class="down-icon"
        :icon="['fas', 'angle-down']"
        size="lg"
      />
    </template>
    <template #center>
      <div class="text">
        <span>{{ currentSong.name }}</span>
        <span> - </span>
        <span>{{ showSinger(currentSong.singers) }}</span>
      </div>
    </template>
  </NavBar>
</template>
<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import { showSinger } from "@/common/utils/show";
export default {
  name: "PlayerNavBar",
  components: {
    NavBar
  },
  props: {
    currentSong: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: {
    "change-screen": null
  },
  setup() {
    return {
      showSinger
    };
  }
};
</script>
<style scoped>
.player-nav-bar {
  height: 55px;
  width: 100vw;
}
.down-icon {
  margin-top: 7px;
  width: 30px;
  z-index: 9;
}
.text {
  font-size: 5px;
}
</style>
