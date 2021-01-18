<template>
  <div class="tab-bar-item">
    <slot name="itemIcon"></slot>
  </div>
</template>

<script>
export default {
  name: "TabBarItem"
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
</style>
