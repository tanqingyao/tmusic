<template>
  <div class="list-item">
    <div class="item-left">
      <slot name="left" />
    </div>
    <div class="item-center">
      <slot name="center" />
    </div>
    <div class="item-right">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchHotItem"
});
</script>
<style scoped>
.list-item {
  width: 50%;
  text-align: left;
  height: 30px;
  line-height: 30px;
  display: flex;
}

.item-left {
  flex: 1;
  text-align: center;
  margin: 0 10px;
}
.item-center {
  flex: 8;
  font-size: var(--font-size-medium);

  /* 多余文字省略 */
  width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-right {
  flex: 1;
}
</style>
