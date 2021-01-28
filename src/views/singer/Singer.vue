<template>
  <div class="singer"></div>
</template>
<script>
export default {
  name: "Singer",
  components: {}
};
</script>
<style scoped>
.singer {
  height: 100vh;
  background-color: var(--color-background-d);
}
.scroll-line {
  position: fixed;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.line-left,
.line-right {
  width: 10%;
}
.line-left img {
  width: 40%;
  margin-left: 15px;
  margin-top: 5px;
}
.line-center {
  height: 1px;
  width: 70%;
  background-color: var(--color-text-l);
}
</style>
