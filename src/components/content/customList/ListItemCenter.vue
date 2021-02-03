<template>
  <span class="list-item-center">
    <slot name="center-item" />
  </span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ListItemCenter"
});
</script>
<style scoped>
.list-item-center {
  flex: 1;
  height: initial;
  line-height: initial;

  /* 多余文字省略 */
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
