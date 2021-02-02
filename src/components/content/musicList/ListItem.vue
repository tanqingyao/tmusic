<template>
  <div class="list-item">
    <div class="item-left">
      <slot name="left" />
    </div>
    <div class="item-center">
      <span class="top">
        <slot name="top" />
      </span>

      <span class="bottom">
        <slot name="bottom" />
      </span>
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
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
  display: flex;
}
/* 左边 */
.item-left {
  flex: 1;
  text-align: center;
  margin: 0 5px;
}
/* 中间 */
.item-center {
  flex: 8;
  font-size: var(--font-size-medium);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}
.top,
.bottom {
  flex: 1;
  height: 25px;
  line-height: 25px;

  /* 多余文字省略 */
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.top {
  font-size: var(--font-size-medium-x);
  color: var(--color-high-text);
}
.bottom {
  font-size: var(--font-size-small);
  color: var(--color-text);
}
/* 右边 */
.item-right {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
}
</style>
