<template>
  <router-view name="one" class="nav-bar" />
  <!-- keep-alive里面嵌套router-view已经不能用 -->
  <router-view v-slot="{ Component }">
    <keep-alive include="Recommend">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Player />
</template>

<script>
import Player from "views/player/Player";

export default {
  name: "App",
  components: {
    Player
  }
};
</script>

<style scoped>
@import "assets/css/base.css";
.nav-bar {
  color: var(--color-theme);
  font-size: var(--font-size-large-x);
  position: relative;
  z-index: 1;
  background-color: var(--color-background);
}
</style>
