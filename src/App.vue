<template>
  <router-view name="one" class="nav-bar" />
  <router-view v-slot="{ Component }">
    <keep-alive include="Recommend">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Player />
</template>

<script lang="ts">
import Player from "views/player/Player.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    Player
  }
});
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
