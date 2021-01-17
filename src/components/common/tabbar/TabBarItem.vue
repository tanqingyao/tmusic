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

.tab-bar-item img {
  width: 30px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
  border-radius: 50%;
}

.text {
  width: 120px;
  height: 60px;
  font-size: 12px;
  /* 文字采用flex布局 */
  display: flex;
  flex-direction: column;
}
.text span {
  /* 布局 */
  flex: 1;
  text-align: left;
  height: 30px;
  line-height: 30px;

  /* 多余文字省略号 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.active {
  background-color: red;
}
</style>
