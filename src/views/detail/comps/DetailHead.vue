<template>
  <div>
    <slot name="above" />
  </div>
  <div>
    <slot name="below" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "DetailHead",
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
