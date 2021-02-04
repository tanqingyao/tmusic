<template>
  <div class="songlist">
    <router-view> </router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Songlist",
  components: {},
  props: {
    test: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped>
.songlist {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
