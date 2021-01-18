<template>
  <div class="player-content">
    <span>当前进度:{{ progress }}</span>
    <div>
      <label for="progressSet">
        <input type="text" v-model="progress" id="progressSet" />
      </label>
      <button>设置进度</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlayerContent",
  components: {},
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped></style>
