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
<script>
export default {
  name: "ListItem"
};
</script>
<style scoped>
.list-item {
  flex: 1;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  display: flex;
}
/* 左边 */
.item-left {
  flex: 0 1 40px;
  text-align: center;
  margin: 0 5px;
}
/* 中间 */
.item-center {
  flex: 2;
  font-size: var(--font-size-medium);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}
/* 右边 */
.item-right {
  flex: 1;
  /* 横向水平垂直居中 */
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin-right: 10px;
}
</style>
