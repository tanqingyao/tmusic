<template>
  <div>
    <slot name="tab" />
  </div>
  <div>
    <slot name="content" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "DetailContent",
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
