<template>
  <div class="cover">
    <img v-lazy="cover" alt="" />
  </div>
</template>
<script>
export default {
  name: "DetailCover",
  props: {
    cover: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.cover img {
  width: 100%;
}
</style>
