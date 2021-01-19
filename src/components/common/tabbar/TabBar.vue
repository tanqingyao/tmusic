<template>
  <div id="tab-bar">
    <slot />
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  /* flex进行布局 */
  display: flex;
  justify-content: space-around;
  /* 本身样式 */
  /* border-top: 1px solid #000; */
  box-shadow: 0px -1px 1px rgba(150, 150, 150, 0.08);
  /* 垂直居中 */
  text-align: center;
  line-height: 60px;
  height: 60px;
  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
