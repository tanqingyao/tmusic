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
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ListTab"
});
</script>
<style scoped>
.common-item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
}

.item-left,
.item-right {
  text-align: center;
  margin: 0 5px;
  flex: 1;
}
</style>
