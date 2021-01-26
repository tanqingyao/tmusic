<template>
  <div class="common-item">
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
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ListTab"
});
</script>
<style scoped>
.common-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  display: flex;
}

.item-left {
  flex: 1;
  text-align: center;
  margin: 0 5px;
}
.item-right {
  flex: 3;
}
.item-center {
  flex: 6;
  font-size: var(--font-size-large);
  color: var(--color-text);
}
</style>
