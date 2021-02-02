<template>
  <div class="common-item">
    <div class="item-left">
      <slot name="left" />
    </div>

    <div class="item-right">
      <slot name="right" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlayerListItem"
});
</script>
<style scoped>
.common-item {
  display: flex;

  width: 100%;
  height: 30px;
  line-height: 30px;

  margin: 15px 0;
}
.item-left {
  text-align: left;
}
.item-right {
  text-align: right;
}
.item-left,
.item-right {
  flex: 1;
  /* 多余文字省略 */
  width: 50%;
}
</style>
