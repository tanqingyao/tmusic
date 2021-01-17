<template>
  <div class="slider">
    <slot />
  </div>
</template>
<script>
export default {
  name: "SwiperItem"
  // created() {
  //   console.log("SwiperItem");
  // },
  // mounted() {
  //   console.log("SwiperItem mounted");
  // }
};
</script>
<style scoped>
.slider {
  width: 100%;
  flex-shrink: 0;
}
.slider img {
  width: 100%;
}
</style>
