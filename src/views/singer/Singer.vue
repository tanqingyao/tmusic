<template>
  <div class="singer">
    <router-view> </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Singer",
  components: {},
  setup() {
    return {};
  }
});
</script>
<style scoped>
.singer {
  height: 100vh;
  background-color: var(--color-background);
}
</style>
