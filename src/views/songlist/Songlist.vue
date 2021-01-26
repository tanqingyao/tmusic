<template>
  Songlist
</template>
<script>
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
<style scoped></style>
