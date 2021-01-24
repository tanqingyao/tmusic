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
  justify-content: center;
  display: flex;
}
.slider img {
  width: 95%;
  border-radius: 10px;
  justify-content: center;
}
</style>
