<template>
  <div v-show="isShow" class="toast">
    <div>{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message = "默认文字", delay = 1000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, delay);
    }
  }
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%, -50%);
  z-index: 999;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
