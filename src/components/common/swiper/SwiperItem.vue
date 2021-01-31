<template>
  <div class="slider">
    <slot />
  </div>
</template>
<script>
export default {
  name: "SwiperItem"
};
</script>
<style scoped>
.slider {
  width: 100%;
  flex-shrink: 0;
  justify-content: center;
  display: flex;
}
.slider img {
  width: 95%;
  border-radius: 10px;
  justify-content: center;
}
</style>
