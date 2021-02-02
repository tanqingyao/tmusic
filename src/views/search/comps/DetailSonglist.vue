<template> songlist</template>
<script lang="ts">
import { getSearchCloud } from "@/network/search";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "DetailSearch",
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
