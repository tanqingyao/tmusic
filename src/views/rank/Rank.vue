<template>
  Rank
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Rank",
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
