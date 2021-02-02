<template>
  SonglistPlayground
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SonglistPlayground",
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
<style scoped></style>
